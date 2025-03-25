import { MESSAGES } from '@/constants';
import { type SpotifyPlaylist } from '@/types/spotify';
import { processSpotifyField } from '@/utils/form';

type GetPlaylistData = (playlistId: string, spotifyToken: string) => Promise<SpotifyPlaylist>;

const params = new URLSearchParams({
  market: 'US',
  fields: 'public,tracks(limit, next, total, items.track(name, artists.name, id))',
});

export const getPlaylistData: GetPlaylistData = async (playlistId, spotifyToken) => {
  const endpoint = `https://api.spotify.com/v1/playlists/${processSpotifyField(playlistId)}?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(MESSAGES.ERROR.SPOTIFY.URL_TYPE);
      } else if (response.status === 429) {
        throw new Error(MESSAGES.ERROR.SPOTIFY.RATE_LIMIT);
      }
    }

    return await response.json();
  } catch (e) {
    console.error('Error in getPlaylistData():', e);
    throw e;
  }
};
