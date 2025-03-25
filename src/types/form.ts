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
  wordCount?: number;
  notFoundCount?: number;
}
