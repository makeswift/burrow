import dynamic from 'next/dynamic'

import { Checkbox, Combobox, List, Shape } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./ProductGrid').then(({ ProductGrid }) => ProductGrid)))
  ),
  {
    type: 'product-grid',
    label: 'BigCommerce / ProductGrid',
    props: {
      variantOptionShown: Checkbox({
        label: 'Show Variant Options',
        defaultValue: true,
      }),
      products: List({
        label: 'Products',
        type: Shape({
          type: {
            children: Combobox({
              label: 'Search for products',
              async getOptions(query) {
                //List All Products
                const productList = await fetch(`/api/products-variants`)

                const products = (await productList.json()) || {}

                return products
                  .map((product: { sku: string; name: string }) => ({
                    id: product?.sku,
                    label: product.name,
                    value: product,
                  }))
                  .filter((option: { label: string }) =>
                    option.label.toLowerCase().includes(query.toLowerCase())
                  )
              },

              //wait till query SEARCH
              //     const product = await fetch(`/api/product-search`, {
              //         method: "POST",
              //         body: JSON.stringify({query: query}),
              //     });
              // const products = await product.json()
            }),
          },
        }),

        getItemLabel(item) {
          return item?.children?.label ?? 'Product Name'
        },
      }),
    },
  }
)
