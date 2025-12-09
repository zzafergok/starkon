'use client'

import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { CheckboxField } from '@/components/forms'
import TermsModal from '@/components/ui/register/TermsModal'
import PrivacyModal from '@/components/ui/register/PrivacyModal'

/**
 * Register agreement checkboxes with modals
 */
export function RegisterAgreements() {
  const { t } = useTranslation()
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const handleTermsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowTermsModal(true)
  }

  const handlePrivacyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPrivacyModal(true)
  }

  return (
    <div className='space-y-4'>
      <CheckboxField
        name='agreedToTerms'
        label={
          <span className='text-sm text-muted-foreground leading-relaxed'>
            {t('auth.register.agreements.terms.prefix')}{' '}
            <button
              type='button'
              onClick={handleTermsClick}
              className='text-primary hover:text-primary/80 underline font-medium transition-colors'
            >
              {t('auth.register.agreements.terms.linkText')}
            </button>{' '}
            {t('auth.register.agreements.terms.suffix')}
          </span>
        }
      />

      <CheckboxField
        name='agreedToPrivacy'
        label={
          <span className='text-sm text-muted-foreground leading-relaxed'>
            {t('auth.register.agreements.privacy.prefix')}{' '}
            <button
              type='button'
              onClick={handlePrivacyClick}
              className='text-primary hover:text-primary/80 underline font-medium transition-colors'
            >
              {t('auth.register.agreements.privacy.linkText')}
            </button>{' '}
            {t('auth.register.agreements.privacy.suffix')}
          </span>
        }
      />

      <div className='bg-muted/30 rounded-lg p-3 border border-border'>
        <p className='text-xs text-muted-foreground'>{t('auth.register.agreements.note')}</p>
      </div>

      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </div>
  )
}
