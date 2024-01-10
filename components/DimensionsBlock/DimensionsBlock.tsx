import Image from 'next/image'
import React, { Ref, forwardRef, useState } from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'

import { Button } from '../Button'
import { Warning } from '../Warning'

type Collection = {
  name?: string
  description?: string
  mobileDescription?: string
  desktopImage?: { url: string; dimensions: { width: number; height: number } }
  desktopImageAlt: string
  mobileSofaImage?: { url: string; dimensions: { width: number; height: number } }
  mobileSofaImageAlt: string
  mobileDimensionsImage?: { url: string; dimensions: { width: number; height: number } }
  mobileDimensionsImageAlt: string
  link?: { href: string; target?: string }
  buttonText?: string
}

type Props = {
  className?: string
  collections: Collection[]
}

export const DimensionsBlock = forwardRef(function DimensionsBlock(
  { className, collections }: Props,
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState(false)

  if (collections?.length === 0)
    return <Warning className={className}>No collections have been added</Warning>

  return (
    <div ref={ref} className={clsx(className, '@container')}>
      <div className="@lg:block hidden">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="border-beige-200 flex items-center gap-5 border-b py-4 last:border-transparent"
          >
            <div className="w-52 text-gray-400">
              <h2 className="font-header @3xl:text-3xl mb-1 text-xl">{collection.name}</h2>
              <p className="text-xs font-extralight leading-normal">{collection.description}</p>
              <Button
                color="beige"
                size="small"
                link={collection.link as { href: string; target?: '_self' | '_blank' | undefined }}
                className="mt-4"
              >
                {collection.buttonText}
              </Button>
            </div>

            {collection.desktopImage && (
              <div className="flex-1">
                <Image
                  src={collection.desktopImage.url}
                  alt={collection.desktopImageAlt}
                  width={collection.desktopImage.dimensions.width}
                  height={collection.desktopImage.dimensions.height}
                  className="w-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Accordion.Root type="multiple" className="@lg:hidden">
        {collections.map((collection, index) => (
          <Accordion.Item
            key={index}
            value={`${index + 1}`}
            className="border-beige-200 group border-b last:border-transparent"
          >
            <Accordion.Header className="flex items-center gap-4 py-3">
              <div className="flex-1 text-gray-400">
                <h2 className="font-header mb-1 text-base">{collection.name}</h2>
                <p className="text-xs font-extralight leading-normal">
                  {collection.mobileDescription}
                </p>
              </div>

              {collection.mobileSofaImage && (
                <div className="flex-1">
                  <Image
                    src={collection.mobileSofaImage.url}
                    alt={collection.mobileSofaImageAlt}
                    width={collection.mobileSofaImage.dimensions.width}
                    height={collection.mobileSofaImage.dimensions.height}
                    className="w-full"
                  />
                </div>
              )}

              <Accordion.Trigger className="h-8 w-8 p-2">
                <div className="bg-beige-200 h-full w-full rounded-full p-1">
                  <svg
                    viewBox="0 0 8 8"
                    fill="none"
                    className="h-2 w-2 fill-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3.5"
                      className="h-2 w-[1px] origin-center transition-transform duration-300 group-data-[state=open]:rotate-90"
                    />
                    <rect y="3.5" className="h-[1px] w-2" />
                  </svg>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
              <div className="border-beige-200 border-t border-dashed pb-6 text-center ">
                {collection.mobileDimensionsImage && (
                  <Image
                    src={collection.mobileDimensionsImage.url}
                    alt={collection.mobileDimensionsImageAlt}
                    width={collection.mobileDimensionsImage.dimensions.width}
                    height={collection.mobileDimensionsImage.dimensions.height}
                    className="w-full"
                  />
                )}

                <Button
                  color="canary"
                  size="small"
                  link={
                    collection.link as { href: string; target?: '_self' | '_blank' | undefined }
                  }
                  className="mt-8"
                >
                  {collection.buttonText}
                </Button>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
})
