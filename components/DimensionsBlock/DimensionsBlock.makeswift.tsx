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
    label: 'BigCommerce / Dimensions Block',
    props: {
      collections: List({
        label: 'Collections',
        type: Shape({
          type: {
            name: TextInput({ label: 'Title', defaultValue: 'Collection', selectAll: true }),
            description: TextArea({
              label: 'Description',
              defaultValue:
                'A vintage-inspired, mid-century silhouette offers an upright sit, perfect for conversation, reading, or working from the couch.',
              selectAll: true,
            }),
            mobileDescription: TextInput({
              label: 'Mobile description',
              defaultValue: 'Mid-century modularity',
              selectAll: true,
            }),
            link: Link({ label: 'Button Link' }),
            buttonText: TextInput({ label: 'Button Text', defaultValue: 'Shop Collection' }),
            desktopImage: Image({ label: 'Desktop image', format: Image.Format.WithDimensions }),
            desktopImageAlt: TextInput({
              label: 'Image Alt Text',
              defaultValue: 'Collection dimensions',
              selectAll: true,
            }),
            mobileSofaImage: Image({
              label: 'Mobile sofa image',
              format: Image.Format.WithDimensions,
            }),
            mobileSofaImageAlt: TextInput({
              label: 'Image Alt Text',
              defaultValue: 'Collection dimensions',
              selectAll: true,
            }),
            mobileDimensionsImage: Image({
              label: 'Mobile dimensions image',
              format: Image.Format.WithDimensions,
            }),
            mobileDimensionsImageAlt: TextInput({
              label: 'Image Alt Text',
              defaultValue: 'Collection dimensions',
              selectAll: true,
            }),
          },
        }),
        getItemLabel(collection) {
          return collection?.name || 'Collection'
        },
      }),
      className: Style(),
    },
  }
)
