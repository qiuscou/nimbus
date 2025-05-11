<script>
import BlueActions from './BlueActions.vue'
import UploadedFiles from './UploadedFiles.vue'

export default {
  name: 'FileUploader',
  components: {
    BlueActions,
    UploadedFiles,
  },
  props: {
    uploadedFiles: Array,
    isDragging: Boolean,
  },
}
</script>

<template>
  <div
    class="home-panel-storage"
    :class="{ dragover: isDragging }"
    @dragover="$emit('drag-over', $event)"
    @dragleave="$emit('drag-leave', $event)"
    @drop.prevent="$emit('empty-area-drop', $event)"
  >
    <BlueActions @open-file-dialog="$emit('open-file-dialog')" />

    <UploadedFiles
      :uploadedFiles="uploadedFiles"
      @update-files="$emit('update-files', $event)"
      @file-selected="$emit('file-selected', $event)"
      @drag-over="$emit('drag-over', $event)"
      @drag-leave="$emit('drag-leave', $event)"
      @empty-area-drop="$emit('empty-area-drop', $event)"
      @file-drag-start="$emit('file-drag-start', $event)"
      @file-drag-over="$emit('file-drag-over', $event)"
      @file-drag-leave="$emit('file-drag-leave', $event)"
      @file-drop="$emit('file-drop', $event)"
    />
  </div>
</template>

<style src="../styles/moduleHome.css" scoped></style>
