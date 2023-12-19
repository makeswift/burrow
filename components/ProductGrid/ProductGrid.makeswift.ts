import dynamic from 'next/dynamic';
import { Combobox, List, Shape, Slot, Style, TextInput } from '@makeswift/runtime/controls';
import { forwardNextDynamicRef } from '@makeswift/runtime/next';
import { runtime } from '@/lib/makeswift/runtime'


runtime.registerComponent(
  forwardNextDynamicRef(patch => dynamic(() => patch(import('./ProductGrid').then(({ ProductGrid }) => ProductGrid)))),
  {
      type: 'product-grid',
    label: 'BigCommerce / ProductGrid',
    props: {
      className: Style(),
        products: List({
        label: 'Products',
        type: Shape({
          type: {
            children:  Combobox({
                label: 'Search for products',
                title: TextInput({ label: 'Title', defaultValue: 'Tab' }),
                async getOptions(query ) {
                    //List All Products
                    const products = await fetch(`/api/products`)

                    const productList = await products.json()  || {}

                    return productList
                        .map((product: { id: any; name: any; }) => ({ id: product.id, label: product.name, value: product }))
                        .filter((option: { label: string; }) => option.label.toLowerCase().includes(query.toLowerCase()))
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
                console.log("item", item?.children?.label)
                return item?.children?.label ?? 'Product Name'
            },
      })},
  }
)