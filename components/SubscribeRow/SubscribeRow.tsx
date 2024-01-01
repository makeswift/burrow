import React, { Ref, forwardRef } from 'react'

import clsx from 'clsx'

type SocialLinkItem = {
  linkType: string
}

type SubscribeElement = {
  label: string
  buttonText: string
  buttonColor: string
  buttonBorderColor: string
  socialLinks: SocialLinkItem[]
}

type Props = {
  subscribeElement: SubscribeElement
}

export const DimensionsBlock = forwardRef<HTMLDivElement, Props>((
  { subscribeElement }: Props,
  ref
) => {
  const contentForSocialLinks = {
    facebook: {
      href: 'https://www.facebook.com/burrow',
      icon: 'icon icon-facebook',
      profile: 'Facebook profile',
    },
    twitter: {
      href: 'https://www.twitter.com/hiburrow',
      icon: 'icon icon-twitter',
      profile: 'Twitter profile',
    },
    instagram: {
      href: 'https://www.instagram.com/burrow',
      icon: 'icon icon-instagram',
      profile: 'Instagram profile',
    }
  }
  return (
    <div ref={ref} className="flex flex-row">
      <div className="flex-1 subscribe-container">

      </div>
      <div className="flex-1 social-container">
        <ul className='social-list'>
          {subscribeElement.socialLinks.map((item, idx) => (
            <li className='social-list-item'>
              <a href={contentForSocialLinks[item.linkType].href} aria-label={contentForSocialLinks[item.linkType].profile} target="_self" hreflang="en-us">
                <i className={contentForSocialLinks[item.linkType].icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
