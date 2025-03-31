# Playlist Wordcount

Creatively named project which fuzzy finds words in a given Spotify playlist.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

There are two parts of the project, `/` and `/api/search`. 
Results are handled in the form submit handler and conditionally rendered.
The `search` route handles fetching playlist details, fetching lyrics, and fuzzy finding occurrences.

Using Tailwind and shadcn/ui.

## Setup

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` or `.env.local` and fill in [Spotify API credentials](https://developer.spotify.com/documentation/web-api):
```bash
cp .env.example .env.local
```

Start local development environment

```bash
npm run dev
```
