import { ref, computed, watch } from 'vue'
import { useNavigation } from './useNavigation'
import { useFileUpload } from './useFileUpload'
import { useDragAndDrop } from './useDragAndDrop'
import { useFileActions } from './useFileActions'
import { formatFileSize, getFileIcon } from './useFileUtils'

export function useHome() {
  const { isHomePage, goToNewPage, goToTariff, openFileDialog } = useNavigation()
  const { uploadedFiles, loadFilesFromServer, uploadToServer } = useFileUpload()
  const drag = useDragAndDrop(uploadToServer, uploadedFiles)
  const { deleteFile, restoreFiles, toggleFavorite } = useFileActions(loadFilesFromServer)

  const activeButton = ref('all_files')
  const selectedFileType = ref('')

  const filteredFiles = computed(() =>
    uploadedFiles.value.filter((f) => {
      if (activeButton.value === 'trash') return f.isTrashed
      if (activeButton.value === 'favorites') return f.isFavorited && !f.isTrashed
      return !f.isTrashed
    }),
  )

  watch(activeButton, (v) => {
    if (v !== 'gallery') selectedFileType.value = ''
  })
  watch(selectedFileType, (v) => {
    if (v) activeButton.value = ''
  })

  return {
    activeButton,
    selectedFileType,
    isHomePage,
    goToNewPage,
    goToTariff,
    openFileDialog,
    uploadedFiles,
    filteredFiles,
    formatFileSize,
    getFileIcon,
    deleteFile,
    restoreFiles,
    toggleFavorite,
    ...drag,
  }
}
