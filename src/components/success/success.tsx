import { type FC } from 'react';

import { Details } from '@/components/success/sections/details';
import { Summary } from '@/components/success/sections/summary';
import { type SearchResponse } from '@/types/form';

export interface SuccessProps {
  data: SearchResponse;
}

export const Success: FC<SuccessProps> = ({ data }) => {
  const results = data.results;
  const tracksSortedByResults = results ? [...results.tracks].sort((a, b) => b.wordCount - a.wordCount) : [];
  const topSong = tracksSortedByResults.length > 0 ? tracksSortedByResults[0] : undefined;
  const count = (data.meta && data.meta.totalWordCount) || 0;
  const errors = (data.meta && data?.meta.notFoundCount) || 0;
  const matches = results ? results.tracks.filter((track) => track.wordCount > 0).length : 'N/A';
  const noMatches = results ? results.tracks.filter((track) => track.wordCount === 0).length : 'N/A';

  return (
    <>
      <Summary count={count} matches={matches} noMatches={noMatches} errors={errors} topSong={topSong} />
      <Details data={data} />
    </>
  );
};
