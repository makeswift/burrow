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
        className="@lg:flex-row flex w-full flex-col rounded-sm border"
        style={{ borderColor: color }}
      >
        <div className="relative flex-1">
          <input
            id="email"
            className="has-label w-full bg-transparent px-6 py-4"
            type="email"
            name="email"
            required
            autoComplete="email"
            autoCapitalize="none"
            aria-label="email"
            value=""
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-light"
            style={{
              color,
            }}
          >
            {label}
          </label>
        </div>

        <button
          className="block px-16 py-4 text-sm font-normal uppercase tracking-wider sm:inline-block"
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
