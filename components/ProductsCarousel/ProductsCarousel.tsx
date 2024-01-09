import Image from 'next/image'
import Link from 'next/link'
import { Ref, forwardRef, useState } from 'react'

import useSWR from 'swr'

import {
  ProductsCarouselProductFragment,
  ProductsCarouselProductsDocument,
  ProductsCarouselVariantFragment,
} from '@/generated/graphql'
import { client } from '@/lib/bigcommerce/client'
import { exists } from '@/lib/utils/exists'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'

import { ProductsCarouselItem } from './ProductsCarouselItem'

export interface Props {
  className?: string
  productIds: (string | undefined)[]
}

export const ProductsCarousel = forwardRef(function ProductsCarousel(
  { className, productIds }: Props,
  ref: Ref<HTMLDivElement>
) {
  const results = useSWR('products', () => client.request(ProductsCarouselProductsDocument))
  const products = results.data ? removeEdgesAndNodes(results.data?.site.products) : []

  return (
    <div ref={ref} className={className}>
      <h2 className="mb-2 text-lg">Products</h2>

      {productIds
        .map(id => products.find(p => p.id === id))
        .filter(exists)
        .map((product, index) => (
          <ProductsCarouselItem key={`${product.id}:${index}`} product={product} />
        ))}
    </div>
  )
})
