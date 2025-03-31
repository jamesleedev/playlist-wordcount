import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';

export default function Custom404() {
  return (
    <>
      <NextSeo noindex nofollow title="404 | jamesl.net" description="404 page not found." />
      <div className="flex h-screen flex-col items-center justify-between font-sans text-slate-900">
        <Navbar />
        <main className="container grow py-20 text-center">
          <h1>500 Server error</h1>
          <p className="mb-8">
            Ok something really bad happened. Get in touch at my bsky if this keeps happening{' '}
            <a href="https://bsky.app/profile/jamesl.net" target="_blank" rel="noopener noreferrer">
              @jamesl.net
            </a>
            .
          </p>
          <Button asChild>
            <Link href="/" className="no-underline">
              Back to homepage
            </Link>
          </Button>
        </main>
      </div>
    </>
  );
}
