import dynamic from 'next/dynamic'

import { Checkbox, Image, List, Number, Shape, Style, TextInput, Link } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  forwardNextDynamicRef(patch =>
    dynamic(() => patch(import('./SubscribeRow').then(({ SubscribeRow }) => SubscribeRow )))
  ),
  {
    type: 'SubscribeRow',
    label: 'BigCommerce / SubscribeRow',
    props: {
      subscribeElement: Shape({
        type: {
          className: Style(),
          label: TextInput({ label: 'Subscription Label', defaultValue: 'Nomad' }),
          buttonText: TextInput({ label: 'Button Text', defaultValue: 'Shop Nomad' }),
          buttonColor: Color({ label: 'Button Color', defaultValue: 'Shop Nomad' }),
          buttonBorderColor: Color({ label: 'Button Border Color', defaultValue: 'Shop Nomad' }),
          socialLinks: {
            type: List({
              label: 'Social Links',
              type: Select({
                label: 'Link Type',
                options: [
                  { label: 'Facebook', value: 'facebook' },
                  { label: 'Twitter', value: 'twitter' },
                  { label: 'Instagram', value: 'instagram'}
                ],
                defaultValue: 'facebook',
              }),
              getItemLabel(linkType) {
                return linkType?.value || 'Untitled'
              },
            }),
          },
        }
      }),
    },
  }
)
