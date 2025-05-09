<script>
import { UPLOADED_FILES_CONSTANTS } from '../scripts/constants'

export default {
  name: 'UploadedFiles',
  props: {
    uploadedFiles: Array,
  },
  data() {
    return {
      uploadedFilesConstants: UPLOADED_FILES_CONSTANTS,
    }
  },
  methods: {
    isImage(fileType) {
      return ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(fileType)
    },
    isText(fileType) {
      return ['text/plain', 'application/json', 'application/xml'].includes(fileType)
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
    readFileContent(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsText(file)
      })
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
      >
        <div class="home-uploaded-file-handle"></div>
        <template v-if="isImage(file.type)">
          <img
            :src="file.preview || URL.createObjectURL(file)"
            class="home-uploaded-file-content preview"
            alt="File Content"
          />
        </template>
        <template v-else-if="isText(file.type)">
          <div class="home-uploaded-file-content preview">
            <pre>{{ file.content?.slice(0, 100) || 'No preview available' }}...</pre>
          </div>
        </template>
        <template v-else-if="isOfficeDocument(file.type)">
          <span class="home-uploaded-file-content preview">
            {{ file.name }} (Office Document)
          </span>
        </template>
        <template v-else>
          <span class="home-uploaded-file-content preview">Невозможно отобразить содержимое</span>
        </template>
        <span class="home-uploaded-file-name">{{ file.name }}</span>
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
