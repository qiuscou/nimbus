<script>
import cloud_upload from '@/assets/elements/cloud_upload.svg'
import add_plus_circle from '@/assets/elements/add_plus_circle.svg'
import external_link from '@/assets/elements/external_link.svg'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph } from 'docx'
import * as XLSX from 'xlsx'
import PptxGenJS from 'pptxgenjs'

export default {
  name: 'BlueActions',
  data() {
    return {
      cloud_upload,
      add_plus_circle,
      external_link,
      selectedFormat: 'word',
      formats: [
        { value: 'word', label: 'Word' },
        { value: 'excel', label: 'Excel' },
        { value: 'powerpoint', label: 'PowerPoint' },
      ],
      isFormatSelectorVisible: false, // Добавлено
    }
  },
  methods: {
    createWordFile() {
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
    },
    createExcelFile() {
      const worksheet = XLSX.utils.json_to_sheet([{ A: 'Привет', B: 'Excel!' }])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Лист 1')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
      saveAs(blob, 'Excel.xlsx')
    },
    createPowerPointFile() {
      const pptx = new PptxGenJS()
      const slide = pptx.addSlide()
      slide.addText('Привет, это слайд PowerPoint!', { x: 1, y: 1, fontSize: 18 })
      pptx.writeFile('PowerPoint.pptx')
    },
    toggleFormatSelector() {
      this.isFormatSelectorVisible = !this.isFormatSelectorVisible
    },
    handleCreateButtonClick() {
      if (!this.isFormatSelectorVisible) {
        this.toggleFormatSelector()
        return
      }
      if (this.selectedFormat === 'word') {
        this.createWordFile()
      } else if (this.selectedFormat === 'excel') {
        this.createExcelFile()
      } else if (this.selectedFormat === 'powerpoint') {
        this.createPowerPointFile()
      }
    },
  },
}
</script>

<template>
  <div
    class="home-blue-buttons-container"
    :style="{
      width: isFormatSelectorVisible
        ? `calc(8.5rem + ${Math.max(...formats.map((f) => f.label.length)) * 1.035}rem)`
        : '8.5rem',
    }"
  >
    <div class="home-blue-button" id="home-download-button" @click="$emit('open-file-dialog')">
      <img :src="cloud_upload" alt="download" class="home-icon" />
    </div>

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

<style src="../styles/moduleHome.css" scoped></style>
