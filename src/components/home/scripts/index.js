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

  onMounted(async () => {
    const savedCategory = localStorage.getItem('activeButton')
    if (savedCategory) activeButton.value = savedCategory

    await loadFilesFromServer()

    const savedStates = JSON.parse(localStorage.getItem('fileStates') || '{}')
    uploadedFiles.value.forEach((f) => {
      if (savedStates[f.filename]) {
        f.isFavorited = savedStates[f.filename].isFavorited
        f.isTrashed = savedStates[f.filename].isTrashed
      }
    })
  })

  const filteredFiles = computed(() => {
    const btn = activeButton.value
    // если пришла русская метка — переводим в ключ
    const key = PANEL_KEYS.includes(btn) ? btn : LABEL_TO_KEY[btn]

    return uploadedFiles.value.filter((f) => {
      // 1) поиск
      if (searchTerm.value && !f.name.toLowerCase().includes(searchTerm.value.toLowerCase())) {
        return false
      }

      // 2) фильтруем по категории
      switch (key) {
        case 'favorites':
          return f.isFavorited && !f.isTrashed

        case 'trash':
          return f.isTrashed

        case 'gallery':
          if (selectedFileType.value) {
            const allowed = FILE_TYPE_MAPPING[selectedFileType.value] || []
            return allowed.includes(f.type.toLowerCase()) && !f.isTrashed
          }
          return f.type.startsWith('image/') && !f.isTrashed

        default:
          return !f.isTrashed // фильтруем по файлам, которые не в корзине
      }
    })
  })

  watch(activeButton, (newBtn) => {
    localStorage.setItem('activeButton', newBtn)
    if (newBtn !== 'gallery') selectedFileType.value = ''
  })

  watch(selectedFileType, (newType) => {
    if (newType && activeButton.value === 'gallery') {
      activeButton.value = ''
    }
  })

  watch(
    uploadedFiles,
    (files) => {
      const states = files.reduce((acc, f) => {
        acc[f.filename] = { isFavorited: f.isFavorited, isTrashed: f.isTrashed }
        return acc
      }, {})
      localStorage.setItem('fileStates', JSON.stringify(states))
    },
    { deep: true },
  )

  watch(searchTerm, (term) => {
    const shouldReset = ['all_files', 'gallery', 'recents'].includes(activeButton.value)

    if (term && shouldReset) {
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
