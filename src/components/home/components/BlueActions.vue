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
        saveAs(blob, 'example.docx')
      })
    },
    createExcelFile() {
      const worksheet = XLSX.utils.json_to_sheet([{ A: 'Hello', B: 'Excel' }])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Лист 1')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
      saveAs(blob, 'example.xlsx')
    },
    createPowerPointFile() {
      const pptx = new PptxGenJS()
      const slide = pptx.addSlide()
      slide.addText('Привет, это слайд PowerPoint!', { x: 1, y: 1, fontSize: 18 })
      pptx.writeFile('example.pptx')
    },
    handleCreateButtonClick() {
      this.createWordFile()
      this.createExcelFile()
      this.createPowerPointFile()
    },
  },
}
</script>

<template>
  <div class="home-blue-buttons-container">
    <div class="home-blue-button" id="home-download-button" @click="$emit('open-file-dialog')">
      <img :src="cloud_upload" alt="download" class="home-icon" />
    </div>
    <div class="home-blue-button" id="home-create-button" @click="handleCreateButtonClick">
      <img :src="add_plus_circle" alt="create" class="home-icon" />
    </div>
    <div class="home-blue-button" id="home-share-button">
      <img :src="external_link" alt="share" class="home-icon" />
    </div>
  </div>
</template>

<style src="../styles/moduleHome.css" scoped></style>
