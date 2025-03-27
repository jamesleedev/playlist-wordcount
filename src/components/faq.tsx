import { type FC } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CONTENT = [
  {
    q: 'Why are some of my songs missing lyrics?',
    a: "This is due to the limitation of the lyrics.ovh API, and sadly there's nothing I can do about it 😭 I'm looking into better solutions though.",
  },
  {
    q: 'Where is your cookie banner?',
    a: "This site is completely free of cookies, in fact I'm not even logging your IP. The only thing you should know about is Cloudflare's privacy policy and terms of service.",
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
