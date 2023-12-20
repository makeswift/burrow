import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {  BIGCOMMERCE_STORE_HASH , BIGCOMMERCE_STORE_API_TOKEN } = process.env

    // https://developer.bigcommerce.com/docs/rest-catalog/products#get-all-products
    // Controls the number of items per page in a limited (paginated) list of products. The default product limit is 50 with a maximum limit of 250.
    // const productListAll = await bigcommerce.get('/catalog/products')

    const products = await fetch(`https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/catalog/products?include=primary_image`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': BIGCOMMERCE_STORE_API_TOKEN || "",
            accept: "application/json",
            "Content-Type": "application/json"
        },
    });

    const productList = await products.json()

    res.status(200).json(productList?.data)
}

