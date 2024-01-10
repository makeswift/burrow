import { Ref, forwardRef } from 'react'

import clsx from 'clsx'

type Props = {
  className?: string
  leftText?: string
  rightText?: string
  title?: string
  sliderPosition?: '1' | '2' | '3' | '4'
  sliderLabel?: string
}

export const Slider = forwardRef(function Slider(
  {
    className,
    leftText = 'Standard',
    rightText = 'Ultra deep',
    title = 'Seat depth',
    sliderPosition = '4',
    sliderLabel = '21"',
  }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx(className, '@container text-center text-gray-300', sliderLabel && 'pb-5')}
    >
      <p className="font-header mb-1.5 text-lg">{title}</p>
      <div className="@2xl:gap-4 flex w-full items-center gap-3 text-base">
        <span className="@2xl:w-32 w-24 text-right">{leftText}</span>

        <div className="relative h-[1px] w-full flex-1 bg-gray-300 before:absolute before:-top-[3.5px] before:left-0 before:block before:h-2 before:w-2 before:-rotate-45 before:border-l before:border-t before:border-gray-300 after:absolute after:-top-[3.5px] after:right-0 after:block after:h-2 after:w-2 after:rotate-45 after:border-r after:border-t after:border-gray-300">
          <div
            className={clsx(
              'absolute -top-[5px] text-center',
              sliderPosition === '1' && 'left-[20%]',
              sliderPosition === '2' && 'left-[40%]',
              sliderPosition === '3' && 'left-[60%]',
              sliderPosition === '4' && 'left-[80%]'
            )}
          >
            <div className="relative mx-auto mb-1 h-3 w-3 rounded-full border border-gray-300 bg-white">
              {sliderLabel && (
                <span className="absolute left-1/2 top-full ml-0.5 mt-1 -translate-x-1/2 text-base">
                  {sliderLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        <span className="@2xl:w-32 w-24 text-left">{rightText}</span>
      </div>
    </div>
  )
})
