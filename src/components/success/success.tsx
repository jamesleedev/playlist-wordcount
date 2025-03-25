import { type FC } from 'react';

import { Card } from '@/components/success/card/card';

interface Props {
  count: number;
  errors: number;
}

export const Success: FC<Props> = ({ count, errors }) => {
  return (
    <div className="container mt-16 flex flex-col items-center justify-center gap-8">
      <h2>Summary</h2>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 md:flex-row md:items-stretch">
        <Card title="Total Occurrences">{count}</Card>
        <Card title="Highest Word Count">-</Card>
        <Card title="Songs Without Lyrics">{errors}</Card>
      </div>
    </div>
  );
};
