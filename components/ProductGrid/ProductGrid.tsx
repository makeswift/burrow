import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, Ref, forwardRef, useState } from 'react'

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
  const [selectedVariant, setSelectedVariant] = useState('')
  const setVariant = async (variant: ReactNode) => {
    try {
      console.log('variant', variant)
      // setSelectedVariant(variant?.hex)
    } catch (err) {
      console.log('we here', err)

      //TODO add logging
    }
  }
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
            </Link>
            <div className="grid  grid-cols-3">
              {variantOptionShown && product?.children?.optionValues && (
                <div className="grid  grid-cols-3">
                  {product?.children?.optionValues[0]?.map((option: { hexColors: string }) => (
                    <div key={product?.label}>
                      <button>
                        {/*onClick={():ReactNode => setVariant(option)}*/}
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
            <Link href={product?.children?.path || ''}>
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
