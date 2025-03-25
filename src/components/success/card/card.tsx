import { type FC, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title: string;
  children: ReactNode;
}

export const Card: FC<Props> = ({ className, title, children }) => {
  return (
    <div className={cn('flex-1/2 grow rounded-2xl border border-slate-300 p-8', className)}>
      <h3 className="mb-4 text-xl font-medium text-emerald-900">{title}</h3>
      <p>{children}</p>
    </div>
  );
};
