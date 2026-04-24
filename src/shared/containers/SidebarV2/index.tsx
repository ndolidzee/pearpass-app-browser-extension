import { useState } from 'react'

import { Text, useTheme } from '@tetherto/pearpass-lib-ui-kit'

import { createStyles } from './SidebarV2.styles'

export const SidebarV2 = () => {
  const { theme } = useTheme()
  const [isCollapsed] = useState(false)
  const styles = createStyles(theme.colors, isCollapsed)

  return (
    <aside style={styles.wrapper} data-testid="sidebar-v2">
      <div style={styles.scrollContainer}>
        <div style={styles.scrollArea}>
          <Text variant="labelEmphasized">Sidebar V2</Text>
        </div>
        <div style={styles.fadeGradient} aria-hidden="true" />
      </div>
      <div style={styles.footerSection}>
        <Text variant="caption" color={theme.colors.colorTextSecondary}>
          Footer
        </Text>
      </div>
    </aside>
  )
}
