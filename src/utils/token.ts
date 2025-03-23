export const getSpotifyAccessToken = async (id: string | undefined, secret: string | undefined) => {
  if (!id || !secret) {
    throw new Error('Spotify credentials are required.');
  }

  const cachedToken = global.cacheAccessToken.get('spotify');

  if (cachedToken) {
    return cachedToken;
  } else {
    try {
      const tokenData = await requestSpotifyAccessToken(id, secret, 3);
      global.cacheAccessToken.set('spotify', tokenData.access_token, tokenData.expires_in || 3600);

      return tokenData.access_token;
    } catch (e) {
      // explicitly throw error for api route to handle
      throw e;
    }
  }
};

const requestSpotifyAccessToken = async (id: string, secret: string, retryAttempts: number) => {
  let lastError: Error = new Error('Initial error thrown in requestSpotifyAccessToken. This should never happen.');
  const authString = `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`;

  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        headers: {
          Authorization: authString,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });

      if (response.ok) {
        return await response.json();
      }

      if (response.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, Number(response.headers.get('retry-after')) || 1000));
      }

      lastError = new Error(`Spotify returned status: ${response.status}, response body: ${await response.text()}`);
    } catch (e) {
      if (e instanceof Error) {
        lastError = e;
      }
    }
  }

  throw new Error(`Failed to obtain Spotify access token after ${retryAttempts} attempts`, { cause: lastError });
};
