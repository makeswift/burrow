import Image from 'next/image'
import Link from 'next/link'
import { Ref, forwardRef } from 'react'

type Props = {
  className?: string
  products: any[]
}

export const ProductGrid = forwardRef(function ProductGrid(
  { className, products }: Props,
  ref: Ref<HTMLDivElement>
) {
  //TODO Add default product card.  Add option flags, Add count
  console.log('products component', products)
  return (
    <div>
      {/*{products && (*/}
      <div className="grid  grid-cols-6 gap-4">
        {products?.map(product => (
          <div key={product?.id}>
            <Link href={product?.children?.path || ''}>
              {product?.children?.defaultImage && (
                <Image
                  width="200"
                  height="200"
                  src={product?.children?.defaultImage}
                  alt={product?.children?.primary_image?.name}
                />
              )}
              <div className="font-bold">{product?.children?.name}</div>
              <div className="text-sm">{product?.children?.prices?.price?.value}</div>
              {/*{product?.optionName.map(option => (*/}

              {/*))}*/}
            </Link>
          </div>
        ))}
      </div>
      {/*)}*/}
    </div>
  )
})
