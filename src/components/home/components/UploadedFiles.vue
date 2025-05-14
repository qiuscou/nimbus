<script>
import { UPLOADED_FILES_CONSTANTS } from '../scripts/constants'
import heart_red from '@/assets/elements/heart_red.svg'
import heart_gray from '@/assets/elements/heart.svg'

export default {
  name: 'UploadedFiles',
  props: {
    uploadedFiles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      uploadedFilesConstants: UPLOADED_FILES_CONSTANTS,
      editingIndex: null,
      hoveredFile: null,
      heart_red,
      heart_gray,
      selectedFiles: new Set(),
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
        targetIndex: null,
      },
    }
  },
  methods: {
    handleLeftClick(event, index) {
      if (event.ctrlKey) {
        this.selectedFiles.has(index)
          ? this.selectedFiles.delete(index)
          : this.selectedFiles.add(index)
      } else if (event.shiftKey && this.selectedFiles.size > 0) {
        const last = Math.max(...this.selectedFiles)
        const start = Math.min(index, last)
        const end = Math.max(index, last)
        for (let i = start; i <= end; i++) this.selectedFiles.add(i)
      } else {
        this.selectedFiles = new Set([index])
      }
      this.$forceUpdate()
    },
    showContextMenu(event, index) {
      event.preventDefault()
      if (!this.selectedFiles.has(index)) {
        this.selectedFiles = new Set([index])
      }
      this.contextMenu = {
        visible: true,
        x: event.clientX,
        y: event.clientY,
        targetIndex: index,
      }
    },
    closeContextMenu() {
      this.contextMenu.visible = false
    },
    handleRename() {
      this.editingIndex = this.contextMenu.targetIndex
      this.closeContextMenu()
    },
    moveToTrash() {
      const updatedFiles = [...this.uploadedFiles]
      const indexes = Array.from(this.selectedFiles).sort((a, b) => b - a)
      indexes.forEach((i) => {
        const file = updatedFiles[i]
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
          console.log(`Revoked URL: ${file.preview}`)
        }
        updatedFiles[i].preview = null
        updatedFiles[i].isTrashed = true
      })
      this.$emit('update-files', updatedFiles)
      this.selectedFiles.clear()
      this.closeContextMenu()
    },
    async deletePermanently(index) {
      const updatedFiles = [...this.uploadedFiles]
      const file = updatedFiles[index]

      if (!file || !file.filename) {
        console.error('Файл отсутствует или не имеет имени:', file)
        return
      }

      const filename = encodeURIComponent(file.filename)

      if (file.preview) {
        URL.revokeObjectURL(file.preview)
        console.log(`Revoked URL: ${file.preview}`)
      }

      try {
        const response = await fetch(`http://localhost:3001/api/files/${filename}`, {
          method: 'DELETE',
        })

        if (response.status === 404) {
          console.warn(`Файл с именем ${file.filename} не найден на сервере.`)
          updatedFiles.splice(index, 1)
        } else if (!response.ok) {
          throw new Error(`Ошибка удаления: ${response.status}`)
        } else {
          console.log(`Файл ${file.filename} успешно удалён с сервера.`)
          updatedFiles.splice(index, 1)
        }

        this.$emit('update-files', updatedFiles)
      } catch (error) {
        console.error('Ошибка при удалении файла с сервера:', error)
      }
    },

    isImage(fileType) {
      return ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(fileType)
    },
    isDocument(fileType) {
      return ['application/pdf', 'text/plain', 'application/json', 'application/xml'].includes(
        fileType,
      )
    },
    async downloadFile(index) {
      const file = this.uploadedFiles[index]
      let blobSource

      if (file.url) {
        const res = await fetch(file.url, { credentials: 'include' })
        if (!res.ok) {
          console.error('Ошибка HTTP при скачивании:', res.status)
          this.closeContextMenu()
          return
        }
        blobSource = await res.blob()
      } else if (file.raw || file.file) {
        blobSource = file.raw || file.file
      } else {
        console.error('Нет ни url, ни объекта File для скачивания:', file)
        this.closeContextMenu()
        return
      }

      console.log('Тип blob:', blobSource.type, 'Размер:', blobSource.size)

      const href = URL.createObjectURL(blobSource)
      const link = document.createElement('a')
      link.href = href
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
      this.closeContextMenu()
    },
    restoreFromTrash(index) {
      const updatedFiles = [...this.uploadedFiles]
      updatedFiles[index].isTrashed = false
      this.$emit('update-files', updatedFiles)
      this.closeContextMenu()
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
  mounted() {
    document.addEventListener('click', this.closeContextMenu)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeContextMenu)
  },
}
</script>

<template>
  <div class="home-files-container">
    <div
      v-if="contextMenu.visible"
      class="context-menu"
      :style="{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }"
    >
      <button class="context-menu-item" @click="handleRename">Переименовать</button>
      <button class="context-menu-item" @click="downloadFile(contextMenu.targetIndex)">
        Скачать
      </button>
      <button class="context-menu-item" @click="moveToTrash">Переместить в корзину</button>
      <button
        v-if="uploadedFiles[contextMenu.targetIndex]?.isTrashed"
        class="context-menu-item"
        @click="restoreFromTrash(contextMenu.targetIndex)"
      >
        Восстановить
      </button>
      <button
        v-if="uploadedFiles[contextMenu.targetIndex]?.isTrashed"
        class="context-menu-item danger"
        @click="deletePermanently(contextMenu.targetIndex)"
      >
        Удалить
      </button>
    </div>

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
        :class="{ selected: selectedFiles.has(index) }"
        draggable="true"
        @click.left="handleLeftClick($event, index)"
        @contextmenu.prevent="showContextMenu($event, index)"
        @dragstart="$emit('file-drag-start', { event: $event, index })"
        @dragover.prevent="$emit('file-drag-over', { event: $event, index })"
        @dragleave="$emit('file-drag-leave', { event: $event, index })"
        @drop="$emit('file-drop', { event: $event, index })"
        @dblclick="openFile(file)"
        @mouseover="hoveredFile = index"
        @mouseleave="hoveredFile = null"
      >
        <div class="home-uploaded-file-favorite">
          <img
            v-if="file.isFavorited"
            :src="heart_red"
            class="heart-icon is-favorite"
            @click.stop="toggleFavorite(index)"
          />
          <img
            v-else-if="hoveredFile === index"
            :src="heart_gray"
            class="heart-icon"
            @click.stop="toggleFavorite(index)"
          />
        </div>
        <template v-if="isImage(file.type)">
          <img
            v-if="file.preview"
            :src="file.preview"
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
    <div v-else class="home-empty-state">
      <p>{{ uploadedFilesConstants.empty_state }}</p>
    </div>
  </div>
</template>

<style src="../styles/moduleHome.css" scoped></style>
