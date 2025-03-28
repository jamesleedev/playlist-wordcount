import { RiBlueskyFill, RiGithubFill } from '@remixicon/react';
import Link from 'next/link';
import { type FC } from 'react';

export const Navbar: FC = () => {
  return (
    <nav className="w-full bg-slate-300">
      <div className="container flex flex-col items-center justify-between gap-2 py-4 sm:flex-row">
        <p className="font-mono text-2xl font-bold text-emerald-900">jamesl.net</p>
        <div className="flex items-center justify-evenly gap-5">
          <Link
            href="https://bsky.app/profile/jamesl.net"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My Bluesky account"
          >
            <RiBlueskyFill size={24} className="fill-slate-700" />
          </Link>
          <Link
            href="https://github.com/jamesleedev/playlist-wordcount"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository of this project"
          >
            <RiGithubFill size={24} className="fill-slate-700" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
