import React from 'react'
import { Button, Title, Text } from '@tetherto/pearpass-lib-ui-kit'
import { InlineDialog } from './InlineDialog'
import { ONBOARDING_DIALOG_HEIGHT } from './constants'

interface Step1Props {
  onNext: () => void
}

export const Step1Dialog = ({ onNext }: Step1Props) => {
  const footer = (
    <div className="flex w-full items-center justify-end">
      <Button variant="primary" size="medium" onClick={onNext}>
        Done
      </Button>
    </div>
  )

  return (
    <InlineDialog
      title="Step 1 of 3"
      footer={footer}
      hideCloseButton
      open
      style={{ height: ONBOARDING_DIALOG_HEIGHT }}
    >
      <div className="flex flex-col gap-4">
        <img
          src="/assets/images/step1.png"
          className="mx-auto my-6 block"
          alt="Step 1"
        />
        <div className="flex flex-col items-center gap-4 text-center">
          <Title as="h2">Pin Pearpass for quick access</Title>
          <div className="flex flex-col gap-2">
            <Text as="p" variant="body">
              Pinning Pearpass keeps it one click away whenever you need it
            </Text>
            <Text as="p" variant="body">
              Keep Pearpass accessible in your toolbar for quick access to your
              items
            </Text>
            <Text as="p" variant="body">
              1. Click a puzzle icon in a toolbar
            </Text>
            <Text as="p" variant="body">
              2. Click pin next to the Pearpass
            </Text>
          </div>
        </div>
      </div>
    </InlineDialog>
  )
}
