import Image from "next/image";
import Link from "next/link";
import he from "he";

import { Button } from "@/components/Button";
import portrait from "@/images/photos/bugportrait.jpg";
import { partners } from "@/lib/partners";

const CHANNEL_URL = "https://youtube.com/@bugmotochannel";

async function getLatestVideos() {
  try {
    // Uploads playlist (channel ID with "UC" -> "UU"). Unlike search.list, this
    // is always current — the search index can lag new uploads by days.
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU-GaHIsTlT1KUt5c4yWNUDA&maxResults=5&key=${process.env.YOUTUBE_KEY}`,
      { next: { revalidate: 180 } },
    );

    if (!response.ok) {
      console.error(`Home page: YouTube returned ${response.status}.`);
      return [];
    }

    const { items = [] } = await response.json();

    return items.map(({ snippet }) => {
      const [title, series] = he.decode(snippet.title).split(" | ");
      const { maxres, standard, high } = snippet.thumbnails;

      return {
        id: snippet.resourceId.videoId,
        title,
        series,
        thumbnail: (maxres ?? standard ?? high).url,
        url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
        publishedAt: snippet.publishedAt,
      };
    });
  } catch (error) {
    console.error("Home page: could not load videos from YouTube.", error);
    return [];
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 40 46" aria-hidden="true" {...props}>
      <path d="M0 0 L40 23 L0 46 Z" fill="currentColor" />
    </svg>
  );
}

function Hero({ latestUrl }) {
  return (
    <section className="flex flex-col-reverse bg-moto-red lg:flex-row lg:items-stretch">
      <div className="flex flex-col justify-end gap-8 px-4 py-9 sm:px-8 lg:w-1/2 lg:px-12 lg:py-16">
        <h1 className="display text-[clamp(4rem,19.5vw,8.25rem)] leading-[1.1] text-white lg:text-[clamp(4rem,9.2vw,8.25rem)]">
          Die young.
          <br />
          As late as
          <br />
          possible.
        </h1>
        <div className="flex flex-wrap gap-3.5">
          <Button href={CHANNEL_URL} className="w-full sm:w-auto">
            Subscribe on YouTube
          </Button>
          <Button
            href={latestUrl}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Watch the latest
          </Button>
        </div>
      </div>
      <div className="relative aspect-[3839/4030] bg-ink lg:aspect-auto lg:min-h-[min(54vw,56rem)] lg:w-1/2">
        <Image
          src={portrait}
          alt="Bug in a helmet with a yellow chin bar, leaning on a loaded Triumph motorcycle on an open road under a teal sky"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_40%]"
        />
      </div>
    </section>
  );
}

function LatestVideo({ video }) {
  return (
    <section className="bg-ink text-white">
      <p className="page-gutter label pt-7 text-[clamp(1.5rem,2.2vw,1.875rem)] leading-tight tracking-[0.02em]">
        A passion for motorcycles and the places they take us.
      </p>
      <div className="page-gutter grid gap-6 pt-8 pb-11 lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-12 lg:pt-10 lg:pb-24">
        <a
          href={video.url}
          aria-label={`Watch ${video.title} on YouTube`}
          className="group relative block"
        >
          <Image
            src={video.thumbnail}
            alt=""
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="aspect-video w-full object-cover"
          />
          <span className="absolute bottom-0 left-0 flex h-16 w-16 items-center justify-center bg-moto-red text-white transition-colors group-hover:bg-moto-red-dark lg:h-[104px] lg:w-[104px]">
            <PlayIcon className="h-7 w-6 lg:h-[46px] lg:w-10" />
          </span>
        </a>
        <div className="flex flex-col gap-4 lg:gap-6">
          <p className="label text-[21px] font-bold tracking-[0.08em] text-[#ff5a5a] lg:text-2xl">
            Latest video
            {video.series && ` / ${video.series}`}
          </p>
          <h2 className="display text-[40px] leading-[1.12] lg:text-[clamp(3rem,4.4vw,4rem)] lg:leading-[1.08]">
            {video.title}
          </h2>
          <a
            href={video.url}
            className="label inline-flex min-h-11 items-center text-[26px] font-bold underline-offset-[6px] hover:underline"
          >
            Watch on YouTube &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function RecentVideos({ videos }) {
  return (
    <section className="page-gutter py-10 lg:py-24">
      <h2 className="display mb-5 text-[52px] leading-[1.04] lg:mb-10 lg:text-[88px] lg:leading-none">
        Also on the channel
      </h2>
      <ol className="border-t-[5px] border-ink lg:border-t-[6px]">
        {videos.map((video, index) => (
          <li key={video.id} className="border-b-2 border-ink">
            <a
              href={video.url}
              className="group grid grid-cols-[46px_1fr] gap-x-3.5 py-[18px] sm:grid-cols-[70px_1fr] lg:grid-cols-[96px_1fr_110px_240px] lg:items-center lg:gap-x-10 lg:py-6"
            >
              <span className="display text-[34px] leading-[1.1] text-moto-red-dark sm:text-5xl lg:text-[64px] lg:leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display text-[27px] leading-[1.16] underline-offset-4 group-hover:underline sm:text-[34px] lg:text-[clamp(2rem,3vw,2.75rem)] lg:leading-[1.12]">
                {video.title}
              </span>
              <span className="col-start-2 mt-2 text-[17px] font-medium lg:col-start-auto lg:mt-0 lg:text-[19px]">
                {formatDate(video.publishedAt)}
              </span>
              <Image
                src={video.thumbnail}
                alt=""
                width={480}
                height={270}
                sizes="240px"
                className="hidden aspect-video w-[240px] object-cover lg:block"
              />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PitchAndPartners() {
  return (
    <section className="flex flex-col lg:flex-row lg:items-stretch">
      <div className="flex flex-col items-start gap-5 bg-moto-red px-4 py-10 sm:px-8 lg:w-1/2 lg:gap-6 lg:px-12 lg:py-[72px]">
        <h2 className="display text-[60px] leading-[1.04] text-white lg:text-[96px] lg:leading-[1.02]">
          Got an idea?
          <br />
          Pitch me.
        </h2>
        <p className="max-w-[500px] text-[19px] leading-[1.45] font-medium lg:text-[22px]">
          A road worth riding, gear worth testing, a question you&rsquo;d like
          answered. Tell me about it.
        </p>
        <Button href="/pitch" className="w-full sm:w-auto">
          Pitch a video
        </Button>
      </div>
      <div className="bg-ink px-4 py-10 text-white sm:px-8 lg:w-1/2 lg:px-12 lg:py-[72px]">
        <h2 className="display mb-7 text-[44px] leading-[1.05] lg:text-[56px]">
          <Link href="/partners" className="hover:underline">
            Partners, supporters &amp; friends
          </Link>
        </h2>
        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {partners.map((partner) => (
            <li key={partner.company}>
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-condensed text-[27px] leading-tight font-semibold underline-offset-4 hover:underline"
              >
                {partner.company}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/partners"
          className="label mt-5 inline-flex min-h-11 items-center text-2xl font-bold underline-offset-[6px] hover:underline"
        >
          Meet the partners &rarr;
        </Link>
      </div>
    </section>
  );
}

export default async function Home() {
  const videos = await getLatestVideos();
  const [latest, ...recent] = videos;

  return (
    <>
      <Hero latestUrl={latest?.url ?? CHANNEL_URL} />
      {latest && <LatestVideo video={latest} />}
      {recent.length > 0 && <RecentVideos videos={recent} />}
      <PitchAndPartners />
    </>
  );
}
