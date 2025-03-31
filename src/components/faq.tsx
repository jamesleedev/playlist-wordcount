import { type FC } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CONTENT = [
  {
    q: 'Why are some of my songs missing lyrics?',
    a: "This is due to the limitation of the lyrics.ovh API, and sadly there's nothing I can do about it 😭 I also don't want to scrape any copyrighted works and get into legal trouble.",
  },
  {
    q: 'Where is your cookie banner?',
    a: (
      <>
        This site is completely free of cookies. The only thing you should know about is Cloudflare&apos;s{' '}
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
          privacy policy
        </a>{' '}
        and{' '}
        <a href="https://www.cloudflare.com/website-terms/" target="_blank" rel="noopener noreferrer">
          terms of service.
        </a>
      </>
    ),
  },
];

export const Faq: FC = () => {
  return (
    <section>
      <h2 className="mb-4">FAQs</h2>
      <div className="text-left">
        <Accordion type="single" collapsible className="w-full">
          {CONTENT.map(({ q, a }) => (
            <AccordionItem value={q} key={q} className="border-b-slate-300">
              <AccordionTrigger className="font-bold text-slate-600">{q}</AccordionTrigger>
              <AccordionContent>
                <p>{a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
