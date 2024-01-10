import { Ref, forwardRef } from 'react'

import { useKeenSlider } from 'keen-slider/react'
import debounce from 'lodash.debounce'
import useSWR from 'swr'
import tailwindConfig from 'tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

import { ProductsCarouselProductsDocument } from '@/generated/graphql'
import { client } from '@/lib/bigcommerce/client'
import { exists } from '@/lib/utils/exists'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'

import { ProductsCarouselItem } from './ProductsCarouselItem'

export interface Props {
  className?: string
  loop?: boolean
  itemsShown: number
  productIds: (string | undefined)[]
}

const fullConfig = resolveConfig(tailwindConfig)

function getMobileBreakpoint() {
  // @ts-expect-error tailwind types are generic
  const breakpoint = fullConfig?.theme?.screens?.xs

  if (breakpoint == null) {
    console.warn('Missing mobile breakpoint, Carousel falling back to 576px.')

    return '(max-width: 576px)'
  }

  return `(max-width: ${breakpoint})`
}

function getTabletBreakpoint() {
  // @ts-expect-error tailwind types are generic
  const breakpoint = fullConfig?.theme?.screens?.md

  if (breakpoint == null) {
    console.warn('Missing tablet breakpoint, Carousel falling back to 768px.')

    return '(max-width: 768px)'
  }

  return `(max-width: ${breakpoint})`
}

export const ProductsCarousel = forwardRef(function ProductsCarousel(
  { className, itemsShown = 3, productIds }: Props,
  ref: Ref<HTMLDivElement>
) {
  const results = useSWR('products', () => client.request(ProductsCarouselProductsDocument))
  const products = results.data ? removeEdgesAndNodes(results.data?.site.products) : []

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        [getTabletBreakpoint()]: {
          slides: { perView: 2, origin: 'auto', spacing: 24 },
        },
        [getMobileBreakpoint()]: {
          slides: { perView: 1, origin: 'auto' },
        },
      },
      slides: { perView: itemsShown, origin: 'auto', spacing: 32 },
      selector: ':scope > div',
    },
    [
      slider => {
        const debouncedUpdate = debounce(() => slider.update(), 100)
        const observer = new ResizeObserver(() => debouncedUpdate())

        slider.on('created', () => observer.observe(slider.container))
        slider.on('destroyed', () => observer.unobserve(slider.container))
      },
    ]
  )

  function prevSlide() {
    const slider = instanceRef.current
    if (!slider) return
    slider.moveToIdx(slider.track.details.rel - 1)
  }

  function nextSlide() {
    const slider = instanceRef.current
    if (!slider) return
    slider.moveToIdx(slider.track.details.rel + 1)
  }

  return (
    <div ref={ref} className={className}>
      {productIds.length > 0 ? (
        <div className="relative">
          <div
            tabIndex={-1}
            onKeyDown={e => {
              switch (e.key) {
                default:
                  break
                case 'Left':
                case 'ArrowLeft':
                  prevSlide()
                  break
                case 'Right':
                case 'ArrowRight':
                  nextSlide()
                  break
              }
            }}
            className="focus:outline-0"
          >
            <div
              className="flex w-full touch-pan-y select-none flex-nowrap items-start overflow-hidden focus:outline-0"
              ref={sliderRef}
            >
              {productIds
                .map(id => products.find(p => p.id === id))
                .filter(exists)
                .map((product, index) => (
                  <ProductsCarouselItem key={`${product.id}:${index}`} product={product} />
                ))}
            </div>
          </div>

          {productIds.length > itemsShown && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous product"
                className="group absolute left-4 top-1/3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-black/25 transition duration-300"
              >
                <svg viewBox="0 0 23 18" width={12} height={10}>
                  <path
                    d="m5.713 10.49 5.41 5.403L9.013 18 0 9l9.013-9 2.11 2.107-5.41 5.403H23v2.98H5.712Z"
                    className="fill-gray-400"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next product"
                className="group absolute right-4 top-1/3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-black/25 transition duration-300"
              >
                <svg viewBox="0 0 23 18" width={12} height={10}>
                  <path
                    fillRule="evenodd"
                    d="m17.288 7.51-5.411-5.403L13.987 0 23 9l-9.013 9-2.11-2.107 5.41-5.403H0V7.51h17.288Z"
                    clipRule="evenodd"
                    className="fill-gray-300"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text text-primary py-4 text-center">There are no products added</p>
      )}
    </div>
  )
})
