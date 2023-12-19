import { NextApiRequest, NextApiResponse } from 'next'


// import { NextApiRequest, NextApiResponse } from 'next'
// import {NextRequest} from "next/server";
//
// export async function GET(req: NextRequest, res: NextApiResponse) {
//
//     console.log("we GET")
//     const {BIGCOMMERCE_STOREFRONT_URL, BIGCOMMERCE_STOREFRONT_API_TOKEN} = process.env
//     try{
//         res.status(200).json("product")
//     } catch (e) {
//
//         res.status(200).json("product fetch issue")
//     }
// }
//
// export async function POST(req: NextRequest, res: NextApiResponse) {
//
//     console.log("we jere")
//     const {BIGCOMMERCE_STOREFRONT_URL, BIGCOMMERCE_STOREFRONT_API_TOKEN} = process.env
//     const body = req.body;
//     console.log("body", body)
//     try {
//         const variables = {
//             attribute: "nomad",
//             value: "name",
//
//         }
//
//         console.log("BIGCOMMERCE_STOREFRONT_URL", BIGCOMMERCE_STOREFRONT_URL)
//         console.log("BIGCOMMERCE_STOREFRONT_API_TOKEN", BIGCOMMERCE_STOREFRONT_API_TOKEN)
//         console.log("SEARCH_NAME_PRODUCTS", JSON.stringify({
//             SEARCH_NAME_PRODUCTS,
//             variables,
//         }))
//
//         // const result = await fetchGraphQL(getProductByIdQuery, vars)
//         const response = await fetch(BIGCOMMERCE_STOREFRONT_URL || "", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + BIGCOMMERCE_STOREFRONT_API_TOKEN,
//             },
//             body: JSON.stringify({
//                 SEARCH_NAME_PRODUCTS,
//                 variables,
//             }),
//         })
//
//         console.log("response", response)
//
//
//         if (!response.ok) throw new Error(response.statusText)
//
//         const result: GraphQLResponse<SearchNameQuery> = await response.json()
//
//         if (result.errors != null) {
//             result.errors.forEach(error => {
//                 console.error(error.message)
//             })
//
//             throw new Error('No Product found')
//         }
//
//         const product = result.data.site
//         console.log("product", product)
//
//         res.status(200).json(product)
//     } catch (e) {
//
//         res.status(200).json("product fetch issue")
//     }
// }
//
//
// export const SEARCH_NAME_PRODUCTS = /* GraphQL */ `
//
//
// query searchNameQuery($attribute: String, $values: String) {
//   site {
//     search {
//       searchProducts(
//         filters: {productAttributes: {entityId: $attribute, values: $values}}
//       ) {
//         products {
//           edges {
//             node {
//               id
//               addToCartUrl
//               name
//             }
//             cursor
//           }
//         }
//       }
//     }
//   }
// }
// `
//
// export type GraphQLError = { message: string }
//
//
// export type GraphQLResponse<T> =
//     | { data: T; errors: undefined }
//     | { data: null; errors: GraphQLError[] }
//
// export type SearchNameQuery = {
//     site: {
//         categoryTree: Product
//     }
// }
//
// export type Product = {
//     id: number
//     addToCartUrl: string
//     name: string
// }
//
