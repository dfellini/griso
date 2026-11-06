import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { CHANNEL_URL, SITE_NAME } from "@/lib/site";
import { breadcrumbs, videoObject } from "@/lib/structuredData";
import {
  formatDuration,
  formatVideoDate,
  getAllVideos,
  getVideo,
  summarize,
} from "@/lib/youtube";

export const revalidate = 3600;

// Build the newest pages ahead of time. The rest are made the first time
// someone (or a search engine) asks for them, then cached.
export async function generateStaticParams() {
  try {
    const videos = await getAllVideos();
    return videos.slice(0, 24).map(({ id }) => ({ id }));
  } catch (error) {
    console.error("Videos: could not list videos at build time.", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const video = await getVideo(id);

  if (!video) {
    return { title: "Video not found", robots: { index: false } };
  }

  const description = summarize(
    video.description,
    `${video.fullTitle}, a motorcycle video from ${SITE_NAME}.`,
  );

  // Search results cut titles off at about 60 characters, so only add the site
  // name when it fits.
  const suffixedTitle = `${video.fullTitle} - ${SITE_NAME}`;
  const pageTitle =
    suffixedTitle.length <= 60 ? suffixedTitle : video.fullTitle;

  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: video.path },
    openGraph: {
      title: pageTitle,
      description,
      url: video.path,
      siteName: SITE_NAME,
      type: "video.other",
      locale: "en_US",
      images: [{ url: video.thumbnail, width: 1280, height: 720 }],
    },
  };
}

// Descriptions can include affiliate links, so outside links are marked for
// search engines. Links back to this site are normal internal links.
function isOwnSite(url) {
  return /^https?:\/\/(www\.)?bugmoto\.com(\/|$)/i.test(url);
}

/** Shows YouTube's description as text with its links made clickable. */
function Description({ text }) {
  const parts = text.split(/(https?:\/\/[^\s<>"]+)/g);

  return (
    <div className="text-[21px] leading-[1.6] break-words whitespace-pre-line lg:text-[23px]">
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={part}
            {...(!isOwnSite(part) && {
              target: "_blank",
              rel: "sponsored nofollow noopener noreferrer",
            })}
            className="font-medium underline underline-offset-4 hover:text-moto-red-dark"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </div>
  );
}

async function MoreVideos({ currentId }) {
  let videos;

  try {
    videos = await getAllVideos();
  } catch (error) {
    console.error("Video page: could not load more videos.", error);
    return null;
  }

  const more = videos.filter(({ id }) => id !== currentId).slice(0, 3);

  if (more.length === 0) {
    return null;
  }

  return (
    <section className="bg-ink text-white">
      <div className="page-gutter py-12 lg:py-20">
        <h2 className="display mb-8 text-[52px] leading-[1.04] lg:text-[72px]">
          More from BugMoto
        </h2>
        <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-3">
          {more.map((video) => (
            <li key={video.id}>
              <Link href={video.path} className="group block">
                <Image
                  src={video.smallThumbnail}
                  alt=""
                  width={480}
                  height={270}
                  unoptimized
                  className="aspect-video w-full object-cover"
                />
                <span className="display mt-3 block text-[26px] leading-[1.16] underline-offset-4 group-hover:underline">
                  {video.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/videos"
          className="label mt-8 inline-flex min-h-11 items-center text-[26px] font-bold underline-offset-[6px] hover:underline"
        >
          See all the videos &rarr;
        </Link>
      </div>
    </section>
  );
}

export default async function VideoPage({ params }) {
  const { id } = await params;
  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  const duration = formatDuration(video.duration);

  return (
    <>
      <JsonLd data={videoObject(video)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Videos", path: "/videos" },
          { name: video.title, path: video.path },
        ])}
      />

      <article>
        <header className="bg-ink text-white">
          <div className="page-gutter py-8 lg:py-12">
            <nav aria-label="Breadcrumb">
              <Link
                href="/videos"
                className="label inline-flex min-h-11 items-center text-[22px] underline-offset-[6px] hover:underline"
              >
                &larr; All videos
              </Link>
            </nav>
            {video.series && (
              <p className="label mt-3 text-[21px] font-bold tracking-[0.08em] text-[#ff5a5a] lg:text-2xl">
                {video.series}
              </p>
            )}
            <h1 className="display mt-2 max-w-[24ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.08]">
              {video.title}
            </h1>
            {video.embeddable ? (
              <div className="mt-7 aspect-video w-full bg-black lg:mt-9">
                <iframe
                  src={video.embedUrl}
                  title={video.fullTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <a href={video.youtubeUrl} className="mt-7 block lg:mt-9">
                <Image
                  src={video.thumbnail}
                  alt={`Watch ${video.fullTitle} on YouTube`}
                  width={1280}
                  height={720}
                  sizes="100vw"
                  priority
                  className="aspect-video w-full object-cover"
                />
              </a>
            )}
          </div>
        </header>

        <div className="page-gutter py-10 lg:py-16">
          <div className="max-w-[46rem]">
            <p className="label mb-6 text-[22px]">
              <time dateTime={video.publishedAt}>
                {formatVideoDate(video.publishedAt)}
              </time>
              {duration && ` / ${duration}`}
            </p>
            {video.description && <Description text={video.description} />}
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href={CHANNEL_URL} className="w-full sm:w-auto">
                Subscribe on YouTube
              </Button>
              <Button
                href={video.youtubeUrl}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </article>

      <MoreVideos currentId={video.id} />
    </>
  );
}
