import { useState } from 'react'

import { t } from '@lingui/core/macro'
import { UNSUPPORTED } from '@tetherto/pearpass-lib-constants'
import { Button, Dialog, Radio } from '@tetherto/pearpass-lib-ui-kit'
import { useFolders, useRecords } from '@tetherto/pearpass-lib-vault'

import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import { logger } from '../../utils/logger'

interface DeleteFolderModalContentV2Props {
  folderName: string
  count: number
  onClose: () => void
}

enum DeleteOption {
  DeleteFolder = 'deleteFolder',
  DeleteFolderAndItems = 'deleteFolderAndItems'
}

export const DeleteFolderModalContentV2 = ({
  folderName,
  count,
  onClose
}: DeleteFolderModalContentV2Props) => {
  const { closeModal } = useModal()
  const { state, navigate } = useRouter()
  const { deleteFolder, data: folderData } = useFolders()
  const { updateRecords } = useRecords()

  const [selected, setSelected] = useState<DeleteOption>(
    DeleteOption.DeleteFolderAndItems
  )
  const [isLoading, setIsLoading] = useState(false)

  const navigateAwayIfNeeded = () => {
    if ((state as { folder?: string } | undefined)?.folder === folderName) {
      navigate('vault', {
        params: {},
        state: { recordType: 'all' }
      } as {
        params: Record<string, unknown>
        state: { recordType: string; folder?: string }
      })
    }
  }

  const handleDelete = async () => {
    if (isLoading) return
    try {
      setIsLoading(true)
      if (selected === DeleteOption.DeleteFolder) {
        const folderRecords: Array<Record<string, unknown>> =
          folderData?.customFolders?.[folderName]?.records ?? []
        const realRecords = folderRecords.filter((r) => !!r.data && !!r.type)
        await updateRecords(realRecords.map((r) => ({ ...r, folder: null })))
      }
      await deleteFolder(folderName)
      navigateAwayIfNeeded()
      void closeModal()
    } catch (error) {
      logger.error(
        'DeleteFolderModalContentV2',
        'Error deleting folder:',
        error
      )
    } finally {
      setIsLoading(false)
    }
  }

  const options = [
    ...(!UNSUPPORTED
      ? [
          {
            value: DeleteOption.DeleteFolder,
            label: t`Delete Folder`,
            description: t`Only the folder will be removed. Your items will be moved to the All Folder list.`
          }
        ]
      : []),
    {
      value: DeleteOption.DeleteFolderAndItems,
      label: t`Delete folder and items`,
      description: t`This will permanently remove the folder and all ${count} items inside. This action cannot be undone.`
    }
  ]

  const isDeleteFolderOnlySelected =
    !UNSUPPORTED && selected === DeleteOption.DeleteFolder

  return (
    <Dialog
      title={t`Delete Folder`}
      onClose={onClose}
      testID="deletefolder-dialog-v2"
      closeButtonTestID="deletefolder-close-v2"
      footer={
        <div className="flex w-full justify-end gap-[var(--spacing8)]">
          <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={onClose}
            data-testid="deletefolder-discard-v2"
          >
            {t`Discard`}
          </Button>
          {isDeleteFolderOnlySelected ? (
            <Button
              variant="primary"
              size="small"
              type="button"
              isLoading={isLoading}
              onClick={() => {
                void handleDelete()
              }}
              data-testid="deletefolder-submit-v2"
            >
              {t`Delete Folder`}
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="small"
              type="button"
              isLoading={isLoading}
              onClick={() => {
                void handleDelete()
              }}
              data-testid="deletefolder-submit-v2"
            >
              {t`Delete Folder and Items`}
            </Button>
          )}
        </div>
      }
    >
      <Radio
        options={options}
        value={selected}
        onChange={(v) => setSelected(v as DeleteOption)}
        testID="deletefolder-options-v2"
      />
    </Dialog>
  )
}
