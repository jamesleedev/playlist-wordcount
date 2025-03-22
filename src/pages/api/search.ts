import type { NextApiRequest, NextApiResponse } from 'next';

import { ERROR_MESSAGES, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@/constants';
import type { SearchResponse, SpotifyData } from '@/types/form';
import { processSpotifyField, validateFormFields } from '@/utils/form';
import { getSpotifyAccessToken } from '@/utils/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  const data = req.body as SpotifyData;
  console.log('/api/search data :', data);

  const validationErrors = validateFormFields(data);

  if (validationErrors) {
    return res.status(400).json({ ok: false, msg: 'An error occurred.', errors: validationErrors });
  }

  const spotifyToken = await getSpotifyAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  console.log('/api/search spotifyToken :', spotifyToken);

  const params = new URLSearchParams({
    market: 'US',
    fields: 'public,tracks(limit, next, total, items.track(name, artists.name))',
  });
  const endpoint = `https://api.spotify.com/v1/playlists/${processSpotifyField(data.spotify)}?${params.toString()}`;

  console.log('/api/search endpoint :', endpoint);

  try {
    const playlistResp = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    const playlist = await playlistResp.json();

    if (!playlist.public) {
      return res.status(400).json({
        ok: false,
        msg: ERROR_MESSAGES.SPOTIFY.URL_TYPE,
        errors: { spotify: ERROR_MESSAGES.SPOTIFY.URL_TYPE },
      });
    }

    const track = playlist.tracks.items[0].track;

    const lyricsResp = await fetch(`https://api.lyrics.ovh/v1/${track.artists[0].name}/${track.name}`);
    const lyrics = await lyricsResp.json();

    console.log(lyrics);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, msg: 'An error occurred.' });
  }

  res.json({ ok: true, msg: 'Success' });
}
