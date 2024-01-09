import { Ref, forwardRef } from 'react'

import { Product, ProductsCarouselProductFragment } from '@/generated/graphql'
import { exists } from '@/lib/utils/exists'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'

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
      products
      {products.filter(exists).map(product => {
        console.log({ product })

        return <div key={product.id}>{product.name}</div>
      })}
    </div>
  )
})
