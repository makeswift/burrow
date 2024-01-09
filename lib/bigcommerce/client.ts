import { strict } from 'assert'
import { GraphQLClient } from 'graphql-request'

strict(process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_URL)
strict(process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_TOKEN)

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_URL, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
    // 'X-Exclude-Invalid': 'true',
  },
})
