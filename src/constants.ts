export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export const ERROR_MESSAGES = {
  SPOTIFY: {
    INVALID_URL: 'A valid Spotify playlist URL is required.',
    URL_TYPE: 'The link must lead to a public Spotify playlist.',
  },
  SEARCH_TERM: {
    MISSING: 'A search term is required.',
  },
};
