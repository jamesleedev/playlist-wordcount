import { type FC } from 'react';

import { Card } from '@/components/success/card/card';
import { type SearchResponse } from '@/types/form';

export interface SuccessProps {
  data: SearchResponse;
}

export const Success: FC<SuccessProps> = ({ data }) => {
  const results = data.results;
  const topSong =
    results && results.tracks.length > 0
      ? { name: results.tracks[0].name, artist: results.tracks[0].artists[0].name }
      : undefined;
  const count = data.totalWordCount || 0;
  const errors = data.notFound!.count;

  return (
    <div className="container mt-16 flex flex-col items-center justify-center gap-8">
      <h2>Summary</h2>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 md:flex-row md:items-stretch">
        <Card title="Total Occurrences">{count}</Card>
        <Card title="Highest Word Count">
          {topSong && topSong.name} - {topSong && topSong.artist}
        </Card>
        <Card title="Songs Without Lyrics">{errors}</Card>
      </div>
    </div>
  );
};
