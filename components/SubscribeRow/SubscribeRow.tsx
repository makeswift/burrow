import React, { Ref, forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

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


export const SubscribeRow = forwardRef(function SubscribeRow(
  { subscribeElement }: Props,
  ref
) {
  const contentForSocialLinks = {
    'facebook': {
      href: 'https://www.facebook.com/burrow',
      icon: faFacebookF,
      profile: 'Facebook profile',
    },
    'twitter': {
      href: 'https://www.twitter.com/hiburrow',
      icon: faXTwitter,
      profile: 'Twitter profile',
    },
    'instagram': {
      href: 'https://www.instagram.com/burrow',
      icon: faInstagram,
      profile: 'Instagram profile',
    }
  }
  return (
    <div ref={ref} className="flex flex-row">
      <div className="flex-1 subscribe-container">
        <form>
          <div>
            <input id="email" className="has-label" type="email" name="email" required="" autocomplete="email" style={{ paddingTop: '1rem', padding: '0 1.25rem', width: '100%', height: '3.125rem' }} autocapitalize="none" aria-label="email" value="" />
            <label for="email" style={{ position: 'absolute', top: '0', zIndex: '4', lineHeight: '1rem' }}>{subscribeElement.label}</label>
          </div>
        </form>
      </div>
      <div className="flex-1 social-container">
        <ul className='flex flex-row social-list'>
          {subscribeElement.socialLinks.map((linkType, idx) => {
            if (contentForSocialLinks[linkType] !== undefined) {
              return (
                <li className='social-list-linkType flex-1'>
                  <a href={contentForSocialLinks[linkType].href} aria-label={contentForSocialLinks[linkType].profile} target="_self" hreflang="en-us">
                    <FontAwesomeIcon icon={contentForSocialLinks[linkType].icon} />
                  </a>
                </li>
              )
            } else {
              return (
                <div className="p-6 text-center text-lg">There are no social links. Try adding some.</div>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
})
