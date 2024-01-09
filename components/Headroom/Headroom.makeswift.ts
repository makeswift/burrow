import dynamic from 'next/dynamic'

import { Number, Slot } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./Headroom').then(({ Headroom }) => Headroom))),
  ),
  {
    type: 'headroom',
    label: 'Headroom',
    props: {
      children: Slot(),
      upTolerance: Number({ label: 'Up tolerance', defaultValue: 0, suffix: 'px' }),
      downTolerance: Number({ label: 'Down tolerance', defaultValue: 0, suffix: 'px' }),
      pinStart: Number({ label: 'Pin start', defaultValue: 0, suffix: 'px' }),
    },
  },
)
