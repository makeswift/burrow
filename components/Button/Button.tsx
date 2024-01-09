import Link from 'next/link'
import { ComponentPropsWithoutRef, ReactNode, Ref, forwardRef } from 'react'

import clsx from 'clsx'

export const COLOR_STYLES = {
  beige: 'bg-beige-200 text-gray-400',
  canary: 'bg-canary text-gray-300',
} as const

export const SIZE_STYLES = {
  small: 'text-xs py-1.5 px-5',
  large: 'text-sm py-3 px-8',
} as const

type BaseButtonProps = {
  children?: ReactNode
  color?: 'beige' | 'canary'
  size?: 'small' | 'large'
  link?: { href: string; target?: '_self' | '_blank' }
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export type Props = BaseButtonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export const Button = forwardRef(function Button(
  { className, children, color = 'beige', size = 'large', link, onClick, ...rest }: Props,
  ref: Ref<HTMLAnchorElement>
) {
  return (
    <Link
      ref={ref}
      className={clsx(
        className,
        COLOR_STYLES[color],
        SIZE_STYLES[size],
        'inline-block text-center uppercase leading-relaxed tracking-wide transition-transform duration-200 hover:-translate-y-1'
      )}
      href={link?.href ?? ''}
      target={link?.target}
      onClick={onClick}
      aria-label="button"
    >
      {children}
    </Link>
  )
})
