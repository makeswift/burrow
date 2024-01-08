import Image from 'next/image'
import Link from 'next/link'
import { Ref, forwardRef, useState } from 'react'

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
  const [selectedVariant, setSelectedVariant] = useState('')
  const [selectedVariantImage, setSelectedVariantImage] = useState('')

  const setVariant = async (
    product: any,
    variant: {
      label: string
      hexColors: string
    }
  ) => {
    try {
      setSelectedVariant(variant?.label)
    } catch (err) {
      //TODO add logging
    }
  }

  const ProductImage = (product: any) => {
    // if (selectedVariant) {
    //   console.log('pr', product)
    // } else {
    return product?.children?.defaultImage
    // }
  }

  const VariantIcons = (product: any) => {
    console.log('varitan', product?.product)
    if (product?.option?.label == selectedVariant) {
      return (
        <button onClick={() => setVariant(product?.product, product?.option)}>
          <span
            className="outline-3 block h-5 w-5  rounded-2xl p-2 outline-double outline-offset-2 group-disabled:bg-gray-200 group-disabled:opacity-30"
            style={{
              backgroundColor: product?.option?.hexColors,
              backgroundImage: `url(${product?.option?.hexColors}})`,
            }}
          />
        </button>
      )
    } else {
      return (
        <button onClick={() => setVariant(product?.product, product?.option)}>
          <span
            className="block h-5 w-5 rounded-2xl group-disabled:bg-gray-200 group-disabled:opacity-30"
            style={{
              backgroundColor: product?.option?.hexColors,
              backgroundImage: `url(${product?.option?.hexColors}})`,
            }}
          />
        </button>
      )
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
                  src={ProductImage(product)}
                  alt={product?.children?.primary_image?.name}
                />
              )}
            </Link>
            <div className="grid  grid-cols-3">
              {variantOptionShown && product?.children?.optionValues && (
                <div className="grid grid-cols-3  pt-3">
                  {product?.children?.optionValues[0]?.map(
                    (option: { label: string; hexColors: string }) => (
                      <div key={product?.label}>
                        <VariantIcons product={product} option={option} />
                      </div>
                    )
                  )}
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
