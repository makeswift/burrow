import { MakeswiftComponentType } from '@makeswift/runtime/components'
import {
  Image,
  Link,
  List,
  Number,
  RichText,
  Shape,
  Slot,
  Style,
  TextInput,
} from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { Navigation } from './Navigation'

runtime.registerComponent(Navigation, {
  type: MakeswiftComponentType.Navigation,
  label: 'Navigation',
  props: {
    className: Style(),
    announcement: RichText({ mode: RichText.Mode.Inline }),
    topLinks: List({
      label: 'Top links',
      type: Shape({
        type: {
          text: TextInput({
            label: 'Text',
            defaultValue: 'Link',
            selectAll: true,
          }),
          link: Link({ label: 'On click' }),
        },
      }),
      getItemLabel(topLink) {
        return topLink?.text || 'Link'
      },
    }),
    logoImage: Image({
      label: 'Logo',
      format: Image.Format.WithDimensions,
    }),
    logoWidth: Number({
      label: 'Logo width',
      defaultValue: 120,
      suffix: 'px',
      selectAll: true,
    }),
    logoAlt: TextInput({
      label: 'Logo alt text',
      defaultValue: 'Logo',
      selectAll: true,
    }),
    logoLink: Link({ label: 'Logo on click' }),
    mainNavLinks: List({
      label: 'Main links',
      type: Shape({
        type: {
          text: TextInput({
            label: 'Text',
            defaultValue: 'Link',
            selectAll: true,
          }),
          link: Link({ label: 'On click (disabled with subnav)' }),
          subnavGroups: List({
            label: 'Subnav groups',
            type: Shape({
              type: {
                heading: TextInput({
                  label: 'Heading',
                  defaultValue: 'Heading',
                  selectAll: true,
                }),
                subnavLinks: List({
                  label: 'Links',
                  type: Shape({
                    type: {
                      linkText: TextInput({
                        label: 'Text',
                        defaultValue: 'Link',
                        selectAll: true,
                      }),
                      link: Link({ label: 'On click' }),
                    },
                  }),
                  getItemLabel(subnavLink) {
                    return subnavLink?.linkText || 'Link'
                  },
                }),
              },
            }),
            getItemLabel(subnavGroup) {
              return subnavGroup?.heading || 'Heading'
            },
          }),
        },
      }),
      getItemLabel(links) {
        return links?.text || 'Link'
      },
    }),
    ctaText: TextInput({
      label: 'CTA text',
      defaultValue: 'Contact us',
      selectAll: true,
    }),
    ctaLink: Link({ label: 'CTA link' }),
  },
})
