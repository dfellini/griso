import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "@/components/Container";
import { partners } from "@/lib/partners";
import gearImage from "@/images/photos/gear.jpg";

export const metadata = {
  title: "Partners",
  description:
    "The companies that support the BugMoto channel, and the gear I actually use.",
};

function Partner({ partner }) {
  return (
    <li className="flex gap-6 py-8 first:pt-0 last:pb-0">
      <div
        className={clsx(
          "relative mt-1 flex h-20 w-20 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0",
          partner.logoBg ?? "bg-gray-500 dark:bg-zinc-800",
        )}
      >
        <Image
          src={partner.logo}
          alt=""
          className="h-20 w-20 object-contain"
          unoptimized
        />
      </div>
      <div className="flex flex-auto flex-col">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <a href={partner.link} target="_blank" rel="noopener noreferrer">
            {partner.company}
          </a>
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {partner.title}
        </p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {partner.description}
        </p>
        <Link
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-sm font-medium text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
        >
          {partner.cta} &rarr;
        </Link>
      </div>
    </li>
  );
}

export default function Partners() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Channel partners, supporters & friends.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            These are the companies that help make BugMoto possible. Some of the
            links below are affiliate links — using them costs you nothing extra
            and helps support the channel.
          </p>
        </div>
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={gearImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
      </header>
      <div className="mt-16 rounded-2xl border border-zinc-100 p-6 sm:mt-20 dark:border-zinc-700/40">
        <ol className="divide-y divide-zinc-100 dark:divide-zinc-700/40">
          {partners.map((partner) => (
            <Partner key={partner.company} partner={partner} />
          ))}
        </ol>
      </div>
    </Container>
  );
}
