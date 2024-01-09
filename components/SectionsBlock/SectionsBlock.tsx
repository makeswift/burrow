import Image from 'next/image'
import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

import { Button } from '../Button'

type Props = {
  className?: string
  desktopImage?: { url: string; dimensions: { width: number; height: number } }
  desktopImageAlt: string
  mobileImage?: { url: string; dimensions: { width: number; height: number } }
  mobileImageAlt: string
  title?: string
  description?: string
  link?: { href: string; target?: string }
  buttonText?: string
}

export const SectionsBlock = forwardRef(function SectionsBlock(
  {
    className,
    desktopImage,
    desktopImageAlt,
    mobileImage,
    mobileImageAlt,
    title,
    description,
    link,
    buttonText,
  }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={clsx(className, '@container min-h-[200px]')}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 flex h-full flex-col items-center justify-between px-16 py-5 sm:block sm:h-auto sm:items-start sm:justify-start">
          <div className="max-w-full text-center sm:max-w-xs sm:text-left">
            <h2 className="text-lg sm:text-xl lg:text-3xl">{title}</h2>
            <p className="mt-3 block text-sm font-light sm:mt-4 sm:hidden lg:block">
              {description}
            </p>
          </div>

          <Button
            color="canary"
            size="small"
            link={link as { href: string; target?: '_self' | '_blank' | undefined }}
            className="mt-6 lg:hidden"
          >
            {buttonText}
          </Button>

          <Button
            color="canary"
            size="large"
            link={link as { href: string; target?: '_self' | '_blank' | undefined }}
            className="mt-6 hidden lg:inline-block"
          >
            {buttonText}
          </Button>
        </div>

        {desktopImage && (
          <Image
            src={desktopImage.url}
            alt={desktopImageAlt}
            width={desktopImage.dimensions.width}
            height={desktopImage.dimensions.height}
            className="hidden w-full sm:block"
          />
        )}

        {mobileImage && (
          <Image
            src={mobileImage.url}
            alt={mobileImageAlt}
            width={mobileImage.dimensions.width}
            height={mobileImage.dimensions.height}
            className="w-full sm:hidden"
          />
        )}
      </div>
    </div>
  )
})
