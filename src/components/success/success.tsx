import { type FC } from 'react';

import { Card } from '@/components/success/card/card';

interface Props {
  count: number;
  errors: number;
}

export const Success: FC<Props> = ({ count, errors }) => {
  return (
    <div className="container my-16 flex flex-col items-center justify-center gap-8">
      <h2 className="text-3xl font-semibold text-emerald-900">Summary</h2>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 md:flex-row">
        <Card title="Total Occurrences">{count}</Card>
        <Card title="Highest Word Count">Brick By Brick - Arctic Monkeys</Card>
        <Card title="Songs Without Lyrics">{errors}</Card>
      </div>
    </div>
  );
};
