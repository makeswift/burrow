import dynamic from 'next/dynamic'

import { Color, Style, TextInput } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./SubscribeRow').then(({ SubscribeRow }) => SubscribeRow)))
  ),
  {
    type: 'SubscribeRow',
    label: 'BigCommerce / Subscribe Form',
    props: {
      className: Style(),
      label: TextInput({
        label: 'Subscription Label',
        defaultValue: 'Sign up for enthralling couch reads',
      }),
      color: Color({ label: 'Form Color', defaultValue: '#f7eee3' }),
      buttonTextColor: Color({ label: 'Button Text Color', defaultValue: '#4A4A4A' }),
      buttonText: TextInput({ label: 'Button Text', defaultValue: 'Subscribe' }),
    },
  }
)
