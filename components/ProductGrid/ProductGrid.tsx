import { Ref, forwardRef } from 'react'
import Link from "next/link";
import Image from "next/image";



type Props = {
  className?: string
  products: any[]
}

export const ProductGrid = forwardRef(function ProductGrid(
  { className, products }: Props,
  ref: Ref<HTMLDivElement>
) {
  //TODO Add default product card.  Add option flags, Add count
  return (
      <div>
        {products
            && (
                <div className="grid  grid-cols-2 gap-4">
                  {products.map((product) => (
                      <div key={product?.id}>
            <Link href={product?.children?.custom_url?.url || ""}>
                {product?.children?.primary_image && <Image width='200' height='200' src={product?.children?.primary_image?.url_standard
                } alt={product?.children?.primary_image?.description} />}
              <div className='font-bold'>{product?.children?.name}</div>
              <div className='text-sm'>{product?.children?.price}</div>
            </Link>
          </div>
      ))}
              </div>

        )}
    </div>

  )
})
