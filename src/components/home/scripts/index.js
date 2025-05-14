import { ref, computed, watch, onMounted } from 'vue'
import { useNavigation } from './useNavigation'
import { useFileUpload } from './useFileUpload'
import { useDragAndDrop } from './useDragAndDrop'
import { useFileActions } from './useFileActions'
import { formatFileSize, getFileIcon } from './useFileUtils'
import { FILE_TYPE_MAPPING } from './constants'

export function useHome() {
  const { isHomePage, goToNewPage, goToTariff, openFileDialog } = useNavigation()
  const { uploadedFiles, loadFilesFromServer, uploadToServer } = useFileUpload()
  const drag = useDragAndDrop(uploadToServer, uploadedFiles)
  const { deleteFile, restoreFiles, toggleFavorite } = useFileActions(loadFilesFromServer)

  const activeButton = ref('all_files')
  const selectedFileType = ref('')
  const searchTerm = ref('')

  onMounted(() => {
    const saved = localStorage.getItem('activeButton')
    if (saved) {
      activeButton.value = saved
    }
  })

  const filteredFiles = computed(() => {
    let files = uploadedFiles.value.filter((f) => {
      if (searchTerm.value && !f.name.toLowerCase().includes(searchTerm.value.toLowerCase())) {
        return false
      }

      if (activeButton.value === 'favorites' && !f.isFavorited) {
        return false
      }

      if (f.isTrashed && activeButton.value !== 'trash') {
        return false
      }

      if (activeButton.value === 'trash' && !f.isTrashed) {
        return false
      }

      if (activeButton.value === 'gallery') {
        const allowed = FILE_TYPE_MAPPING[selectedFileType.value] || []
        if (selectedFileType.value && !allowed.includes(f.type.toLowerCase())) {
          return false
        }
      }

      return true
    })

    files.sort((a, b) => {
      const typeCmp = a.type.localeCompare(b.type)
      return typeCmp !== 0 ? typeCmp : a.name.localeCompare(b.name)
    })

    return files
  })

  watch(activeButton, (newBtn) => {
    localStorage.setItem('activeButton', newBtn)
    if (newBtn !== 'gallery') {
      selectedFileType.value = ''
    }
  })

  watch(selectedFileType, (newType) => {
    if (newType && activeButton.value === 'gallery') {
      activeButton.value = ''
    }
  })

  watch(searchTerm, (term) => {
    if (term && activeButton.value !== '') {
      activeButton.value = ''
    }
  })

  return {
    activeButton,
    selectedFileType,
    searchTerm,
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
    drag,
  }
}
