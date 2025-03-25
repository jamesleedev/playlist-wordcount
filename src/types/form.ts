import { type Track } from '@/types/spotify';

export interface SpotifyData {
  spotify: string;
  word: string;
}

export interface SearchResponse {
  ok: boolean;
  msg: string;
  errors?: {
    [Field in keyof SpotifyData]?: string;
  };
  totalWordCount?: number;
  results?: {
    tracks: (Track & { wordCount: number })[];
  };
  notFound?: {
    count: number;
    tracks: Track[];
  };
}
