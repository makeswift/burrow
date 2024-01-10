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

export const ValueBlockSection = forwardRef<HTMLDivElement, Props>(function ValueBlockSection(
  { values }: Props,
  ref
) {
  {
    const { backgroundColor, buttonTextColor, buttonBackgroundColor } = values
    const linkStyles = { backgroundColor: buttonBackgroundColor, color: buttonTextColor }
    return (
      <>
        <div ref={ref} style={{ backgroundColor }}>
          {values.valueBlockList.length > 0 ? (
            <div className="flex flex-col items-center gap-1">
              <div className="title-area my-10 flex-1">
                <h1 className="text-3xl text-neutral-700">{values.title}</h1>
              </div>
              <div className="flex flex-1 flex-row px-12">
                {values.valueBlockList?.map((item, index) => (
                  <div className="little-block flex flex-row items-center" key={index}>
                    <div className="flex flex-1" style={{ maxWidth: '100px' }}>
                      <img
                        src={item.descImage}
                        className="w-px flex-1"
                        style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="ml-10 flex flex-1 flex-col">
                      <p className="flex-1 text-left text-sm font-semibold leading-5 tracking-wider text-neutral-700">
                        {item.title}
                      </p>
                      <p className="flex-1 pr-12 text-left text-sm font-light leading-5 text-neutral-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-20 flex flex-1" style={linkStyles}>
                <a
                  href={values.link.href}
                  target={values.link.target}
                  className="inline-flex h-8 items-center px-8 py-6 text-sm uppercase tracking-widest text-neutral-700 transition-colors duration-150"
                  style={linkStyles}
                >
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
  }
})
