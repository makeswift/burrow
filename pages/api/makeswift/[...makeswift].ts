import { MakeswiftApiHandler } from '@makeswift/runtime/next'
import { strict } from 'assert'

strict(process.env.MAKESWIFT_SITE_API_KEY)

export default MakeswiftApiHandler(process.env.MAKESWIFT_SITE_API_KEY, {
  getFonts() {
    return [
      {
        family: 'var(--font-gt-america)',
        label: 'GT America',
        variants: [{ weight: '400', style: 'normal' }],
      },
      {
        family: 'var(--font-nuzeit)',
        label: 'Nuzeit',
        variants: [
          { weight: '400', style: 'normal' },
          { weight: '700', style: 'normal' },
        ],
      },
    ]
  },
})
