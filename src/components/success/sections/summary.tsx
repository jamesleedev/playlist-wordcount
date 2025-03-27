import { type FC, type ReactNode } from 'react';

import { Card } from '@/components/success/subcomponents/card';

interface Props {
  count: ReactNode;
  topSong?: {
    name: string;
    artists: {
      name: string;
    }[];
    wordCount: number;
  };
  matches: ReactNode;
  noMatches: ReactNode;
  errors: ReactNode;
}

export const Summary: FC<Props> = ({ count, topSong, matches, noMatches, errors }) => {
  return (
    <section className="mt-16 flex flex-col items-center justify-center gap-8">
      <h2>Summary</h2>
      <div className="flex w-full flex-col flex-wrap items-center justify-evenly gap-4 md:flex-row md:items-stretch">
        <Card title="Total Occurrences">{count}</Card>
        <Card title="#1 Song">
          {topSong && topSong.name} - {topSong && topSong.artists[0].name}
        </Card>
        <Card title="#1 Song Word Count">{topSong ? topSong.wordCount : 'N/A'}</Card>
        <Card title="Songs With Matches">{matches}</Card>
        <Card title="Songs Without Matches">{noMatches}</Card>
        <Card title="Songs Without Lyrics">{errors}</Card>
      </div>
    </section>
  );
};
