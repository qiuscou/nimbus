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
}
</script>

<template>
  <div
    class="home-files-container"
    @dragover="$emit('drag-over', $event)"
    @dragleave="$emit('drag-leave', $event)"
    @drop.prevent="$emit('empty-area-drop', $event)"
  >
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
        <img
          v-if="file.preview"
          :src="file.preview"
          class="home-uploaded-file-icon"
          alt="File Preview"
        />
        <img
          v-else
          :src="$parent.getFileIcon(file.type)"
          class="home-uploaded-file-icon"
          alt="File Icon"
        />
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
