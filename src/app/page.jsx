import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  YouTubeIcon,
  InstagramIcon,
} from '@/components/SocialIcons'
import logoAerostich from '@/images/partners/aerostich.webp'
import logoCyclops from '@/images/partners/cyclops.webp'
import logoLoneRider from '@/images/partners/lone-rider.svg'
import logoChigee from '@/images/partners/chigee.avif'
import logoVeridian from '@/images/partners/veridian.png'
import logoStegra from '@/images/partners/stegra.png'
import logoSabatino from '@/images/partners/sabatino.png'
import image1 from '@/images/photos/bug-4.jpg'
import image2 from '@/images/photos/bug-2.jpg'
import image3 from '@/images/photos/bug-3.jpg'
import image4 from '@/images/photos/bug-1.jpg'
import image5 from '@/images/photos/bug-5.jpg'
import { getAllArticles } from '@/lib/articles'
import { FaMotorcycle } from "react-icons/fa";


const videos = await fetch(
  `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-GaHIsTlT1KUt5c4yWNUDA&maxResults=5&order=date&type=video&key=AIzaSyBrbXSd6TM_UMs4SxCWmcfbuxb3Jg7gfKA`
).then((res) => res.json());

export default async function Home() {
  
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-4">
            A passion for motorcycles and the places they take us.
          </h1>
           <h2 className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">
           Welcome to BugMoto. Let’s ride together.
           </h2>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Whether you’re a seasoned rider, a returning motorcyclist, or just someone who loves the open road, this is a space for inspiring stories, insightful videos, and a few laughs along the way.<br />
            Join us in building a lasting community of ‘older’ riders who share a passion for motorcycles, riding and living every moment.
          </p>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 text-right">
            – bug
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://youtube.com/@bugmotochannel"
              aria-label="Follow on YouTube"
              icon={YouTubeIcon}
            />
            <SocialLink
              href="https://www.instagram.com/bugmotochannel/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">
           BugMoto on YouTube
           </h2>
            {videos.items.map((video) => (
              <Video key={video.etag} video={video} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <Partners />
          </div>
        </div>
      </Container>
    </>
  )
}


function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <div className="aspect-9/10">
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}




function Video({ video }) {
  return (

    <Card as="article">
      <Card.Title href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
        {video.snippet.title}
      </Card.Title>
      <Image
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
        width={640}
        height={360}
        className="rounded-md aspect-video object-cover"

      />
      <Card.Eyebrow as="time" dateTime={video.snippet.publishedAt} decorate>
       Released on {new Date(video.snippet.publishedAt).toLocaleDateString()}
      </Card.Eyebrow>
      <Card.Description>
      {video.snippet.description}
      </Card.Description>
      <Card.Cta>Watch the video on YouTube</Card.Cta>
    </Card>

  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
          />
        </span>
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Company({ company }) {


  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 bg-gray-500">
        <Image src={company.logo} alt="" className="h-12 w-12 object-contain" unoptimized  />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <a href={company?.link}>{company.company}</a>
        </dd>
        <dt className="sr-only">Products</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {company.title}
        </dd>

      </dl>
    </li>
  )
}

function Partners() {
  let companies = [
    {
      company: 'Lone Rider',
      title: 'Motorcycle bags & accessories',
      logo: logoLoneRider,
      link: "https://www.lonerider-motorcycle.com/?rfsn=8671235.dfdd10",
    },
    {
      company: 'Aerostich',
      title: 'Riding suits & gear',
      logo: logoAerostich,
      link: "https://aerostich.com/bugmoto",
    },
    {
      company: 'Veridian Cruise',
      title: 'Motorcycle cruise control',
      logo: logoVeridian,
      link: "https://veridiancruise.com/?coupon=bugmoto",
    },
    {
      company: 'Cyclops Adventure Sports',
      title: 'Auxiliary motorcycle lighting',
      logo: logoCyclops,
      link: "https://www.cyclopsadventuresports.com/",
    },
        {
      company: 'Stegra.io',
      title: 'Navigation software',
      logo: logoStegra,
      link: "https://stegra.io/",
    },
    {
      company: 'Chigee',
      title: 'CarPlay & Android Auto devices',
      logo: logoChigee,
      link: "https://www.chigee.com/",
    },
        {
      company: 'Sabatino Moto',
      title: "Portland's Royal Enfield dealer",
      logo: logoSabatino,
      link: "https://www.sabatinomoto.com/",
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {/* <BriefcaseIcon className="h-6 w-6 flex-none" /> */}
        <FaMotorcycle className="h-6 w-6 flex-none" />
        <span className="ml-3">Channel partners, supporters & friends</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {companies.map((company, companyIndex) => (
          <Company key={companyIndex} company={company} />
        ))}
      </ol>

    </div>
  )
}