import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Portal from '@radix-ui/react-portal'
import clsx from 'clsx'

type FeatureLink = {
  image?: { url: string; dimensions: { width: number; height: number } }
  imageAlt: string
  text?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
}

type SubnavLink = {
  linkText?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
}

type SubnavGroup = {
  subnavLinks: SubnavLink[]
}

type MainNavLink = {
  text?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
  subnavGroups: SubnavGroup[]
  featureLinks: FeatureLink[]
}

type TopLink = {
  text?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
}

type Props = {
  className?: string
  announcement?: ReactNode
  logoImage?: { url: string; dimensions: { width: number; height: number } }
  logoWidth: number
  logoAlt: string
  logoLink?: {
    href: string
    target?: '_self' | '_blank'
  }
  mainNavLinks?: MainNavLink[]
  topLinks?: TopLink[]
  ctaLink?: {
    href: string
    target?: '_self' | '_blank'
  }
  ctaText?: string
}

export function Navigation({
  className,
  announcement,
  logoImage,
  logoAlt,
  logoWidth,
  logoLink,
  topLinks,
  mainNavLinks,
}: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navElement = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!navElement.current) {
      return
    }

    setHeight(navElement.current.clientHeight)

    const observer = new ResizeObserver(([element]) => setHeight(element?.target.clientHeight ?? 0))

    observer.observe(navElement.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileNavOpen)
  }, [mobileNavOpen])

  return (
    <>
      <header className={clsx(className, '@container relative z-30')} ref={navElement}>
        <div className="@2xl:justify-between flex items-center justify-center gap-x-4 bg-beige-100 px-4 py-2 sm:px-8">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 80.38"
              xmlSpace="preserve"
              className="w-6"
            >
              <path d="m96.99 12.94.02-.01-5.97-9.98c-.2-.34-.57-.55-.96-.55H38.81c-.39 0-.76.21-.96.55l-5.97 9.98.02.01c-.1.17-.17.35-.17.56v39.86H14.29c-.62 0-1.12.5-1.12 1.12 0 .62.5 1.12 1.12 1.12h17.43v12.19h-19.1c-.62 0-1.12.5-1.12 1.12s.5 1.12 1.12 1.12h19.1v6.68c0 .62.5 1.12 1.12 1.12h63.21c.62 0 1.12-.5 1.12-1.12V13.5c0-.21-.07-.4-.18-.56zm-7.55-8.3 4.63 7.74h-28.5V4.64h23.87zm-49.99 0h23.88v7.74H34.82l4.63-7.74zm55.48 70.95H33.96v-5.56h9.74c.62 0 1.12-.5 1.12-1.12s-.5-1.12-1.12-1.12h-9.74V55.6h4.53c.62 0 1.12-.5 1.12-1.12 0-.62-.5-1.12-1.12-1.12h-4.53V14.62h60.96v60.97zM20.4 63.14H4.86c-.62 0-1.12-.5-1.12-1.12 0-.62.5-1.12 1.12-1.12H20.4c.62 0 1.12.5 1.12 1.12 0 .62-.51 1.12-1.12 1.12zM75.72 44.8c2.29-1.36 3.29-3.72 3.27-6.38-.02-3.78-2.69-7.13-8.57-7.1l-14.76.08c-1.15 4.5-1.7 9.03-1.67 13.74s.64 9.24 1.83 13.72l14.33-.08c6.43-.04 9.61-3.2 9.58-7.76-.01-2.09-.84-4.78-4.01-6.22zm-15.55-8.74 9.58-.06c2.3-.01 3.63 1.14 3.64 3.27.01 2.17-1.34 3.3-3.6 3.31l-10.44.06c.11-2.53.37-4.55.82-6.58zm9.77 18.05-9.66.06c-.52-2.09-.8-4.18-.9-6.88l10.83-.06c2.42-.02 3.86 1.25 3.88 3.42.01 2.2-1.31 3.45-4.15 3.46z" />
            </svg>

            <span className="text-xs leading-normal text-gray-300">{announcement}</span>
          </div>

          <div className="@2xl:flex hidden gap-x-8">
            {topLinks?.map((topLink, index) => (
              <Link
                href={topLink.link?.href ?? '#'}
                target={topLink.link?.target}
                key={index}
                className="hover:text-red inline-block cursor-pointer py-2 text-xs text-gray-300 transition-colors"
              >
                {topLink.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="@2xl:py-3 @2xl:px-8 flex items-center justify-between gap-x-4 bg-white px-4 py-2">
          <div className="@5xl:hidden block flex-1">
            <button
              aria-label={mobileNavOpen ? 'Close mobile menu' : 'View mobile menu'}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-6 w-6 stroke-gray-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-6 w-6 stroke-gray-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>

          {logoImage && (
            <div className="@5xl:flex-1">
              <Link href={logoLink?.href ?? '#'} target={logoLink?.target}>
                <Image
                  alt={logoAlt}
                  height={logoWidth / (logoImage.dimensions.width / logoImage.dimensions.height)}
                  priority
                  src={logoImage.url}
                  width={logoWidth}
                />
              </Link>
            </div>
          )}

          <div className="@2xl:gap-x-4 flex items-center gap-x-2">
            <NavigationMenu.Root className="items-center justify-center" delayDuration={0}>
              <NavigationMenu.List className="@5xl:flex hidden items-center gap-x-8">
                {mainNavLinks?.map((mainNavLink, mainNavLinkIndex) => (
                  <NavigationMenu.Item key={mainNavLinkIndex}>
                    {mainNavLink.subnavGroups.length > 0 ? (
                      <NavigationMenu.Trigger
                        asChild
                        onPointerMove={event => event.preventDefault()}
                        onPointerLeave={event => event.preventDefault()}
                      >
                        <button className="hover:text-red font-header group flex cursor-pointer select-none items-center gap-1 py-4 text-sm text-gray-300 outline-none">
                          {mainNavLink.text}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </NavigationMenu.Trigger>
                    ) : (
                      <NavigationMenu.Link asChild>
                        <Link
                          href={mainNavLink.link?.href ?? '#'}
                          target={mainNavLink.link?.target}
                          className="hover:text-red font-header select-none py-4 text-sm text-gray-300 outline-none transition-colors"
                        >
                          {mainNavLink.text}
                        </Link>
                      </NavigationMenu.Link>
                    )}

                    {mainNavLink.subnavGroups.length > 0 && (
                      <NavigationMenu.Content
                        asChild
                        onPointerEnter={event => event.preventDefault()}
                        onPointerLeave={event => event.preventDefault()}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-x-8">
                            {mainNavLink.subnavGroups.map((subnavGroup, subnavGroupIndex) => (
                              <ul className="w-60" key={subnavGroupIndex}>
                                {subnavGroup.subnavLinks.map((subnavLink, i) => (
                                  <li key={i}>
                                    <NavigationMenu.Link asChild>
                                      <Link
                                        href={subnavLink.link?.href ?? '#'}
                                        target={subnavLink.link?.target}
                                        className="hover:text-red font-header block cursor-pointer py-1.5 text-sm leading-normal text-gray-300 transition-colors"
                                      >
                                        {subnavLink.linkText}
                                      </Link>
                                    </NavigationMenu.Link>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>

                          <div className="flex items-start gap-x-4">
                            {mainNavLink.featureLinks.map((featureLink, index) => (
                              <NavigationMenu.Link asChild key={index}>
                                <Link
                                  href={featureLink.link?.href ?? '#'}
                                  target={featureLink.link?.target}
                                  className="hover:text-red block cursor-pointer text-sm leading-normal text-gray-300 transition-colors"
                                >
                                  {featureLink.image && (
                                    <Image
                                      src={featureLink.image.url}
                                      alt={featureLink.imageAlt}
                                      width={featureLink.image.dimensions.width}
                                      height={featureLink.image.dimensions.height}
                                      className="aspect-[4:3] w-56"
                                    />
                                  )}

                                  <p className="font-header mt-2 text-base">{featureLink.text}</p>
                                </Link>
                              </NavigationMenu.Link>
                            ))}
                          </div>
                        </div>
                      </NavigationMenu.Content>
                    )}
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>

              <div className="absolute inset-x-0 top-full w-full">
                <NavigationMenu.Viewport className="data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn border-beige-200 overflow-hidden border-t bg-white p-4 shadow-xl shadow-black/5 duration-300 sm:p-8" />
              </div>
            </NavigationMenu.Root>
          </div>

          <div className="@2xl:gap-x-6 flex flex-1 items-center justify-end gap-x-4 stroke-gray-300">
            <Link href="">
              <svg
                className="w-6 py-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </Link>

            <Link href="" className="@lg:block hidden">
              <svg
                className="w-6 py-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <Link href="">
              <svg
                className="w-6 py-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <Portal.Root asChild>
          <>
            <div
              className={clsx(
                'font-header fixed inset-0 z-40 bg-gray-400/50 transition-opacity duration-300'
              )}
              onClick={() => setMobileNavOpen(false)}
            />
            <Accordion.Root
              type="multiple"
              className="animate-revealRight fixed inset-y-0 z-50 w-72 -translate-x-full overflow-auto bg-white px-4 py-2"
            >
              {mainNavLinks?.map((mainNavLink, footerMainNavLinkIndex) => (
                <Accordion.Item
                  key={footerMainNavLinkIndex}
                  value={`item${footerMainNavLinkIndex}`}
                  className="py-1"
                >
                  {mainNavLink.subnavGroups.length > 0 ? (
                    <>
                      <Accordion.Trigger asChild>
                        <span className="data-[state=open]:text-accent font-header group flex w-full items-center justify-between py-1.5 text-lg leading-normal text-gray-300 outline-none">
                          {mainNavLink.text}
                          <svg
                            className="linear duration-250 group-data-[state=open]:stroke-accent ml-2 h-2 w-3 stroke-gray-300 transition-transform group-data-[state=open]:-rotate-180"
                            fill="none"
                            viewBox="0 0 12 8"
                          >
                            <path
                              d="M0 0L6 6L12 0"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                      </Accordion.Trigger>
                      <Accordion.AccordionContent asChild>
                        <>
                          {mainNavLink.subnavGroups.map((subnavGroup, i) => (
                            <ul className="pl-3" key={i}>
                              {subnavGroup.subnavLinks.map((subnavLink, footerSubnavLinkIndex) => (
                                <li key={footerSubnavLinkIndex}>
                                  <Link
                                    href={subnavLink.link?.href ?? '#'}
                                    target={subnavLink.link?.target}
                                    className="font-header block py-1.5 text-sm leading-normal text-gray-300"
                                  >
                                    {subnavLink.linkText}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </>
                      </Accordion.AccordionContent>
                    </>
                  ) : (
                    <Link
                      href={mainNavLink.link?.href ?? '#'}
                      target={mainNavLink.link?.target}
                      className="font-header block py-1.5 text-lg leading-normal text-gray-300 outline-none"
                    >
                      {mainNavLink.text}
                    </Link>
                  )}
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </>
        </Portal.Root>
      )}
    </>
  )
}
