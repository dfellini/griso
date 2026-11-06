import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { CHANNEL_URL, pageMetadata } from "@/lib/site";
import { breadcrumbs } from "@/lib/structuredData";
import { formatVideoDate, getAllVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "All Motorcycle Videos",
  description:
    "Every BugMoto video in one place: motorcycle reviews, ride stories, how-tos and opinions from Bug, a Portland rider who came back to riding later in life.",
  path: "/videos",
});

function groupByYear(videos) {
  const years = new Map();

  for (const video of videos) {
    const year = new Date(video.publishedAt).getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), video]);
  }

  return [...years.entries()];
}

function VideoCard({ video }) {
  return (
    <li>
      <Link href={video.path} className="group block">
        <Image
          src={video.smallThumbnail}
          alt=""
          width={480}
          height={270}
          unoptimized
          className="aspect-video w-full bg-zinc-200 object-cover"
        />
        <span className="display mt-3 block text-[26px] leading-[1.16] underline-offset-4 group-hover:underline">
          {video.title}
        </span>
        <span className="mt-2 block text-[17px] font-medium">
          {formatVideoDate(video.publishedAt)}
        </span>
      </Link>
    </li>
  );
}

export default async function Videos() {
  const videos = await getAllVideos();

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Videos", path: "/videos" },
        ])}
      />
      <section className="bg-moto-red">
        <div className="page-gutter py-10 lg:py-16">
          <h1 className="display text-[clamp(3.5rem,11vw,8.25rem)] leading-[1.06] text-white">
            All the videos.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-[1.42] font-medium lg:text-2xl">
            Every BugMoto video in one place: motorcycle reviews, ride stories,
            how-tos and opinions, newest first.
          </p>
        </div>
      </section>

      <div className="page-gutter py-10 lg:py-16">
        {groupByYear(videos).map(([year, yearVideos]) => (
          <section key={year} className="mb-14 last:mb-0">
            <h2 className="display mb-6 border-b-[5px] border-ink pb-3 text-[52px] leading-none lg:text-[72px]">
              {year}
            </h2>
            <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {yearVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </ul>
          </section>
        ))}
        <Button href={CHANNEL_URL} className="mt-12 w-full sm:w-auto">
          Subscribe on YouTube
        </Button>
      </div>
    </>
  );
}
