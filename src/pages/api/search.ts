import type { NextApiRequest, NextApiResponse } from 'next';

import { ERROR_MESSAGES, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@/constants';
import type { SearchResponse, SpotifyData } from '@/types/form';
import { validateFormFields } from '@/utils/form';
import { getPlaylistData } from '@/utils/playlist';
import { getSpotifyAccessToken } from '@/utils/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  const data = req.body as SpotifyData;
  console.log('/api/search data :', data);

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

  let playlist;

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

  const track = playlist.tracks.items.at(-1).track;
  console.log('track:', track);

  const lyricsEndpoint = encodeURI(`https://api.lyrics.ovh/v1/${track.artists[0].name}/${track.name}`);

  console.log(lyricsEndpoint);

  const lyricsResp = await fetch(lyricsEndpoint);
  const lyrics = await lyricsResp.json();

  console.log(lyrics);

  res.json({ ok: true, msg: 'Success' });
}
