<template>
  <div
    class="home-panel-storage"
    :class="{ dragover: isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onEmptyAreaDrop"
  >
    <BlueActions @open-file-dialog="onOpenFileDialog" />

    <UploadedFiles
      :uploadedFiles="uploadedFiles"
      @update-files="onUpdateFiles"
      @file-selected="onFileSelected"
      @drag-over="onDragOver"
      @drag-leave="onDragLeave"
      @empty-area-drop="onEmptyAreaDrop"
      @file-drag-start="onFileDragStart"
      @file-drag-over="onFileDragOver"
      @file-drag-leave="onFileDragLeave"
      @file-drop="onFileDrop"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import BlueActions from './BlueActions.vue'
import UploadedFiles from './UploadedFiles.vue'

const props = defineProps({
  uploadedFiles: {
    type: Array,
    required: true,
  },
  isDragging: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'drag-over',
  'drag-leave',
  'empty-area-drop',
  'open-file-dialog',
  'update-files',
  'file-selected',
  'file-drag-start',
  'file-drag-over',
  'file-drag-leave',
  'file-drop',
])

function onDragOver(event) {
  emit('drag-over', event)
}
function onDragLeave(event) {
  emit('drag-leave', event)
}
function onEmptyAreaDrop(event) {
  emit('empty-area-drop', event)
}
function onOpenFileDialog() {
  emit('open-file-dialog')
}
function onUpdateFiles(files) {
  emit('update-files', files)
}
function onFileSelected(file) {
  emit('file-selected', file)
}
function onFileDragStart(event) {
  emit('file-drag-start', event)
}
function onFileDragOver(event) {
  emit('file-drag-over', event)
}
function onFileDragLeave(event) {
  emit('file-drag-leave', event)
}
function onFileDrop(event) {
  emit('file-drop', event)
}
</script>

<style src="../styles/moduleHome.css" scoped></style>
