import { type FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="mx-auto mb-16 max-w-[40rem] text-center">
      <h1 className="mb-8 text-4xl font-medium text-emerald-900">Playlist Word Count</h1>
      <p className="mb-4">
        This is a small site I made in like a day to count how many shots to take if we&apos;re playing drinking games
        when a word comes up in an album/playlist.
      </p>
      <p className="mb-4 font-medium">Paste your Spotify share link, and the word you want to search for.</p>
    </header>
  );
};
