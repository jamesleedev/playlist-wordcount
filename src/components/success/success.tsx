import { type FC } from 'react';

import { Card } from '@/components/success/card/card';

export interface SuccessProps {
  count: number;
  errors: number;
  topSong?: {
    name: string;
    artist: string;
  };
}

export const Success: FC<SuccessProps> = ({ count, errors, topSong }) => {
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
