import { Text, useTheme } from '@tetherto/pearpass-lib-ui-kit'

import { createStyles } from './RecordListV2.styles'
import { SidebarV2 } from '../../../shared/containers/SidebarV2'

export const RecordListV2 = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme.colors)

  return (
    <div style={styles.root} data-testid="record-list-v2-page">
      <SidebarV2 />
      <div style={styles.main}>
        <div style={styles.placeholder}>
          <Text variant="labelEmphasized">Record List V2</Text>
        </div>
      </div>
    </div>
  )
}
