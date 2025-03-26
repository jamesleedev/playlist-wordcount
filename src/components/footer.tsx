import { type FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="container py-2 text-center">
      <p className="text-xs">&copy; {new Date().getUTCFullYear()} jamesl.net</p>
    </footer>
  );
};
