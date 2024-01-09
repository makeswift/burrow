import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

type Props = {
  className?: string
  label?: string
  color?: string
  buttonText?: string
  buttonTextColor?: string
}

export const SubscribeRow = forwardRef(function SubscribeRow(
  { className, label, color, buttonText, buttonTextColor }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={clsx(className, '@container')}>
      <form
        className="@lg:flex-row @lg:border flex w-full flex-col gap-y-2 rounded-sm border-0"
        style={{ borderColor: color }}
      >
        <div
          className="@lg:border-0 relative flex-1 rounded-sm border"
          style={{ borderColor: color, color }}
        >
          <input
            id="email"
            className="peer h-12 w-full bg-transparent px-5 pt-4 placeholder:text-transparent focus:outline-none focus:ring-0"
            type="email"
            name="email"
            required
            placeholder="Email address"
            autoComplete="email"
            autoCapitalize="none"
            aria-label="email"
          />
          <label
            htmlFor="email"
            className="absolute left-5 top-1/2 -mt-3 -translate-y-1/2 text-xs font-light duration-100 ease-linear peer-placeholder-shown:mt-0 peer-placeholder-shown:text-sm peer-focus:-mt-3 peer-focus:text-xs"
          >
            {label}
          </label>
        </div>

        <button
          className="@lg:rounded-none block rounded-sm px-16 py-4 text-sm font-normal uppercase tracking-wider focus:outline-gray-300 sm:inline-block"
          type="submit"
          style={{
            backgroundColor: color,
            color: buttonTextColor,
          }}
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
})
