import { NextSeo } from 'next-seo';

import { Header } from '@/components/@index/header';
import { Faq } from '@/components/faq';
import { Footer } from '@/components/footer';
import { Form } from '@/components/form';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Playlist Wordcount | jamesl.net"
        description="Simple app to count words in a playlist, does exactly what the name suggests"
        noindex
        openGraph={{
          title: 'Playlist Wordcount | jamesl.net',
          description: 'Simple app to count words in a playlist, does exactly what the name suggests',
          url: 'https://pwc.jamesl.net',
          site_name: 'Playlist Wordcount',
          images: [
            {
              url: 'https://pwc.jamesl.net/og-image.png',
              width: 1200,
              height: 630,
              alt: 'Playlist Wordcount',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
            href: '/favicons/16x16.png',
          },
          {
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
            href: '/favicons/32x32.png',
          },
          {
            rel: 'icon',
            sizes: '48x48',
            type: 'image/png',
            href: '/favicons/48x48.png',
          },
          {
            rel: 'icon',
            sizes: '64x64',
            type: 'image/png',
            href: '/favicons/64x64.png',
          },
          {
            rel: 'shortcut icon',
            href: '/favicon.ico',
          },
        ]}
      />
      <div className="flex h-screen flex-col items-center justify-between font-sans text-slate-900">
        <Navbar />
        <main className="container grow py-20 text-center">
          <Header />
          <Form />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  );
}
