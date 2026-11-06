import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/videos', label: 'Videos' },
  { href: 'https://youtube.com/@bugmotochannel', label: 'YouTube' },
  { href: 'https://www.instagram.com/bugmotochannel/', label: 'Instagram' },
  { href: '/about', label: 'About Bug' },
  { href: '/partners', label: 'Partners' },
  { href: '/pitch', label: 'Pitch a Video' },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-white">
      <div className="page-gutter flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-8">
        <ul className="label flex flex-wrap gap-x-8 gap-y-1 text-[22px]">
          {FOOTER_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex min-h-11 items-center underline-offset-[6px] hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[17px] font-medium">
          &copy; {new Date().getFullYear()} BugMoto. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
