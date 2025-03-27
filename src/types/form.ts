import { type TrackWithLyrics } from '@/types/lyrics';
import { type Track } from '@/types/spotify';

export interface SearchRequest {
  spotify: string;
  word: string;
}

export type SearchResult = Track & { wordCount: number };

export interface SearchResponse {
  ok: boolean;
  msg: string;
  errors?: {
    [Field in keyof SearchRequest]?: string;
  };
  totalWordCount?: number;
  results?: {
    tracks: SearchResult[];
  };
  found?: TrackWithLyrics[];
  notFound?: {
    count: number;
    tracks: Track[];
  };
}
