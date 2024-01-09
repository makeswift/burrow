import dynamic from 'next/dynamic'

import { Image, Link, Style, TextArea, TextInput } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./SectionsBlock').then(({ SectionsBlock }) => SectionsBlock)))
  ),
  {
    type: 'SectionsBlock',
    label: 'BigCommerce / Sections Block',
    props: {
      title: TextInput({ label: 'Title', defaultValue: 'Collection' }),
      description: TextArea({
        label: 'Description',
        defaultValue: 'Time Magazine’s Best Invention of 2018, and still going strong.',
        selectAll: true,
      }),
      link: Link({ label: 'Button Link' }),
      buttonText: TextInput({ label: 'Button Text', defaultValue: 'Shop Collection' }),
      desktopImage: Image({ label: 'Desktop Image', format: Image.Format.WithDimensions }),
      desktopImageAlt: TextInput({
        label: 'Desktop image alt text',
        defaultValue: 'Image of couch',
        selectAll: true,
      }),
      mobileImage: Image({ label: 'Mobile Image', format: Image.Format.WithDimensions }),
      mobileImageAlt: TextInput({
        label: 'Mobile image alt text',
        defaultValue: 'Image of couch',
        selectAll: true,
      }),
      className: Style(),
    },
  }
)
