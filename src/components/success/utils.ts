import { type SuccessProps } from '@/components/success/success';
import { type SearchResponse } from '@/types/form';

export const getSuccessProps = (data: SearchResponse): SuccessProps => {
  const results = data.results;
  const topSong =
    results && results.tracks.length > 0
      ? { name: results.tracks[0].name, artist: results.tracks[0].artists[0].name }
      : undefined;

  return { count: data.totalWordCount || 0, errors: data.notFound!.count, topSong };
};
