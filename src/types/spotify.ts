export interface Track {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
}

export interface SpotifyPlaylist {
  public: boolean;
  tracks: {
    items: { track: Track }[];
    limit: number;
    next: string;
    total: number;
  };
}
