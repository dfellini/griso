# BugMoto

The website for the [BugMoto YouTube channel](https://youtube.com/@bugmotochannel), live at [www.bugmoto.com](https://www.bugmoto.com). Built with Next.js and Tailwind CSS, and hosted on Vercel.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment variables

Set these in `.env.local` for local development and in the Vercel project settings for production:

| Variable | Used for |
| --- | --- |
| `YOUTUBE_KEY` | Loading the latest videos on the home page |
| `RESEND_API_KEY` | Sending video pitches from `/pitch` through Resend |
| `PITCH_TO_EMAIL` | The address that receives pitches |
| `PITCH_FROM_EMAIL` | The sender, on a domain verified in Resend |
| `GOOGLE_ANALYTICS_ID` | The Google Analytics measurement ID (`G-…`). Only used on production deploys |

## License

The site is based on a Tailwind Plus template. See [LICENSE.md](LICENSE.md).
