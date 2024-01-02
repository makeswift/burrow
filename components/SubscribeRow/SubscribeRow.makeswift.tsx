import dynamic from 'next/dynamic'

import { Checkbox, Image, List, Number, Shape, Style, TextInput, Link, Color, Select } from '@makeswift/runtime/controls'
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
          label: TextInput({ label: 'Subscription Label', defaultValue: 'Sign up for enthralling couch reads' }),
          backgroundColor: Color({ label: 'Background Color', defaultValue: '#514f4d' }),
          borderColor: Color({ label: 'Border Color', defaultValue: '#f7eee3' }),
          buttonText: TextInput({ label: 'Button Text', defaultValue: 'SUBSCRIBE' }),
          buttonTextColor: Color({ label: 'Button Text Color', defaultValue: '#514f4d' }),
          buttonColor: Color({ label: 'Button Color', defaultValue: '#f7eee3' }),
          socialLinks: List({
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
            getItemLabel(label){
              if (label !== undefined) {
                return label.charAt(0).toUpperCase() + label.slice(1)
              } else {
                return 'Untitled' 
              }
            }
          }),
        }
      }),
    },
  }
)
