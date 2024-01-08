import Image from 'next/image'
import Link from 'next/link'
import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

import { Button } from '../Button'
import { Warning } from '../Warning'

type Collection = {
  title?: string
  description?: string
  image?: { url: string; dimensions: { width: number; height: number } }
  imageAlt: string
  link?: { href: string; target?: string }
  buttonText?: string
}

type Props = {
  className?: string
  collections: Collection[]
}

export const DimensionsBlock = forwardRef<HTMLDivElement, Props>(
  ({ className, collections }: Props, ref: Ref<HTMLDivElement>) => {
    if (collections?.length === 0)
      return <Warning className={className}>No collections have been added</Warning>

    return (
      <div ref={ref} className={clsx(className, '@container')}>
        {collections.map((collection, index) => (
          <div
            className="border-beige-200 flex items-center gap-5 border-b py-4 last:border-transparent"
            key={index}
          >
            <div className="w-52 text-gray-400">
              <p className="pb-2 text-2xl">{collection.title}</p>
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

            {collection.image && (
              <Image
                src={collection.image.url}
                alt={collection.imageAlt}
                width={collection.image.dimensions.width}
                height={collection.image.dimensions.height}
                className="w-full flex-1"
              />
            )}
          </div>
        ))}
      </div>
    )
  }
)
