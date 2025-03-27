import { type FC, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title: string;
  children: ReactNode;
}

export const Card: FC<Props> = ({ className, title, children }) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col justify-start gap-2 rounded-2xl border border-slate-300 p-4 md:max-w-[48%] md:gap-4 md:p-8 lg:max-w-[32%]',
        className
      )}
    >
      <h3 className="text-lg font-medium text-emerald-900 md:text-xl">{title}</h3>
      <p className="text-sm md:text-base">{children}</p>
    </div>
  );
};
