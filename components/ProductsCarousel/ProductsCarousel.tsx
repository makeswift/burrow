import Image from 'next/image'
import Link from 'next/link'
import { Ref, forwardRef, useState } from 'react'

import {
  ProductsCarouselProductFragment,
  ProductsCarouselVariantFragment,
} from '@/generated/graphql'
import { exists } from '@/lib/utils/exists'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'

import { ProductsCarouselItem } from './ProductsCarouselItem'

export interface Props {
  className?: string
  products: (ProductsCarouselProductFragment | undefined)[]
}

export const ProductsCarousel = forwardRef(function ProductsCarousel(
  { className, products }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={className}>
      <h2 className="mb-2 text-lg">Products</h2>

      {products.filter(exists).map(product => (
        <ProductsCarouselItem key={product.id} product={product} />
      ))}
    </div>
  )
})
