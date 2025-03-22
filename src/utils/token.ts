export const getSpotifyAccessToken = async (id: string | undefined, secret: string | undefined) => {
  if (!id || !secret) {
    throw new Error('Spotify credentials are required.');
  }

  const cachedToken = global.cacheAccessToken.get('spotify');

  if (cachedToken) {
    return cachedToken;
  } else {
    try {
      const tokenData = await requestSpotifyAccessToken(id, secret);
      global.cacheAccessToken.set('spotify', tokenData.access_token, tokenData.expires_in || 3600);

      return tokenData.access_token;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};

const requestSpotifyAccessToken = async (id: string, secret: string) => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error(data);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }

  throw new Error(`Failed to obtain Spotify access token`);
};
