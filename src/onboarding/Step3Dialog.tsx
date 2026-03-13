import React from 'react'
import { Button, Title, Text } from '@tetherto/pearpass-lib-ui-kit'
import { InlineDialog } from './InlineDialog'
import { ONBOARDING_DIALOG_HEIGHT } from './constants'

export const Step3Dialog = () => {
  const handleNext = () => {
    // todo: does it work aslo in other browsers like firefox? safari?
    if (
      typeof chrome !== 'undefined' &&
      chrome.action &&
      chrome.action.openPopup
    ) {
      chrome.action.openPopup()
    }
  }

  const footer = (
    <div className="flex w-full items-center justify-end">
      <Button variant="primary" size="medium" onClick={handleNext}>
        Open Pearpass extension
      </Button>
    </div>
  )

  return (
    <InlineDialog
      title="Step 3 of 3"
      footer={footer}
      hideCloseButton
      open
      style={{ height: ONBOARDING_DIALOG_HEIGHT }}
    >
      <div className="flex flex-col gap-4">
        <img
          src="/assets/images/step3.png"
          className="mx-auto my-6 block"
          alt="Step 3"
        />
        <div className="flex flex-col items-center gap-4 text-center">
          <Title as="h2">Your browser is now securely connected</Title>
          <div className="flex flex-col gap-2">
            <Text as="p" variant="body">
              You can autofill, save and generate passwords instantly.
            </Text>
            <Text as="p" variant="body">
              Browser connected, sync activated, autofill enabled.
            </Text>
          </div>
        </div>
      </div>
    </InlineDialog>
  )
}
