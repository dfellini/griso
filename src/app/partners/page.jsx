import Image from "next/image";
import clsx from "clsx";

import gearImage from "@/images/photos/gear.jpg";
import { partners } from "@/lib/partners";

export const metadata = {
  title: "Partners",
  description:
    "The companies that support the BugMoto channel, and the gear I actually use.",
};

function Partner({ partner }) {
  return (
    <li className="flex flex-col gap-3 border-b-2 border-ink p-6 sm:border-r-2 lg:p-8">
      <div
        className={clsx(
          "relative flex h-24 w-24 flex-none items-center justify-center",
          partner.logoBg ?? "bg-zinc-600",
        )}
      >
        <Image
          src={partner.logo}
          alt=""
          className="h-24 w-24 object-contain"
          unoptimized
        />
      </div>
      <h2 className="display mt-2 text-[34px] leading-[1.1]">
        <a
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {partner.company}
        </a>
      </h2>
      <p className="label text-xl font-bold text-moto-red-dark">
        {partner.title}
      </p>
      <p className="flex-1 text-[19px] leading-[1.5]">{partner.description}</p>
      <a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center font-condensed text-[23px] leading-tight font-bold underline underline-offset-4 hover:text-moto-red-dark"
      >
        {partner.cta} &rarr;
      </a>
    </li>
  );
}

export default function Partners() {
  return (
    <>
      <section className="flex flex-col-reverse bg-moto-red lg:flex-row lg:items-stretch">
        <div className="flex flex-col justify-end gap-6 px-4 py-9 sm:px-8 lg:w-1/2 lg:px-12 lg:py-16">
          <h1 className="display text-[clamp(3.25rem,14vw,6.5rem)] leading-[1.06] text-white lg:text-[clamp(3.5rem,6.9vw,6.5rem)]">
            Channel partners, supporters &amp; friends.
          </h1>
          <p className="max-w-[560px] text-xl leading-[1.42] font-medium lg:text-[22px]">
            These are the companies that help make BugMoto possible. Some of the
            links below are affiliate links. Using them costs you nothing extra
            and helps support the channel.
          </p>
        </div>
        <div className="relative aspect-[3/2] bg-ink lg:aspect-auto lg:min-h-[min(46vw,48rem)] lg:w-1/2">
          <Image
            src={gearImage}
            alt="Bug beside a loaded BMW R1250GS on a winding mountain road"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_70%]"
          />
        </div>
      </section>

      <section className="page-gutter py-12 lg:py-20">
        <ol className="grid border-t-2 border-l-2 border-ink sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Partner key={partner.company} partner={partner} />
          ))}
        </ol>
      </section>
    </>
  );
}
