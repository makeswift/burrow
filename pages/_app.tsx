import { AppProps } from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import clsx from 'clsx'

import { GTAmerica } from '@/lib/fonts'
import { Nuzeit } from '@/lib/fonts'

import '../styles/globals.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={clsx(GTAmerica.variable, Nuzeit.variable, 'font-sans')}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
