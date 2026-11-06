import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import helmetPhoto from "@/images/photos/bug-3.jpg";
import desertPhoto from "@/images/photos/bug-5.jpg";
import { pageMetadata, SITE_URL } from "@/lib/site";
import { person } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "About Bug",
  description:
    "I’m Bug, a Portland rider and the creator of BugMoto. I started riding again later in life, and it changed everything.",
  path: "/about",
});

const FIND_ME_LINKS = [
  { href: "https://youtube.com/@bugmotochannel", label: "Follow on YouTube" },
  {
    href: "https://www.instagram.com/bugmotochannel/",
    label: "Follow on Instagram",
  },
  { href: "mailto:dan@bugmoto.com", label: "dan@bugmoto.com" },
];

const paragraph = "text-[21px] leading-[1.6] font-normal lg:text-[23px]";

export default function About() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "ProfilePage",
          url: `${SITE_URL}/about`,
          mainEntity: person,
        }}
      />
      <section className="flex flex-col-reverse bg-moto-red lg:flex-row lg:items-stretch">
        <div className="flex flex-col justify-end px-4 py-9 sm:px-8 lg:w-1/2 lg:px-12 lg:py-16">
          <h1 className="display text-[clamp(3rem,13vw,6.25rem)] leading-[1.08] text-white lg:text-[clamp(3.5rem,6.6vw,6.25rem)]">
            I&rsquo;m Bug, an avid motorcycle enthusiast and the creator of
            BugMoto.
          </h1>
        </div>
        <div className="relative aspect-[3/2] bg-ink lg:aspect-auto lg:min-h-[min(46vw,48rem)] lg:w-1/2">
          <Image
            src={helmetPhoto}
            alt="Bug taking a wide-eyed selfie in a white helmet, with a motorcycle parked behind"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[48%_30%]"
          />
        </div>
      </section>

      <section className="page-gutter grid gap-12 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20 lg:py-20">
        <div className="flex max-w-[46rem] flex-col gap-6">
          <p className={paragraph}>
            My name is Dan Fellini, but on the mean streets of Portland
            I&rsquo;m known as Bug.
          </p>
          <p className={paragraph}>
            I live in the Pacific Northwest, but I was born and raised in the
            Boston area. I&rsquo;m super passionate about motorcycles, and I
            believe they are not only fun, viable transportation options, but
            the key to a healthy, happy and youthful life.
          </p>
          <p className={paragraph}>
            In my early 30s I gave up riding and moved to Portland, OR. Only
            recently did I start riding again, and it&rsquo;s dramatically
            changed my life.
          </p>
          <p className={paragraph}>
            My goal with this channel is to inspire. To bring the same level of
            enthusiasm I have for riding to my content, and hopefully spark
            something within you.
          </p>
        </div>
        <aside className="flex flex-col gap-6">
          <div className="relative aspect-square w-full max-w-md lg:max-w-none">
            <Image
              src={desertPhoto}
              alt="Bug leaning on a loaded adventure motorcycle in high desert hills under a big sky"
              fill
              sizes="(min-width: 1024px) 30vw, 28rem"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="display border-t-[5px] border-ink pt-3 text-[40px] leading-tight">
              Find me
            </h2>
            <ul className="mt-2">
              {FIND_ME_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-flex min-h-11 items-center text-xl font-semibold underline underline-offset-4 hover:text-moto-red-dark"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="bg-ink text-white">
        <div className="page-gutter py-14 lg:py-24">
          <p className="display max-w-[22ch] text-[clamp(3rem,7vw,6.25rem)] leading-[1.1]">
            If you think you&rsquo;re too old, too afraid, too whatever&hellip;{" "}
            <span className="text-[#ff5a5a]">Give it another chance.</span>
          </p>
          <p className="mt-7 max-w-3xl text-[24px] leading-snug font-medium lg:text-[28px]">
            Try riding and see if it changes you the way it&rsquo;s changed me.
          </p>
        </div>
      </section>

      <section className="page-gutter py-12 lg:py-20">
        <div className="flex max-w-[46rem] flex-col gap-6">
          <p className={paragraph}>
            When I&rsquo;m not on a motorcycle, I&rsquo;m probably coding. My
            background is in software development, content production and
            journalism. I have a mass communications (print journalism &amp;
            radio) degree from Emerson College in Boston, MA. and work as a
            software developer for a Portland-based nonprofit.
          </p>
          <p className={paragraph}>I&rsquo;m happily married to LadyBug.</p>
        </div>
      </section>
    </>
  );
}
