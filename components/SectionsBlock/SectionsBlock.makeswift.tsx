import dynamic from 'next/dynamic'

import { Checkbox, Image, List, Number, Shape, Style, TextInput, Link } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./SectionsBlock').then(({ SectionsBlock }) => SectionsBlock )))
  ),
  {
    type: 'SectionsBlock',
    label: 'BigCommerce / SectionsBlock',
    props: {
      section: Shape({
        type: {
          className: Style(),
          title: TextInput({ label: 'Title', defaultValue: 'Nomad' }),
          description: TextInput({ label: 'Description', defaultValue: 'Time Magazine’s Best Invention of 2018, and still going strong.'}),
          link: Link({ label: 'Button Link', defaultValue: { href:'#', target:'_blank' }}),
          buttonText: TextInput({ label: 'Button Text', defaultValue: 'Shop Nomad' }),
          bgImage: Image({ label: 'Schematics Image' }),
        }
      }),
    },
  }
)
