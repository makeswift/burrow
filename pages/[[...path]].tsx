import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'

import { Page as MakeswiftPage, PageProps as MakeswiftPageProps } from '@makeswift/runtime/next'
import { SWRConfig } from 'swr'

import { ProductsCarousel } from '@/components/ProductsCarousel'
import { ProductsCarouselProductsDocument } from '@/generated/graphql'
import { client as bigcommerce } from '@/lib/bigcommerce/client'
import { client as makeswift } from '@/lib/makeswift/client'
import '@/lib/makeswift/components'
import { runtime } from '@/lib/makeswift/runtime'

type ParsedUrlQuery = { path?: string[] }

export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  const pages = await makeswift.getPages()

  return {
    paths: pages.map(page => ({
      params: {
        path: page.path.split('/').filter(segment => segment !== ''),
      },
    })),
    fallback: 'blocking',
  }
}

type Props = MakeswiftPageProps & { fallback: { [key: string]: unknown } }

export async function getStaticProps(
  ctx: GetStaticPropsContext<ParsedUrlQuery>
): Promise<GetStaticPropsResult<Props>> {
  const path = '/' + (ctx.params?.path ?? []).join('/')
  const snapshot = await makeswift.getPageSnapshot(path, { preview: ctx.preview })

  if (snapshot == null) return { notFound: true }

  return {
    props: {
      snapshot,
      fallback: { products: await bigcommerce.request(ProductsCarouselProductsDocument) },
    },
  }
}

export default function Page({ snapshot, fallback }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <MakeswiftPage snapshot={snapshot} runtime={runtime} />
    </SWRConfig>
  )
}
