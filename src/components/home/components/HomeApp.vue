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
        @empty-area-drop="handleEmptyAreaDrop"
        @file-drag-start="handleFileDragStart"
        @file-drag-over="handleFileDragOver"
        @file-drag-leave="handleFileDragLeave"
        @file-drop="handleFileDrop"
        @open-file-dialog="openFileDialog"
        @update-files="handleFilesUpdate"
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

<script>
import { ref, computed, watch } from 'vue'
import SidePanel from './SidePanel.vue'
import SearchPanel from './SearchPanel.vue'
import FileUploader from './FileUploader.vue'
import { useHome } from '../scripts/useHome'
import { FILE_TYPE_MAPPING } from '../scripts/constants'

export default {
  name: 'HomeApp',
  components: {
    SidePanel,
    SearchPanel,
    FileUploader,
  },
  setup() {
    const {
      activeButton,
      selectedFileType,
      isHomePage,
      goToNewPage,
      goToTariff,
      openFileDialog: openFileDialogFromHook,
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
      handleEmptyAreaDrop,
      getFileIcon,
      formatFileSize,
    } = useHome()

    const fileInput = ref(null)
    const searchQuery = ref('')

    watch(activeButton, (newVal) => {
      if (newVal === 'gallery') selectedFileType.value = ''
    })

    watch(selectedFileType, (newVal) => {
      if (newVal) activeButton.value = ''
    })

    const filteredFiles = computed(() => {
      return uploadedFiles.value.filter((file) => {
        const nameMatch = file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        let typeMatch = true

        if (activeButton.value === 'gallery') {
          const galleryTypes = [...FILE_TYPE_MAPPING['Изображения'], ...FILE_TYPE_MAPPING['Видео']]
          typeMatch = galleryTypes.includes(file.type)
        } else if (selectedFileType.value) {
          typeMatch = FILE_TYPE_MAPPING[selectedFileType.value]?.includes(file.type)
        }

        let favoriteMatch = true
        if (activeButton.value === 'favorites') {
          favoriteMatch = file.isFavorited === true
        }

        return nameMatch && typeMatch && favoriteMatch
      })
    })

    const openFileDialog = () => {
      if (fileInput.value) fileInput.value.click()
      openFileDialogFromHook()
    }

    const handleFilesUpdate = (newFiles) => {
      uploadedFiles.value = newFiles
    }

    return {
      activeButton,
      selectedFileType,
      searchQuery,
      filteredFiles,
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
      handleEmptyAreaDrop,
      getFileIcon,
      formatFileSize,
      fileInput,
      handleFilesUpdate,
    }
  },
}
</script>

<style src="../styles/moduleHome.css" scoped></style>
