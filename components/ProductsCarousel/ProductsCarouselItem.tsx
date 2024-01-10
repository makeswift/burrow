import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef, useState } from 'react'

import clsx from 'clsx'

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

interface Props extends ComponentPropsWithoutRef<'div'> {
  product: ProductsCarouselProductFragment
}

export const ProductsCarouselItem = ({ product, ...rest }: Props) => {
  const productOptions = removeEdgesAndNodes(product.productOptions)
  const variants = removeEdgesAndNodes(product.variants)
  const defaultVariantOption = removeEdgesAndNodes(variants[0].options)[0]
  const defaultVariantOptionValue = removeEdgesAndNodes(defaultVariantOption.values)[0]
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    optionEntityId: defaultVariantOption.entityId,
    valueEntityId: defaultVariantOptionValue.entityId,
  })

  const activeVariant = findVariant(variants, selectedOption)
  const activeImageUrl = activeVariant?.defaultImage?.url
  const hoverImageUrl = activeVariant && removeEdgesAndNodes(activeVariant.metafields)[0]?.value

  // console.log({
  //   product,
  //   selectedOption,
  //   activeVariant: selectedOption && findVariant(variants, selectedOption),
  //   hoverImageUrl,
  // })

  return (
    <div {...rest}>
      <div className="group relative cursor-pointer">
        {activeImageUrl && (
          <Image
            width="200"
            height="200"
            src={activeImageUrl}
            alt={`Image for ${product.name}`}
            className="aspect-video w-full"
          />
        )}
        {hoverImageUrl && (
          <Image
            width="200"
            height="200"
            src={hoverImageUrl}
            alt={`Hover image for ${product.name}`}
            className="absolute inset-0 aspect-video w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

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
                            className={clsx(
                              'h-7 w-7 rounded-full border p-1 transition-colors duration-200',
                              option.entityId === selectedOption.optionEntityId &&
                                value.entityId === selectedOption.valueEntityId
                                ? 'border-gray-400'
                                : 'border-transparent'
                            )}
                            key={value.entityId}
                            onClick={() =>
                              setSelectedOption({
                                optionEntityId: option.entityId,
                                valueEntityId: value.entityId,
                              })
                            }
                            aria-label={value.hexColors[0]}
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

      <div className="mt-2 text-sm text-gray-400">{product.name}</div>
      <div className="text-sm text-gray-100">${product.prices?.price.value}</div>
    </div>
  )
}
