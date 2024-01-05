import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

type Section = {
    bgImage: string
    title: string
    description: string
    link: {
        href: string
        target: string
    }
    buttonText: string
}

type Props = {
  section: Section
}

export const SectionsBlock = forwardRef(function SectionsBlock(
  { section }: Props,
  ref: Ref<HTMLDivElement>
) {
    const background = `url(${section.bgImage})`
    return (
        <div ref={ref} className="container" style={{'height': '576px'}}>
            <div className="flex flex-row gap-1 items-start" style={{background, 'background-size': 'contain', 'background-repeat': 'no-repeat', 'height': '100%'}}>
                <div className="flex-1 flex-column pl-12 basis-1/4 pr-4 pt-6 items-center">
                    <p className="text-left text-2xl pb-2">{section.title}</p>
                    <p className="text-left text-sm pb-6 font-light" style={{'max-width': '25%'}}>{section.description}</p>
                    <a href={section.link.href} target={section.link.target} className='inline-flex items-center h-8 px-10 py-6 tracking-widest text-sm text-neutral-700 transition-colors duration-150 bg-canary-100 focus:shadow-outline hover:bg-canary-100 uppercase'>
                        {section.buttonText}
                    </a>
                </div>
            </div>
        </div>
    )
})
