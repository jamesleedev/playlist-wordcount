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
        'flex w-full grow flex-col justify-between gap-4 rounded-2xl border border-slate-300 p-8 md:w-1/3 md:flex-1/3',
        className
      )}
    >
      <h3 className="text-xl font-medium text-emerald-900">{title}</h3>
      <p>{children}</p>
    </div>
  );
};
