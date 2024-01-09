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
          <Image width="200" height="200" src={activeImageUrl} alt={`Image for ${product.name}`} />
        )}
      </Link>
      <div className="grid  grid-cols-3">
        <div className="grid grid-cols-3  pt-3">
          {productOptions.map(option => {
            switch (option.__typename) {
              case 'MultipleChoiceOption': {
                const values = removeEdgesAndNodes(option.values)

                return (
                  <div key={option.entityId}>
                    <div>{option.displayName}</div>
                    <div>
                      {values.map(value => {
                        switch (value.__typename) {
                          case 'SwatchOptionValue':
                            return (
                              <button
                                className="bg-slate-50 p-4"
                                key={value.entityId}
                                onClick={() =>
                                  setSelectedOption({
                                    optionEntityId: option.entityId,
                                    valueEntityId: value.entityId,
                                  })
                                }
                              >
                                {value.hexColors}
                              </button>
                            )
                        }
                      })}
                    </div>
                  </div>
                )
              }
              default: {
                return null
              }
            }
          })}
        </div>
      </div>
      <Link href={product.path}>
        <div className="font-bold">{product.name}</div>
        <div className="text-sm">${product.prices?.price.value}</div>
      </Link>
    </div>
  )
}
