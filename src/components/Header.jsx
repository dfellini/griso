'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import logo from '@/images/bugmoto-square.png'

const YOUTUBE_URL = 'https://youtube.com/@bugmotochannel'

const NAV_LINKS = [
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About Bug' },
  { href: '/partners', label: 'Partners' },
  { href: '/pitch', label: 'Pitch a Video' },
  { href: 'https://www.instagram.com/bugmotochannel/', label: 'Instagram' },
]

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

function MobileNavigation({ className }) {
  return (
    <Popover className={className}>
      <PopoverButton className="label flex min-h-12 items-center border-2 border-white px-5 text-[22px] font-bold text-white">
        Menu
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 z-40 bg-ink/70" />
      <PopoverPanel
        focus
        className="fixed inset-x-0 top-0 z-50 bg-ink px-4 pt-3 pb-8 text-white"
      >
        <div className="flex justify-end">
          <PopoverButton
            aria-label="Close menu"
            className="flex h-12 w-12 items-center justify-center"
          >
            <CloseIcon className="h-8 w-8" />
          </PopoverButton>
        </div>
        <nav aria-label="Main">
          <ul className="label divide-y divide-white/25 text-3xl">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <PopoverButton
                  as={Link}
                  href={href}
                  className="flex min-h-16 items-center"
                >
                  {label}
                </PopoverButton>
              </li>
            ))}
          </ul>
        </nav>
        <PopoverButton
          as={Link}
          href={YOUTUBE_URL}
          className="label mt-6 flex min-h-16 items-center justify-center bg-moto-red text-[26px] font-bold"
        >
          Subscribe on YouTube
        </PopoverButton>
      </PopoverPanel>
    </Popover>
  )
}

function DesktopNavigation({ className }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={className}>
      <ul className="label flex items-center gap-9 text-[22px]">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'inline-flex min-h-12 items-center whitespace-nowrap underline-offset-[6px] hover:underline',
                  isActive && 'underline',
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            href={YOUTUBE_URL}
            className="flex min-h-12 items-center bg-moto-red px-[22px] text-2xl whitespace-nowrap hover:bg-moto-red-dark"
          >
            Subscribe
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export function Header() {
  return (
    <header className="bg-ink text-white">
      <div className="page-gutter flex items-center justify-between gap-6 py-3 lg:py-4">
        <Link href="/" aria-label="BugMoto home" className="block">
          <Image
            src={logo}
            alt=""
            priority
            sizes="64px"
            className="h-[52px] w-[52px] lg:h-16 lg:w-16"
          />
        </Link>
        <DesktopNavigation className="hidden lg:block" />
        <MobileNavigation className="lg:hidden" />
      </div>
    </header>
  )
}
