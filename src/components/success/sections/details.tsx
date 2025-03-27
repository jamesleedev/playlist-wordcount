import { type FC, useMemo } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type SearchResponse, type SearchResult } from '@/types/form';

interface Props {
  data: SearchResponse;
}

const itemClassName = cn('text-lg md:text-xl font-medium text-emerald-800 hover:no-underline px-4');
const contentClassName = cn('px-4 text-sm md:text-base');

export const Details: FC<Props> = ({ data }) => {
  const detailsData: (SearchResult & { hasLyrics: boolean })[] = useMemo(() => {
    return data.results
      ? data.results?.tracks.map((track) => ({
          ...track,
          hasLyrics: !!(data.found && data.found.find((foundTrack) => foundTrack.id === track.id) !== undefined),
        }))
      : [];
  }, [data]);

  return (
    <section className="mt-16 flex flex-col items-center justify-center gap-8 text-left">
      <h2>Details</h2>
      <div className="w-full rounded-2xl border border-slate-300">
        <Accordion type="multiple" className="w-full">
          {data.results ? (
            <AccordionItem value="playlist" className="border-b-slate-300">
              <AccordionTrigger className={itemClassName}>Playlist Details</AccordionTrigger>
              <AccordionContent className={contentClassName}>
                <Separator className="mb-4 data-[orientation=horizontal]:w-1/6" />
                <div className="mb-2 grid grid-cols-[minmax(0,_1fr)_1px_40px] gap-x-2 gap-y-1.5 pb-2 md:grid-cols-[minmax(0,_1fr)_1px_90px]">
                  <p className="font-semibold">Name - Artist</p>
                  <Separator orientation="vertical" />
                  <p className="w-full shrink-0 grow-0 text-right font-semibold">Word count</p>
                  <Separator className="col-span-3" />
                  {detailsData.map((track, index) => {
                    return (
                      <>
                        <p>
                          {track.name} - {track.artists[0].name}
                        </p>
                        <Separator orientation="vertical" />
                        <p className="w-full shrink-0 grow-0 text-right font-mono">{track.wordCount}</p>
                        {index !== detailsData.length - 1 ? <Separator className="col-span-3" /> : null}
                      </>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ) : null}
          {data.notFound ? (
            <AccordionItem value="errors">
              <AccordionTrigger className={itemClassName}>Missing Lyrics</AccordionTrigger>
              <AccordionContent className={contentClassName}>
                <Separator className="mb-4 data-[orientation=horizontal]:w-1/6" />
                <div className="mb-4 flex flex-col gap-2">
                  <p className="font-semibold">Name - Artist</p>
                  <Separator />
                  {data.notFound.tracks.map((track) => {
                    return (
                      <>
                        <p>
                          {track.name} - {track.artists[0].name}
                        </p>
                        <Separator className="last:hidden" />
                      </>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
      </div>
    </section>
  );
};
