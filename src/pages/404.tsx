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
          <h1>404 Page not found</h1>
          <Button asChild>
            <Link href="/" className="no-underline">
              Back to homepage
            </Link>
          </Button>
        </main>
        <p className="mb-2 text-xs">&copy; 2025 jamesl.net</p>
      </div>
    </>
  );
}
