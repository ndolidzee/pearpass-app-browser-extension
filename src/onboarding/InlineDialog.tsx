import React from 'react'
import { Text, Button } from '@tetherto/pearpass-lib-ui-kit'
import { Close } from '@tetherto/pearpass-lib-ui-kit/icons'

const theme = {
  colorBorderPrimary: '#212814',
  colorSurfacePrimary: '#15180E',
  colorTextPrimary: '#FFFFFF',
  radius8: '8px',
  spacing8: '8px',
  spacing12: '12px',
  spacing16: '16px',
  fontSize14: '14px'
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'flex-start' as const,
    boxSizing: 'border-box' as const,
    borderWidth: 1,
    borderStyle: 'solid' as const,
    borderColor: theme.colorBorderPrimary,
    borderRadius: theme.radius8,
    backgroundColor: theme.colorSurfacePrimary,
    overflow: 'hidden',
    maxHeight: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
    gap: theme.spacing12,
    paddingTop: theme.spacing12,
    paddingBottom: theme.spacing12,
    paddingLeft: theme.spacing16,
    paddingRight: theme.spacing16
  },
  title: {
    display: 'flex',
    color: theme.colorTextPrimary,
    fontFamily: 'Inter, sans-serif',
    fontSize: theme.fontSize14,
    fontWeight: 500,
    lineHeight: 'normal',
    minWidth: 0,
    flex: 1
  },
  body: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: theme.spacing16,
    borderTopWidth: 1,
    borderTopStyle: 'solid' as const,
    borderTopColor: theme.colorBorderPrimary,
    color: theme.colorTextPrimary,
    fontFamily: 'Inter, sans-serif',
    fontSize: theme.fontSize14,
    fontWeight: 400,
    lineHeight: 'normal',
    overflowY: 'auto' as const,
    overscrollBehavior: 'contain' as const,
    flex: 1
  },
  footer: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
    gap: theme.spacing8,
    paddingTop: theme.spacing12,
    paddingBottom: theme.spacing12,
    paddingLeft: theme.spacing16,
    paddingRight: theme.spacing16,
    borderTopWidth: 1,
    borderTopStyle: 'solid' as const,
    borderTopColor: theme.colorBorderPrimary
  }
}

export interface InlineDialogProps
  extends Omit<React.ComponentProps<'div'>, 'title'> {
  title: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  open?: boolean
  onClose?: () => void
  hideCloseButton?: boolean
  closeButtonAriaLabel?: string
  testID?: string
  closeButtonTestID?: string
}

export const InlineDialog = React.forwardRef<HTMLDivElement, InlineDialogProps>(
  function InlineDialog(
    {
      title,
      children,
      footer,
      open = true,
      onClose,
      hideCloseButton = false,
      closeButtonAriaLabel = 'Close dialog',
      style: userStyle,
      testID,
      closeButtonTestID,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) {
    const hasBody =
      children !== undefined && children !== null && children !== false
    const hasFooter =
      footer !== undefined && footer !== null && footer !== false

    const titleId = React.useId()
    const bodyId = React.useId()

    if (!open) {
      return null
    }

    return (
      <div
        {...rest}
        ref={ref}
        data-testid={testID}
        role="region"
        aria-labelledby={ariaLabelledBy ?? titleId}
        aria-describedby={ariaDescribedBy ?? (hasBody ? bodyId : undefined)}
        style={{ ...styles.root, ...userStyle }}
      >
        <div style={styles.header}>
          <Text id={titleId} style={styles.title as object}>
            {title}
          </Text>
          {!hideCloseButton && (
            <Button
              variant="tertiary"
              size="small"
              iconBefore={<Close />}
              onClick={onClose}
              aria-label={closeButtonAriaLabel}
              data-testid={closeButtonTestID}
            />
          )}
        </div>

        {hasBody && (
          <div id={bodyId} style={styles.body}>
            {children}
          </div>
        )}

        {hasFooter && <div style={styles.footer}>{footer}</div>}
      </div>
    )
  }
)

InlineDialog.displayName = 'InlineDialog'
