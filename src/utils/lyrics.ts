import {
  type CreateLyricsPromise,
  type GetAllLyrics,
  type SortLyrics,
  type TrackWithApiResult,
  type TrackWithError,
  type TrackWithLyrics,
} from '@/types/lyrics';
import { type Track } from '@/types/spotify';

export const getAllLyrics: GetAllLyrics = async (playlist, connections, timeout) => {
  const tracks: Track[] = playlist.tracks.items.map((item) => item.track);
  const processedTracks = tracks.map((track) => createLyricsPromise(track));
  const queue: Promise<TrackWithApiResult>[][] = [];
  const lyrics: TrackWithApiResult[] = [];

  for (let i = 0; i < processedTracks.length; i += connections) {
    queue.push(processedTracks.slice(i, i + connections));
  }

  for (let j = 0; j < queue.length; j++) {
    await new Promise((resolve) => setTimeout(resolve, timeout));

    const trackPromises = queue[j];

    const lyricsList = await Promise.all(trackPromises);

    lyrics.push(...lyricsList);
  }

  return lyrics;
};

const createLyricsPromise: CreateLyricsPromise = async (track) => {
  const lyricsEndpoint = encodeURI(`https://api.lyrics.ovh/v1/${track.artists[0].name}/${track.name}`);
  const response = await fetch(lyricsEndpoint);
  const data = await response.json();

  return { id: track.id, name: track.name, artists: track.artists, lyrics: data };
};

export const sortLyrics: SortLyrics = (tracks) => {
  return [
    tracks.filter((track) => 'lyrics' in track.lyrics) as unknown as TrackWithLyrics[],
    tracks.filter((track) => 'error' in track.lyrics) as unknown as TrackWithError[],
  ];
};
