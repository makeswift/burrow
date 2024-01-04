import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

type Description = {
  title: string
  description: string
  descImage: string
  link: {
    href: string
    target: string
  }
  buttonText: string
}

type Props = {
  description: Description
}

export const DimensionsBlock = forwardRef<HTMLDivElement, Props>((
  { description }: Props,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <div ref={ref} className="container">
      <div className="flex flex-row gap-1 items-center">
        <div className="flex-1 flex-column pl-12 basis-1/4 pr-4 items-center">
          <p className="text-left text-2xl pb-2">{description.title}</p>
          <p className="text-left text-xs pb-6 font-extralight">{description.description}</p>
          <a href={description.link.href} target={description.link.target} className='inline-flex items-center h-8 px-6 py-4 text-xs text-neutral-950 transition-colors duration-150 bg-beige-100 focus:shadow-outline hover:bg-orange-200 uppercase'>
            {description.buttonText}
          </a>
        </div>
        <img src={description.descImage} className="flex-1 basis-3/4"/>
      </div>
    </div>
  )
})
