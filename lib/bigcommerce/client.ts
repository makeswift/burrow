// @ts-ignore
import * as BigCommerce from 'node-bigcommerce'


const { BIGCOMMERCE_STORE_API_CLIENT_ID, BIGCOMMERCE_STORE_HASH , BIGCOMMERCE_STORE_API_TOKEN } = process.env




    export function bigcommerceClient(apiVersion = 'v3') {
        return new BigCommerce({
            clientId: BIGCOMMERCE_STORE_API_CLIENT_ID,
            BIGCOMMERCE_STORE_API_TOKEN,
            BIGCOMMERCE_STORE_HASH,
            responseType: 'json',
            apiVersion,
        });
    }
