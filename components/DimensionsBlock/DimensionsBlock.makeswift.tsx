import dynamic from 'next/dynamic'

import { Checkbox, Image, List, Number, Shape, Style, TextInput, Link } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./DimensionsBlock').then(({ DimensionsBlock }) => DimensionsBlock )))
  ),
  {
    type: 'DimensionsBlock',
    label: 'BigCommerce / DimensionsBlock',
    props: {
      description: Shape({
        type: {
          className: Style(),
          title: TextInput({ label: 'Title', defaultValue: 'Nomad' }),
          descImage: Image({ label: 'Schematics Image' }),
          description: TextInput({ label: 'Description', defaultValue: 'A vintage-inspired, mid-century silhouette offers an upright sit, perfect for conversation, reading, or working from the couch.'}),
          link: Link({ label: 'Button Link', defaultValue: { href:'#', target:'_blank' }}),
          buttonText: TextInput({ label: 'Button Text', defaultValue: 'Shop Nomad' })
        }
      }),
    },
  }
)
