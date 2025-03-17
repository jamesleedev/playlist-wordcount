import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jbmono',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
