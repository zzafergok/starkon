'use client'

import { useTranslation } from 'react-i18next'

import { Button } from '../core/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../core/dialog'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  cancelText?: string
  isLoading?: boolean
  confirmText?: string
  onConfirm: () => void
  variant?: 'default' | 'destructive'
  onOpenChange: (open: boolean) => void
}

export function ConfirmDialog({
  open,
  title,
  onConfirm,
  cancelText,
  confirmText,
  description,
  onOpenChange,
  isLoading = false,
  variant = 'destructive',
}: ConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
            {cancelText || t('common.cancel')}
          </Button>
          <Button type='button' variant={variant} onClick={onConfirm} disabled={isLoading}>
            {isLoading ? t('common.loading') : confirmText || t('common.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
