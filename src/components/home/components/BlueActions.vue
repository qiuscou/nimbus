<template>
  <div
    class="home-blue-buttons-container"
    :style="{
      width: isFormatSelectorVisible
        ? `calc(8.5rem + ${Math.max(...formats.map((f) => f.label.length)) * 1.035}rem)`
        : '8.5rem',
    }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    :class="{ dragging: isDragging }"
  >
    <div class="home-blue-button" id="home-download-button" @click="openFileDialog">
      <img :src="cloud_upload" alt="upload" class="home-icon" />
    </div>
    <input type="file" multiple @change="handleFileInput" style="display: none" />

    <div class="home-blue-button" id="home-create-button" @click="handleCreateButtonClick">
      <img :src="add_plus_circle" alt="create" class="home-icon" />
    </div>

    <select v-if="isFormatSelectorVisible" v-model="selectedFormat" class="format-selector">
      <option v-for="format in formats" :key="format.value" :value="format.value">
        {{ format.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import cloud_upload from '@/assets/elements/cloud_upload.svg'
import add_plus_circle from '@/assets/elements/add_plus_circle.svg'

import { useNavigation } from '../scripts/useNavigation'

import { useFileUpload } from '../scripts/useFileUpload'

import { useDragAndDrop } from '../scripts/useDragAndDrop'

import { createFileData } from '../scripts/useFileUtils'

import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph } from 'docx'
import * as XLSX from 'xlsx'
import PptxGenJS from 'pptxgenjs'

const { openFileDialog, goToTariff } = useNavigation()

const { uploadedFiles, loadFilesFromServer, uploadToServer } = useFileUpload()

const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop(
  uploadToServer,
  uploadedFiles,
)

const selectedFormat = ref('word')
const formats = ref([
  { value: 'word', label: 'Word' },
  { value: 'excel', label: 'Excel' },
  { value: 'powerpoint', label: 'PowerPoint' },
])
const isFormatSelectorVisible = ref(false)

function toggleFormatSelector() {
  isFormatSelectorVisible.value = !isFormatSelectorVisible.value
}

function handleCreateButtonClick() {
  if (!isFormatSelectorVisible.value) {
    toggleFormatSelector()
    return
  }
  if (selectedFormat.value === 'word') {
    createWordFile()
  } else if (selectedFormat.value === 'excel') {
    createExcelFile()
  } else if (selectedFormat.value === 'powerpoint') {
    createPowerPointFile()
  }
}

function createWordFile() {
  const doc = new Document({
    sections: [
      {
        children: [new Paragraph('Привет, это документ Word!')],
      },
    ],
  })
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, 'Word.docx')
  })
}

function createExcelFile() {
  const worksheet = XLSX.utils.json_to_sheet([{ A: 'Привет', B: 'Excel!' }])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Лист 1')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, 'Excel.xlsx')
}

function createPowerPointFile() {
  const pptx = new PptxGenJS()
  const slide = pptx.addSlide()
  slide.addText('Привет, это слайд PowerPoint!', {
    x: 1,
    y: 1,
    fontSize: 18,
  })

  pptx.writeFile({ fileName: 'PowerPoint.pptx' })
}

async function handleFileInput(event) {
  const files = Array.from(event.target.files).map((file) => createFileData(file))
  uploadedFiles.value.push(...files)
  await uploadToServer(files)
}
</script>

<style src="../styles/moduleHome.css" scoped></style>
