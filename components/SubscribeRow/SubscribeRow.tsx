import React, { Ref, forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import clsx from 'clsx'

type SocialLinkItem = {
  linkType: string
}

type SubscribeElement = {
  label: string
  backgroundColor: string
  borderColor: string
  buttonText: string
  buttonTextColor: string
  buttonColor: string
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

  const border = '1px solid '+subscribeElement.borderColor;
  return (
    <div ref={ref} className="flex flex-row px-10 py-12" style={{ 'background-color': subscribeElement.backgroundColor, width: '100%' }}>
      <div className="flex flex-1 flex-row grow subscribe-container">
        <form className='flex flex-row grow' style={{ 'border': border, 'border-radius': '2px', 'max-width': '85%' }}>
          <div className='flex grow' style={{ 'position': 'relative' }}>
            <input id="email" className="has-label px-6" style={{ 'background-color': subscribeElement.backgroundColor,  paddingTop: '1rem', padding: '0 1.25rem', width: '100%' }} type="email" name="email" required="" autocomplete="email" autocapitalize="none" aria-label="email" value="" />
            <label for="email" className='flex align-center text-sm font-light m-auto left-4' style={{ position: 'absolute', top: '0', zIndex: '4', lineHeight: '1rem', 'color':  subscribeElement.buttonColor, height: 'min-content', bottom: '0'}}>{subscribeElement.label}</label>
          </div>
          <button className='flex px-20 py-4 justify-center tracking-wider text-sm font-normal' style={{ 'backgroundColor': subscribeElement.buttonColor, color: subscribeElement.buttonTextColor }}>{subscribeElement.buttonText}</button>
        </form>
      </div>
      <div className="flex flex-1 justify-end social-container">
        <ul className='flex flex-row items-center social-list'>
          {subscribeElement.socialLinks.map((linkType, idx) => {
            if (contentForSocialLinks[linkType] !== undefined) {
              return (
                <li className='social-list-linkType flex flex-1 px-3 items-end'>
                  <a href={contentForSocialLinks[linkType].href} aria-label={contentForSocialLinks[linkType].profile} target="_self" hreflang="en-us" style={{ 'color': subscribeElement.buttonColor, fontSize: '1.5rem' }}>
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
