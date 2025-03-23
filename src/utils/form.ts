import { isURL, trim } from 'validator';

import { ERROR_MESSAGES } from '@/constants';
import { type SearchResponse, type SpotifyData } from '@/types/form';

export const validateFormFields = (data: SpotifyData) => {
  const errors: SearchResponse['errors'] = {};
  const { spotify, word } = sanitizeFormFields(data);

  if (!spotify || !isURL(spotify, { protocols: ['https'] })) {
    errors.spotify = ERROR_MESSAGES.SPOTIFY.INVALID_URL;
  } else {
    try {
      const urlObj = new URL(spotify);

      if (!urlObj.pathname.includes('playlist')) {
        errors.spotify = ERROR_MESSAGES.SPOTIFY.URL_TYPE;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      errors.spotify = ERROR_MESSAGES.SPOTIFY.INVALID_URL;
    }
  }

  if (!word) {
    errors.word = ERROR_MESSAGES.SEARCH_TERM.MISSING;
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const sanitizeFormFields = (data: SpotifyData) => {
  return { spotify: trim(data.spotify), word: trim(data.word) };
};

export const processSpotifyField = (spotify: string): string => {
  const urlObj = new URL(spotify);

  const paths = urlObj.pathname.split('/');

  return paths[paths.length - 1];
};
