import { type FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="container py-2 text-center">
      <p className="text-xs">
        &copy; {new Date().getUTCFullYear()} jamesl.net, with the exception of lyrics, which are works of their
        respective copyright holders. This was a personal project made for fun, and will not be monetised. If you are a
        copyright holder, and have concerns regarding copyright violations, please get in touch at james@jamesl.net.
      </p>
    </footer>
  );
};
