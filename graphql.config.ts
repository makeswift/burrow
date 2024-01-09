import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  generates: {
    'generated/graphql.ts': {
      documents: './components/**/*.graphql',
      schema: {
        [`${process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_URL}`]: {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
          },
        },
      },
      plugins: [
        'typescript',
        'typed-document-node',
        {
          'typescript-operations': {
            strictScalars: true,
            scalars: {
              BigDecimal: 'number',
              DateTime: 'string',
              Long: 'number',
            },
          },
        },
      ],
      config: {
        // namingConvention: {
        //   enumValues: './pascalCaseWithUnderscores',
        // },
        nonOptionalTypename: true,
      },
    },
  },
}
export default config
