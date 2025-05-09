<template>
  <div>
    <SearchPanel
      :files="uploadedFiles"
      :searchQuery="searchQuery"
      :selectedFileType="selectedFileType"
      @update:searchQuery="searchQuery = $event"
      @update:selectedFileType="selectedFileType = $event"
      @search="handleFilteredFiles"
    />
    <div v-if="filteredFiles.length">
      <ul>
        <li v-for="file in filteredFiles" :key="file.name">
          {{ file.name }} ({{ file.type }})
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No files found</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SearchPanel from './components/SearchPanel.vue'

export default {
  components: { SearchPanel },
  setup() {
    const uploadedFiles = ref([
      { name: 'Document1.pdf', type: 'application/pdf' },
      { name: 'Image1.png', type: 'image/png' },
      { name: 'Audio1.mp3', type: 'audio/mpeg' },
    ])
    const searchQuery = ref('')
    const selectedFileType = ref('')
    const filteredFiles = ref([])

    const handleFilteredFiles = (files) => {
      filteredFiles.value = files
    }

    return {
      uploadedFiles,
      searchQuery,
      selectedFileType,
      filteredFiles,
      handleFilteredFiles,
    }
  },
}
</script>