import { FC } from 'react';
import { RiBlueskyFill, RiGithubFill, RiHome4Fill } from '@remixicon/react';
import Link from 'next/link';

export const Navbar: FC = () => {
  return (
    <nav className="w-full bg-slate-300">
      <div className="container flex flex-col items-center justify-between gap-2 py-4 sm:flex-row">
        <p className="font-mono text-2xl font-bold text-emerald-900">Jamesl.dev</p>
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
          <Link href="https://www.jamesl.dev" target="_blank" rel="noopener noreferrer" aria-label="My homepage">
            <RiHome4Fill size={24} className="fill-slate-700" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
