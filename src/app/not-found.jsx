import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <section className="flex h-full min-h-[70vh] items-center bg-moto-red">
      <div className="page-gutter py-16">
        <p className="label text-3xl font-bold">404</p>
        <h1 className="display mt-3 text-[clamp(4rem,11vw,9rem)] leading-[1.05] text-white">
          Page not found
        </h1>
        <p className="mt-6 max-w-xl text-[22px] leading-snug font-medium">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button href="/" className="mt-8">
          Go back home
        </Button>
      </div>
    </section>
  )
}
