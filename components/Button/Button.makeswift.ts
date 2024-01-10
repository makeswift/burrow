import dynamic from 'next/dynamic'

import { MakeswiftComponentType } from '@makeswift/runtime/components'
import { Link, Select, Style, TextInput } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

export const props = {
  children: TextInput({
    label: 'Text',
    defaultValue: 'Button text',
    selectAll: true,
  }),
  link: Link({ label: 'Link' }),
  color: Select({
    label: 'Color',
    options: [
      { value: 'beige', label: 'Beige' },
      { value: 'canary', label: 'Canary' },
    ],
    defaultValue: 'canary',
  }),
  size: Select({
    label: 'Size',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'large', label: 'Large' },
    ],
    defaultValue: 'large',
  }),
  className: Style({ properties: [Style.Margin] }),
}

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./Button').then(({ Button }) => Button)))
  ),
  {
    type: MakeswiftComponentType.Button,
    label: 'Button',
    props,
  }
)
