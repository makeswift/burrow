import dynamic from 'next/dynamic'

import { Select, Style, TextInput } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

export const props = {
  className: Style(),
  title: TextInput({ label: 'Title', defaultValue: 'Seat depth', selectAll: true }),
  leftText: TextInput({ label: 'Left Text', defaultValue: 'Standard', selectAll: true }),
  rightText: TextInput({ label: 'Right Text', defaultValue: 'Ultra deep', selectAll: true }),
  sliderPosition: Select({
    label: 'Slider position',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
    ],
    defaultValue: '1',
  }),
  sliderLabel: TextInput({ label: 'Slider label', defaultValue: '21"', selectAll: true }),
}

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./Slider').then(({ Slider }) => Slider)))
  ),
  { type: 'Slider', label: 'BigCommerce / Slider', props }
)
