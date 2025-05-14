import { ref } from 'vue'
import { createFileData } from './useFileUtils'

export function useDragAndDrop(uploadToServer, uploadedFiles) {
  const isDragging = ref(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    isDragging.value = true
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    isDragging.value = false
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    isDragging.value = false
    const items = Array.from(e.dataTransfer.items)

    // Получаем настоящие File объекты
    const files = items
      .filter((i) => i.kind === 'file')
      .map((i) => i.getAsFile())
      .map((file) => createFileData(file)) // Передаем File в createFileData

    if (files.length) {
      uploadedFiles.value.push(...files)
      await uploadToServer(files)
    }
  }

  const handleFileDragStart = (e, idx) => {
    e.dataTransfer.setData('text/plain', idx)
    e.currentTarget.classList.add('dragging')
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleFileDragOver = (e, idx) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
    e.dataTransfer.dropEffect = 'move'
  }
  const handleFileDragLeave = (e, idx) => e.currentTarget.classList.remove('dragover')

  const handleFileDrop = async (e, targetIndex) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const srcIndex = e.dataTransfer.getData('text/plain')
    if (srcIndex !== '') {
      const list = [...uploadedFiles.value]
      const [m] = list.splice(srcIndex, 1)
      list.splice(targetIndex ?? list.length, 0, m)
      uploadedFiles.value = list
      await uploadToServer(list) // Добавлено обновление на сервере
    } else {
      await handleDrop(e)
    }
  }

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileDragStart,
    handleFileDragOver,
    handleFileDragLeave,
    handleFileDrop,
  }
}
