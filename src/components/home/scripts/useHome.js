import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import image from '@/assets/elements/image.svg'
import data from '@/assets/elements/data.svg'
import headphones from '@/assets/elements/headphones.svg'

export function useHome() {
  const router = useRouter()

  const activeButton = ref('all_files')
  const selectedFileType = ref('')
  const isHomePage = ref(router.currentRoute.value.path === '/')
  const uploadedFiles = ref([])
  const isDragging = ref(false)

  const goToNewPage = (page) => {
    router.push({ name: page })
  }

  const goToTariff = () => {
    router.push('/').then(() => {
      const tariffSection = document.getElementById('app-tariff')
      if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  const openFileDialog = () => {
    const fileInput = document.querySelector('input[type="file"]')
    fileInput?.click()
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      const newFiles = files.map((file) => {
        const fileData = {
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          isFavorited: false,
          isTrashed: false,
        }

        if (file.type.startsWith('image/')) {
          fileData.preview = URL.createObjectURL(file)
        }

        return fileData
      })
      uploadedFiles.value = [...uploadedFiles.value, ...newFiles]
    }
    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    isDragging.value = false

    const items = event.dataTransfer.items
    const files = []

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file) {
          const fileData = {
            file,
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            isFavorited: false,
            isTrashed: false,
          }

          if (file.type.startsWith('image/')) {
            fileData.preview = URL.createObjectURL(file)
          }

          files.push(fileData)
        }
      }
    }

    if (files.length > 0) {
      uploadedFiles.value = [...uploadedFiles.value, ...files]
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
    isDragging.value = true
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy'
    }
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    event.stopPropagation()
    isDragging.value = false
  }

  const handleFileDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index)
    event.currentTarget.classList.add('dragging')
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleFileDragOver = (event, index) => {
    event.preventDefault()
    event.currentTarget.classList.add('dragover')
    event.dataTransfer.dropEffect = 'move'
  }

  const handleFileDragLeave = (event, index) => {
    event.currentTarget.classList.remove('dragover')
  }

  const handleFileDrop = (event, targetIndex) => {
    event.preventDefault()
    event.currentTarget.classList.remove('dragover')

    const sourceIndex = event.dataTransfer.getData('text/plain')
    if (sourceIndex !== '') {
      const files = [...uploadedFiles.value]
      const [movedFile] = files.splice(sourceIndex, 1)

      if (typeof targetIndex === 'undefined' || targetIndex === null) {
        files.push(movedFile)
      } else {
        files.splice(targetIndex, 0, movedFile)
      }

      uploadedFiles.value = files
    } else {
      const items = event.dataTransfer.items
      const newFiles = []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) {
            const fileData = {
              file,
              name: file.name,
              type: file.type,
              size: file.size,
              lastModified: file.lastModified,
              isFavorited: false,
              isTrashed: false,
            }

            if (file.type.startsWith('image/')) {
              fileData.preview = URL.createObjectURL(file)
            }

            newFiles.push(fileData)
          }
        }
      }

      if (newFiles.length > 0) {
        if (typeof targetIndex === 'number') {
          uploadedFiles.value.splice(targetIndex, 0, ...newFiles)
        } else {
          uploadedFiles.value = [...uploadedFiles.value, ...newFiles]
        }
      }
    }
  }

  const handleEmptyAreaDrop = (event) => {
    handleDrop(event)
  }

  const getFileIcon = (fileType) => {
    const icons = {
      'image/': image,
      'application/pdf': data,
      'application/msword': data,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': data,
      'text/': data,
      'audio/': headphones,
      'video/': data,
      'application/zip': data,
      'application/x-rar-compressed': data,
      'application/x-7z-compressed': data,
    }

    if (!fileType) return data

    for (const [prefix, icon] of Object.entries(icons)) {
      if (fileType.startsWith(prefix)) return icon
    }

    return data
  }

  const filteredFiles = computed(() => {
    return uploadedFiles.value.filter((file) => {
      return activeButton.value === 'trash' ? file.isTrashed : !file.isTrashed
    })
  })

  watch(router.currentRoute, (to) => {
    isHomePage.value = to.path === '/'
  })

  watch(activeButton, (newVal) => {
    if (newVal !== 'gallery') selectedFileType.value = ''
  })

  watch(selectedFileType, (newVal) => {
    if (newVal) activeButton.value = ''
  })

  return {
    activeButton,
    selectedFileType,
    isHomePage,
    goToNewPage,
    goToTariff,
    openFileDialog,
    handleFileSelection,
    uploadedFiles,
    isDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileDragStart,
    handleFileDragOver,
    handleFileDragLeave,
    handleFileDrop,
    getFileIcon,
    formatFileSize,
    handleEmptyAreaDrop,
    filteredFiles,
  }
}
