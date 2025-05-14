<script setup>
import { ref, computed, watch } from 'vue'
import SidePanel from './SidePanel.vue'
import SearchPanel from './SearchPanel.vue'
import FileUploader from './FileUploader.vue'

import { useNavigation } from '../scripts/useNavigation'
import { useFileUpload } from '../scripts/useFileUpload'
import { useDragAndDrop } from '../scripts/useDragAndDrop'
import { useFileActions } from '../scripts/useFileActions'
import { createFileData, formatFileSize, getFileIcon } from '../scripts/useFileUtils'
import { FILE_TYPE_MAPPING } from '../scripts/constants'

const { isHomePage, goToNewPage, goToTariff, openFileDialog } = useNavigation()

const { uploadedFiles, loadFilesFromServer, uploadToServer } = useFileUpload()

const {
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileDragStart,
  handleFileDragOver,
  handleFileDragLeave,
  handleFileDrop,
} = useDragAndDrop(uploadToServer, uploadedFiles)

const { deleteFile, restoreFiles, toggleFavorite } = useFileActions(loadFilesFromServer)

const activeButton = ref('all_files')
const selectedFileType = ref('')
const searchQuery = ref('')
const fileInput = ref(null)
const selectedFile = ref(null)

watch(activeButton, (val) => {
  if (val === 'gallery') selectedFileType.value = ''
})
watch(selectedFileType, (val) => {
  if (val) activeButton.value = ''
})

const filteredFiles = computed(() => {
  const galleryTypes = [...FILE_TYPE_MAPPING['Изображения'], ...FILE_TYPE_MAPPING['Видео']]
  return uploadedFiles.value.filter((file) => {
    let typeMatch = true
    if (activeButton.value === 'gallery') {
      typeMatch = galleryTypes.includes(file.type)
    } else if (selectedFileType.value) {
      typeMatch = FILE_TYPE_MAPPING[selectedFileType.value]?.includes(file.type)
    }
    return typeMatch
  })
})

function onOpenFileDialog() {
  if (fileInput.value) fileInput.value.click()
  openFileDialog()
}

async function handleFileSelection(eOrFile) {
  if (eOrFile?.target && eOrFile.target.files) {
    const files = Array.from(eOrFile.target.files).map((f) => createFileData(f))
    uploadedFiles.value.push(...files)
    await uploadToServer(files)
  } else {
    selectedFile.value = eOrFile
  }
}

function onFilesUpdate(files) {
  uploadedFiles.value = files
}
</script>

<template>
  <div class="home-wrapper">
    <SidePanel
      :activeButton="activeButton"
      @update:activeButton="activeButton = $event"
      @go-to-new-page="goToNewPage"
      @go-to-tariff="goToTariff"
    />

    <div class="home-panel-right">
      <SearchPanel
        :selectedFileType="selectedFileType"
        :searchQuery="searchQuery"
        @update:selectedFileType="selectedFileType = $event"
        @update:searchQuery="searchQuery = $event"
      />

      <FileUploader
        :uploadedFiles="filteredFiles"
        :isDragging="isDragging"
        @file-selected="handleFileSelection"
        @drag-over="handleDragOver"
        @drag-leave="handleDragLeave"
        @empty-area-drop="handleDrop"
        @file-drag-start="handleFileDragStart"
        @file-drag-over="handleFileDragOver"
        @file-drag-leave="handleFileDragLeave"
        @file-drop="handleFileDrop"
        @open-file-dialog="onOpenFileDialog"
        @update-files="onFilesUpdate"
      />
    </div>

    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileSelection"
      multiple
    />
  </div>
</template>

<style src="../styles/moduleHome.css" scoped></style>
