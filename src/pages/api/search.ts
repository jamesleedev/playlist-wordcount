import type { NextApiRequest, NextApiResponse } from 'next';

import { ERROR_MESSAGES, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@/constants';
import type { SearchResponse, SpotifyData } from '@/types/form';
import { type TrackWithApiResult, type TrackWithLyrics } from '@/types/lyrics';
import { type SpotifyPlaylist } from '@/types/spotify';
import { validateFormFields } from '@/utils/form';
import { getAllLyrics, sortLyrics } from '@/utils/lyrics';
import { getPlaylistData } from '@/utils/playlist';
import { getSpotifyAccessToken } from '@/utils/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  const data = req.body as SpotifyData;

  const validationErrors = validateFormFields(data);

  if (validationErrors) {
    return res.status(400).json({ ok: false, msg: 'An error occurred.', errors: validationErrors });
  }

  let spotifyToken: string;

  try {
    spotifyToken = await getSpotifyAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, msg: ERROR_MESSAGES.GENERAL.IMPLEMENTATION });
  }

  let playlist: SpotifyPlaylist;

  try {
    playlist = await getPlaylistData(data.spotify, spotifyToken);

    if (!playlist.public) {
      return res.status(400).json({
        ok: false,
        msg: ERROR_MESSAGES.SPOTIFY.URL_TYPE,
        errors: { spotify: ERROR_MESSAGES.SPOTIFY.URL_TYPE },
      });
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e.message === ERROR_MESSAGES.SPOTIFY.URL_TYPE) {
        return res.status(400).json({ ok: false, msg: e.message, errors: { spotify: e.message } });
      }
    }

    return res.status(500).json({ ok: false, msg: ERROR_MESSAGES.GENERAL.IMPLEMENTATION });
  }

  let lyrics: TrackWithApiResult[];

  try {
    lyrics = await getAllLyrics(playlist, 3, 1000);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, msg: ERROR_MESSAGES.GENERAL.IMPLEMENTATION });
  }

  const [found, notFound] = sortLyrics(lyrics);

  res.json({ ok: true, msg: 'Success' });
}
