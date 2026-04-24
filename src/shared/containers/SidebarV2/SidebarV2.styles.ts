import type { ThemeColors } from '@tetherto/pearpass-lib-ui-kit'
import { rawTokens } from '@tetherto/pearpass-lib-ui-kit'

export const SIDEBAR_WIDTH_EXPANDED = 200
export const SIDEBAR_WIDTH_COLLAPSED = 56
export const SIDEBAR_HEADER_HEIGHT = 44
export const FADE_GRADIENT_HEIGHT = 32

export const createStyles = (colors: ThemeColors, isCollapsed: boolean) => ({
  wrapper: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    height: '100%',
    width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
    backgroundColor: colors.colorSurfacePrimary,
    borderRight: `1px solid ${colors.colorBorderPrimary}`,
    boxSizing: 'border-box' as const,
    overflow: 'hidden' as const,
    transition: 'width 150ms ease',
    flexShrink: 0
  },

  scrollContainer: {
    position: 'relative' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0
  },

  scrollArea: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0,
    gap: rawTokens.spacing8,
    paddingInline: rawTokens.spacing12,
    paddingTop: rawTokens.spacing12,
    paddingBottom: FADE_GRADIENT_HEIGHT,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const
  },

  fadeGradient: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    bottom: 0,
    height: FADE_GRADIENT_HEIGHT,
    pointerEvents: 'none' as const,
    background: `linear-gradient(180deg, ${colors.colorSurfacePrimary}00 0%, ${colors.colorSurfacePrimary} 100%)`
  },

  footerSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: isCollapsed ? ('center' as const) : ('stretch' as const),
    gap: 1,
    padding: rawTokens.spacing12,
    borderTop: `1px solid ${colors.colorBorderPrimary}`,
    backgroundColor: colors.colorSurfacePrimary,
    flexShrink: 0
  }
})
