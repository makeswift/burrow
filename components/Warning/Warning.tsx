import { ReactNode } from 'react'

import clsx from 'clsx'

export function Warning({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <p
      className={clsx('text bg-beige-100 py-5 text-center leading-normal text-gray-300', className)}
    >
      {children}
    </p>
  )
}
