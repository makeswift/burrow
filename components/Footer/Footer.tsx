import Link from 'next/link'
import { ReactNode, Ref, forwardRef } from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'

import { Warning } from '../Warning'

type FooterLink = {
  text?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
}

type FooterGroup = {
  heading?: string
  footerLinks?: FooterLink[]
}

type Props = {
  className?: string
  footerGroups: FooterGroup[]
  legal?: ReactNode
}

export const Footer = forwardRef(function Footer(
  { className, footerGroups, legal }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <footer ref={ref} className={clsx(className, '@container bg-gray-400')}>
      <div className="@lg:gap-y-10 @5xl:flex hidden gap-y-8 px-8 py-12">
        {footerGroups.map((group, groupIndex) => {
          if (footerGroups.length === 0) {
            return <Warning key={groupIndex}>No footer groups added</Warning>
          }

          return (
            <div
              key={groupIndex}
              className="@sm:basis-1/2 @2xl:px-5 @4xl:basis-auto flex-1 basis-full text-sm text-beige-100 last:pr-0"
            >
              {group.heading && <div className="mb-3 font-bold">{group.heading}</div>}
              <ul>
                {group.footerLinks?.map((footerLink, i) => {
                  return (
                    <li key={i}>
                      <Link
                        href={footerLink.link?.href ?? '#'}
                        target={footerLink.link?.target}
                        className="block py-2"
                      >
                        {footerLink.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      <Accordion.Root type="multiple" className="@5xl:hidden">
        {footerGroups.map((group, groupIndex) => {
          if (footerGroups.length === 0) {
            return <Warning key={groupIndex}>No footer groups added</Warning>
          }

          return (
            <Accordion.Item
              key={groupIndex}
              value={`item${groupIndex}`}
              className="group border-b border-beige-100/10 px-6 py-3 text-sm text-beige-100"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-x-4">
                  {group.heading && (
                    <div className="py-2 font-bold leading-normal">{group.heading}</div>
                  )}

                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-4 w-4 fill-beige-100 opacity-50"
                  >
                    <rect
                      x="7.5"
                      className="h-full w-[1px] origin-center transition-transform duration-300 group-data-[state=open]:rotate-90"
                    />
                    <rect y="7.5" className="h-[1px] w-full" />
                  </svg>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="w-full overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
                <ul>
                  {group.footerLinks?.map((footerLink, i) => {
                    return (
                      <li key={i}>
                        <Link
                          href={footerLink.link?.href ?? '#'}
                          target={footerLink.link?.target}
                          className="block py-2 leading-normal"
                        >
                          {footerLink.text}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>

      <div className="@5xl:px-8 @5xl:pb-8 @5xl:pt-4 px-6 pb-6 pt-6">{legal}</div>
    </footer>
  )
})
