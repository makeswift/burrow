import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

type ValueBlockList = {
    title: string
    description: string
    descImage: string
}

type ValueBlockSection = {
    title: string
    valueBlockList: ValueBlockList[]
    link: {
        href: string
        target: string
    }
    buttonText: string
    buttonTextColor: string
    buttonBackgroundColor: string
    backgroundColor: string
}

type Props = {
    values: ValueBlockSection
}

export const ValueBlockSection = forwardRef<HTMLDivElement, Props>((
    { values }: Props,
    ref
) => {
    const { backgroundColor, buttonTextColor, buttonBackgroundColor } = values;
    const linkStyles = { 'backgroundColor': buttonBackgroundColor, 'color': buttonTextColor }
    return (
        <>
        <div ref={ref} style={{ backgroundColor }}>
            {values.valueBlockList.length > 0 ? (
                <div className="flex flex-col gap-1 items-center">
                    <div className="flex-1 title-area my-10">
                        <h1 className='text-3xl text-neutral-700'>{values.title}</h1>
                    </div>
                    <div className="flex flex-row flex-1 px-12">
                        {values.valueBlockList?.map((item, index) => (
                            <div className="little-block flex flex-row items-center">
                                <div className='flex flex-1' style={{ maxWidth: '100px'}}>
                                    <img src={item.descImage} className="flex-1 w-px" style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }}/>
                                </div>
                                <div className='flex flex-1 flex-col ml-10'>
                                    <p className="flex-1 text-left text-sm font-semibold text-neutral-700 tracking-wider leading-5">{item.title}</p>
                                    <p className="flex-1 text-left text-sm font-light text-neutral-700 leading-5 pr-12">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-1 my-20' style={linkStyles}>
                        <a href={values.link.href} target={values.link.target} className='inline-flex tracking-widest items-center h-8 px-8 py-6 text-sm text-neutral-700 transition-colors duration-150 uppercase' style={linkStyles}>
                            {values.buttonText}
                        </a>
                    </div>
                </div>
            ) : (
                <div className="p-6 text-center text-lg font-light">
                    There are no tabs. Try adding some.
                </div>
            )}
        </div>
        </>
    )
})
