import dynamic from 'next/dynamic'

import { Checkbox, Combobox, List, Number, Style } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { ProductsCarouselProductsDocument } from '@/generated/graphql'
import { client } from '@/lib/bigcommerce/client'
import { runtime } from '@/lib/makeswift/runtime'
import { exists } from '@/lib/utils/exists'

export const props = {
  className: Style(),
  productIds: List({
    label: 'Products',
    type: Combobox({
      label: 'Product name',
      async getOptions(query: string) {
        const results = await client.request(ProductsCarouselProductsDocument)
        const products = results.site.products.edges?.map(edge => edge?.node) ?? []

        return products
          .filter(exists)
          .filter(p => !query || p.name.includes(query))
          .map(product => ({
            id: product.id,
            label: product.name,
            value: product.id,
          }))
      },
    }),
    getItemLabel(item) {
      return item?.label ?? 'Product Name'
    },
  }),
  itemsShown: Number({
    label: 'Items Shown',
    defaultValue: 4,
    min: 1,
    max: 10,
  }),
}

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() =>
      patch(import('./ProductsCarousel').then(({ ProductsCarousel }) => ProductsCarousel))
    )
  ),
  { type: 'ProductsCarousel', label: 'BigCommerce / Products Carousel', props }
)
