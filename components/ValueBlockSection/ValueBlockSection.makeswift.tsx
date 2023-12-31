import dynamic from 'next/dynamic'

import { Checkbox, Image, List, Number, Shape, Style, TextInput, Link, Color } from '@makeswift/runtime/controls'
import { forwardNextDynamicRef } from '@makeswift/runtime/next'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
    forwardNextDynamicRef(patch =>
        dynamic(() => patch(import('./ValueBlockSection').then(({ ValueBlockSection }) => ValueBlockSection )))
    ),
    {
        type: 'ValueBlockSection',
        label: 'BigCommerce / ValueBlockSection',
        props: {
            values: Shape({
                type: {
                    className: Style(),
                    title: TextInput({ label: 'Value Section Title', defaultValue: 'A few things you can always expect' }),
                    valueBlockList: List({
                        label: 'Value Block Item',
                        type: Shape({
                            type: {
                                title: TextInput({ label: 'Item Title', defaultValue: 'Durable, premium materials' }),
                                description: TextInput({ label: 'Item Description', defaultValue: 'We use materials like sustainably-forested wood, strengthened steel hardware, and top-grain Italian leather.'}),
                                descImage: Image({ label: 'Item Image' }),
                            }
                        }),
                        getItemLabel(value) {
                            return value?.title || 'Untitled'
                        },
                    }),
                    link: Link({ label: 'Button Link', defaultValue: { href:'#', target:'_blank' }}),
                    buttonText: TextInput({ label: 'Button Text', defaultValue: 'SHOP ALL SEATING' }),
                    buttonTextColor: Color({ label: 'Button Background Color', defaultValue: '#383633' }),
                    buttonBackgroundColor: Color({ label: 'Button Background Color', defaultValue: '#fcee71' }),
                    backgroundColor: Color({ label: 'Section Background Color', defaultValue: '#f7eee3' }),
                }
            }),
        },
    }
)
