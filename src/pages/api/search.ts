import Fuse, { type IFuseOptions } from 'fuse.js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { MESSAGES, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@/constants';
import type { SearchRequest, SearchResponse } from '@/types/form';
import { type TrackForSearch, type TrackWithApiResult } from '@/types/lyrics';
import { type SpotifyPlaylist } from '@/types/spotify';
import { validateFormFields } from '@/utils/form';
import { getAllLyrics, sortLyrics } from '@/utils/lyrics';
import { getPlaylistData } from '@/utils/playlist';
import { getSpotifyAccessToken } from '@/utils/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  const data = req.body as SearchRequest;

  const validationErrors = validateFormFields(data);

  if (validationErrors) {
    return res.status(400).json({ ok: false, msg: 'An error occurred.', errors: validationErrors });
  }

  let spotifyToken: string;

  try {
    spotifyToken = await getSpotifyAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, msg: MESSAGES.ERROR.GENERAL.IMPLEMENTATION });
  }

  let playlist: SpotifyPlaylist;

  try {
    playlist = await getPlaylistData(data.spotify, spotifyToken);

    if (!playlist.public) {
      return res.status(400).json({
        ok: false,
        msg: MESSAGES.ERROR.SPOTIFY.URL_TYPE,
        errors: { spotify: MESSAGES.ERROR.SPOTIFY.URL_TYPE },
      });
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e.message === MESSAGES.ERROR.SPOTIFY.URL_TYPE) {
        return res.status(400).json({ ok: false, msg: e.message, errors: { spotify: e.message } });
      }
    }

    return res.status(500).json({ ok: false, msg: MESSAGES.ERROR.GENERAL.IMPLEMENTATION });
  }

  let lyrics: TrackWithApiResult[];

  try {
    lyrics = await getAllLyrics(playlist, 10, 1000);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, msg: MESSAGES.ERROR.GENERAL.LYRICS_SERVICE });
  }

  const [found, notFound] = sortLyrics(lyrics);

  const fuseOptions: IFuseOptions<TrackForSearch> = {
    ignoreLocation: true,
    keys: ['lyrics.lyrics'],
    threshold: 0.1,
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
  };

  const fuse = new Fuse(
    found.map((track) => {
      return { ...track, lyrics: { lyrics: track.lyrics.lyrics.split(/\s+/) } };
    }),
    fuseOptions
  );

  const searchResults = fuse.search(data.word);

  const matches = searchResults.map((item) => (item.matches ? item.matches.length : 0));
  const totalWordCount = matches.reduce((acc, next) => acc + next, 0);

  return res.json({
    ok: true,
    msg: MESSAGES.SUCCESS,
    totalWordCount,
    results: {
      tracks: playlist.tracks.items.map((result) => {
        const { id, name, artists } = result.track;

        const matches = searchResults.find((item) => item.item.id === id);

        return {
          id,
          name,
          artists,
          wordCount: matches?.matches ? matches.matches.length : 0,
        };
      }),
    },
    found,
    notFound: {
      count: notFound.length,
      tracks: notFound.map((track) => ({ id: track.id, name: track.name, artists: track.artists })),
    },
  });
}
