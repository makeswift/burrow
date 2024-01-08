import { NextApiRequest, NextApiResponse } from 'next'

import { Connection, removeEdgesAndNodes } from '../../lib/utils/removeEdgesAndNodes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { BIGCOMMERCE_STORE_HASH, BIGCOMMERCE_STOREFRONT_API_TOKEN, BIGCOMMERCE_STOREFRONT_URL } =
    process.env

  const response = await fetch(BIGCOMMERCE_STOREFRONT_URL || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + BIGCOMMERCE_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({
      query: PRODUCTS_QUERY,
    }),
  })

  if (!response.ok) throw new Error(response.statusText)

  // @ts-ignore
  const result: GraphQLResponse<ProductQuery> = await response.json()
  console.log('result', result)

  if (result.errors != null) {
    result.errors.forEach((error: { message: any }) => {
      console.error(error.message)
    })

    throw new Error('There was an error fetching the products.')
  }

  const productList = result.data.site.products.edges.map((edge: { node: any }) => edge.node)
  const options = productList.map(
    (product: {
      productOptions: Connection<unknown>
      name: any
      sku: any
      path: any
      defaultImage: { urlOriginal: any }
      variants: Connection<unknown>
      prices: any
    }) => {
      const productOption = removeEdgesAndNodes(product?.productOptions)

      const optionValues = productOption.map(option => {
        // @ts-ignore
        return removeEdgesAndNodes(option?.values)
      })

      return {
        name: product?.name,
        sku: product?.sku,
        path: product?.path,
        defaultImage: product?.defaultImage?.urlOriginal,
        variants: removeEdgesAndNodes(product?.variants),
        optionName: removeEdgesAndNodes(product?.productOptions),
        optionValues: optionValues,
        prices: product?.prices,
      }
    }
  )

  res.status(200).json(options)
}

export const PRODUCTS_QUERY = /* GraphQL */ `
  query productVartiant {
    site {
      products {
        edges {
          node {
            name
            path
            sku
            defaultImage {
              urlOriginal
            }
            prices(includeTax: false) {
              priceRange {
                max {
                  value
                }
                min {
                  value
                }
              }
              price {
                value
              }
            }
            variants(first: 100) {
              edges {
                node {
                  sku
                  defaultImage {
                    url(width: 1000)
                  }
                }
              }
            }
            productOptions(first: 5) {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                  ... on CheckboxOption {
                    checkedByDefault
                  }
                  ... on MultipleChoiceOption {
                    values(first: 5) {
                      edges {
                        node {
                          entityId
                          label
                          isDefault
                          ... on SwatchOptionValue {
                            hexColors
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
