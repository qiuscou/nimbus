<script>
import SidePanel from './SidePanel.vue'
import SearchPanel from './SearchPanel.vue'
import FileUploader from './FileUploader.vue'
import { useHome } from '../scripts/useHome'

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
    } = useHome()

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
      handleEmptyAreaDrop,
      getFileIcon,
      formatFileSize,
    }
  },
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
        @update:selectedFileType="selectedFileType = $event"
      />

      <FileUploader
        :uploadedFiles="uploadedFiles"
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
