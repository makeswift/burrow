import dynamic from 'next/dynamic'

import { Link, List, Shape, Slot, Style, TextInput } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

export const props = {
  className: Style(),
  footerGroups: List({
    label: 'Footer groups',
    type: Shape({
      type: {
        heading: TextInput({
          label: 'Group heading',
          defaultValue: 'Heading',
          selectAll: true,
        }),
        footerLinks: List({
          label: 'Links',
          type: Shape({
            type: {
              text: TextInput({ label: 'Text', defaultValue: 'Link', selectAll: true }),
              link: Link({ label: 'On click' }),
            },
          }),
          getItemLabel(link) {
            return link?.text || 'Link'
          },
        }),
      },
    }),
    getItemLabel(group) {
      return group?.heading || 'Heading'
    },
  }),
  legal: Slot(),
}

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./Footer').then(({ Footer }) => Footer)))
  ),
  {
    type: 'Footer',
    label: 'Footer',
    icon: 'navigation',
    props,
  }
)
