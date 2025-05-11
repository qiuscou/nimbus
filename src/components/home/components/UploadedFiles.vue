<script>
import { UPLOADED_FILES_CONSTANTS } from '../scripts/constants'
import heart_red from '@/assets/elements/heart_red.svg'

export default {
  name: 'UploadedFiles',
  props: {
    uploadedFiles: Array,
  },
  data() {
    return {
      uploadedFilesConstants: UPLOADED_FILES_CONSTANTS,
      editingIndex: null,
      heart_red,
    }
  },
  methods: {
    isImage(fileType) {
      return ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(fileType)
    },
    isDocument(fileType) {
      return ['application/pdf', 'text/plain', 'application/json', 'application/xml'].includes(
        fileType,
      )
    },
    isOfficeDocument(fileType) {
      return [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint',
      ].includes(fileType)
    },
    editFileName(index) {
      this.editingIndex = index
    },
    saveFileName() {
      this.editingIndex = null
    },
    readFileContent(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsText(file)
      })
    },
    openFile(file) {
      const fileURL = file.preview || URL.createObjectURL(file.file)
      window.open(fileURL, '_blank')
    },
    toggleFavorite(index) {
      const updatedFiles = [...this.uploadedFiles]
      updatedFiles[index].isFavorited = !updatedFiles[index].isFavorited
      this.$emit('update-files', updatedFiles)
    },
  },
}
</script>

<template>
  <div class="home-files-container">
    <slot name="actions"></slot>
    <div
      class="home-uploaded-files-wrapper"
      v-if="uploadedFiles.length"
      @dragover="$emit('drag-over', $event)"
      @dragleave="$emit('drag-leave', $event)"
      @drop.prevent="$emit('empty-area-drop', $event)"
    >
      <div
        v-for="(file, index) in uploadedFiles"
        :key="index"
        class="home-uploaded-file"
        draggable="true"
        @dragstart="$emit('file-drag-start', { event: $event, index })"
        @dragover.prevent="$emit('file-drag-over', { event: $event, index })"
        @dragleave="$emit('file-drag-leave', { event: $event, index })"
        @drop="$emit('file-drop', { event: $event, index })"
        @dblclick="openFile(file)"
      >
        <div class="home-uploaded-file-favorite" @click.stop="toggleFavorite(index)">
          <img :src="heart_red" class="heart-icon" :class="{ 'is-favorite': file.isFavorited }" />
        </div>
        <template v-if="isImage(file.type)">
          <img
            :src="file.preview || URL.createObjectURL(file)"
            class="home-uploaded-file-content preview"
            alt="File Content"
          />
        </template>
        <template v-else-if="isDocument(file.type)">
          <div class="home-uploaded-file-content preview">
            <pre>{{ file.content?.slice(0, 100) || 'No preview available' }}...</pre>
          </div>
        </template>
        <template v-else-if="isOfficeDocument(file.type)">
          <span class="home-uploaded-file-content preview">
            {{ file.name }}
          </span>
        </template>
        <template v-else>
          <span class="home-uploaded-file-content preview">{{
            uploadedFilesConstants.unable_to_display_content
          }}</span>
        </template>
        <span class="home-uploaded-file-name" @dblclick="editFileName(index)">
          <template v-if="editingIndex === index">
            <input
              v-model="file.name"
              @blur="saveFileName"
              @keyup.enter="saveFileName"
              class="file-name-input"
            />
          </template>
          <template v-else>
            {{ file.name }}
          </template>
        </span>
      </div>
    </div>
    <div
      v-else
      class="home-empty-state"
      @dragover="$emit('drag-over', $event)"
      @dragleave="$emit('drag-leave', $event)"
      @drop.prevent="$emit('empty-area-drop', $event)"
    >
      <p>{{ uploadedFilesConstants.empty_state }}</p>
    </div>
  </div>
</template>

<style src="../styles/moduleHome.css" scoped></style>
