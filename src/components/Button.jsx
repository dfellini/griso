import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary: 'bg-ink px-7 text-white hover:bg-zinc-700',
  outline:
    'border-2 border-ink px-[26px] text-ink hover:bg-ink hover:text-white',
}

export function Button({ variant = 'primary', className, ...props }) {
  className = clsx(
    'label inline-flex min-h-14 items-center justify-center text-2xl font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
