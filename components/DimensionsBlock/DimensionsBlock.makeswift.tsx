import dynamic from 'next/dynamic'

import { Image, Link, List, Shape, Style, TextArea, TextInput } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./DimensionsBlock').then(({ DimensionsBlock }) => DimensionsBlock)))
  ),
  {
    type: 'DimensionsBlock',
    label: 'BigCommerce / DimensionsBlock',
    props: {
      collections: List({
        label: 'Collections',
        type: Shape({
          type: {
            title: TextInput({ label: 'Title', defaultValue: 'Collection' }),
            description: TextArea({
              label: 'Description',
              defaultValue:
                'A vintage-inspired, mid-century silhouette offers an upright sit, perfect for conversation, reading, or working from the couch.',
            }),
            link: Link({ label: 'Button Link' }),
            buttonText: TextInput({ label: 'Button Text', defaultValue: 'Shop Collection' }),
            image: Image({ label: 'Image', format: Image.Format.WithDimensions }),
            imageAlt: TextInput({ label: 'Image Alt Text', defaultValue: 'Collection dimensions' }),
          },
        }),
        getItemLabel(collection) {
          return collection?.title || 'Collection'
        },
      }),
      className: Style(),
    },
  }
)
