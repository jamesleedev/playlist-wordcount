import { type SpotifyPlaylist, type Track } from '@/types/spotify';

export type GetAllLyrics = (
  playlist: SpotifyPlaylist,
  connections: number,
  timeout: number
) => Promise<TrackWithApiResult[]>;

export type CreateLyricsPromise = (track: Track) => Promise<TrackWithApiResult>;

export type SortLyrics = (tracks: TrackWithApiResult[]) => [TrackWithLyrics[], TrackWithError[]];

export interface TrackWithLyrics extends Track {
  lyrics: {
    lyrics: string;
  };
}

export interface TrackWithError extends Track {
  lyrics: {
    error: string;
  };
}

export interface LyricsApiProperties {
  lyrics?: string;
  error?: string;
}

export type LyricsApiResponse =
  | (Pick<LyricsApiProperties, 'lyrics'> & { error?: never })
  | (Pick<LyricsApiProperties, 'error'> & { lyrics?: never });

export interface TrackWithApiResult extends Track {
  lyrics: LyricsApiResponse;
}

export interface TrackForSearch {
  lyrics: {
    lyrics: string[];
  };
}
