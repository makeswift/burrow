import localFont from 'next/font/local'

export const GTAmerica = localFont({
  src: [
    {
      path: '../public/fonts/GT-America-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-gt-america',
})

export const Nuzeit = localFont({
  src: [
    {
      path: '../public/fonts/Nuzeit-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nuzeit-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nuzeit',
})
