import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import {
  ProductsCarouselProductFragment,
  ProductsCarouselVariantFragment,
} from '@/generated/graphql'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'

interface SelectedOption {
  optionEntityId: number
  valueEntityId: number
}

// given an option, find a variant
function findVariant(
  variants: ProductsCarouselVariantFragment[],
  selectedOption: SelectedOption
): ProductsCarouselVariantFragment | undefined {
  return variants.find(variant => {
    const variantOption = removeEdgesAndNodes(variant.options).find(
      option => option.entityId === selectedOption.optionEntityId
    )

    return (
      variantOption &&
      removeEdgesAndNodes(variantOption.values).some(
        value => value.entityId === selectedOption.valueEntityId
      )
    )
  })
}

interface Props {
  product: ProductsCarouselProductFragment
}

export const ProductsCarouselItem = ({ product }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null)
  const productOptions = removeEdgesAndNodes(product.productOptions)
  const variants = removeEdgesAndNodes(product.variants)
  const activeVariant = selectedOption && findVariant(variants, selectedOption)
  const activeImageUrl = activeVariant
    ? activeVariant.defaultImage?.url
    : product.defaultImage?.urlOriginal

  console.log({
    product,
    selectedOption,
    activeVariant: selectedOption && findVariant(variants, selectedOption),
  })

  return (
    <div>
      <Link href={product.path}>
        {activeImageUrl && (
          <Image
            width="200"
            height="200"
            src={activeImageUrl}
            alt={`Image for ${product.name}`}
            className="aspect-video w-full"
          />
        )}
      </Link>

      <div className="mt-3">
        {productOptions.map(option => {
          switch (option.__typename) {
            case 'MultipleChoiceOption': {
              const values = removeEdgesAndNodes(option.values)

              return (
                <div key={option.entityId} className="flex flex-wrap gap-2">
                  {values.map(value => {
                    switch (value.__typename) {
                      case 'SwatchOptionValue':
                        return (
                          <button
                            className="h-7 w-7 rounded-full p-1"
                            key={value.entityId}
                            onClick={() =>
                              setSelectedOption({
                                optionEntityId: option.entityId,
                                valueEntityId: value.entityId,
                              })
                            }
                          >
                            <span
                              className="block h-full w-full rounded-full"
                              style={{ backgroundColor: value.hexColors[0] }}
                            />
                          </button>
                        )
                    }
                  })}
                </div>
              )
            }
            default: {
              return null
            }
          }
        })}
      </div>

      <Link href={product.path} className="text-xs leading-normal">
        <div className="mt-2 text-gray-400">{product.name}</div>
        <div className="text-gray-100">${product.prices?.price.value}</div>
      </Link>
    </div>
  )
}
