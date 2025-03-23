import { ERROR_MESSAGES } from '@/constants';
import { processSpotifyField } from '@/utils/form';

const params = new URLSearchParams({
  market: 'US',
  fields: 'public,tracks(limit, next, total, items.track(name, artists.name))',
});

export const getPlaylistData = async (playlistId: string, spotifyToken: string) => {
  const endpoint = `https://api.spotify.com/v1/playlists/${processSpotifyField(playlistId)}?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(ERROR_MESSAGES.SPOTIFY.URL_TYPE);
      } else if (response.status === 429) {
        throw new Error(ERROR_MESSAGES.SPOTIFY.RATE_LIMIT);
      }
    }

    return await response.json();
  } catch (e) {
    console.error('Error in getPlaylistData():', e);
    throw e;
  }
};
