import Image from 'next/image'
import Link from 'next/link'
import { Ref, forwardRef } from 'react'

type Props = {
  className?: string
  products: any[]
  variantOptionShown: boolean
}

export const ProductGrid = forwardRef(function ProductGrid(
  { className, products, variantOptionShown }: Props,
  ref: Ref<HTMLDivElement>
) {
  //TODO Add default product card.  Add option flags, Add count
  console.log('products component', variantOptionShown)
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
              <div className="grid  grid-cols-3">
                {variantOptionShown && (
                  <div className="grid  grid-cols-3">
                    {product?.children?.optionValues[0].map((option: { hexColors: any }) => (
                      <div key={product?.label}>
                        <button>
                          <span
                            className="block h-5 w-5  rounded-2xl group-disabled:bg-gray-200 group-disabled:opacity-30"
                            style={{
                              backgroundColor: option?.hexColors,
                              backgroundImage: `url(${option?.hexColors}})`,
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="font-bold">{product?.children?.name}</div>
              <div className="text-sm">{product?.children?.prices?.price?.value}</div>
            </Link>
          </div>
        ))}
      </div>
      {/*)}*/}
    </div>
  )
})
