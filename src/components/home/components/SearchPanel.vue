<template>
  <div class="home-panel-search">
    <div class="home-container-search">
      <img :src="magnifier" alt="search" class="home-icon" />
      <input
        type="text"
        :placeholder="searchPanelHomeData.search"
        :value="searchQuery"
        @input.lazy="handleSearchInput"
        class="home-input-search"
      />
      <div class="home-custom-select-wrapper">
        <select
          id="home-file-type"
          :value="selectedFileType"
          @change="handleTypeChange"
          class="home-custom-select"
        >
          <option value="" disabled hidden>
            {{ searchPanelHomeData.file_type }}
          </option>
          <option v-for="type in searchPanelHomeData.file_types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <img class="home-icon home-custom-select-chevron" :src="chevron_down" alt="chevron down" />
      </div>
      <button class="home-click" id="home-button-search">
        {{ searchPanelHomeData.button }}
      </button>
    </div>
  </div>
</template>

<script setup>
import magnifier from '@/assets/elements/magnifier.svg'
import chevron_down from '@/assets/elements/chevron_down.svg'
import { SEARCH_PANEL_CONSTANTS } from '../scripts/constants'

const props = defineProps({
  selectedFileType: {
    type: String,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:selectedFileType', 'update:searchQuery'])

const searchPanelHomeData = SEARCH_PANEL_CONSTANTS

function handleSearchInput(e) {
  emit('update:searchQuery', e.target.value)
}

function handleTypeChange(e) {
  emit('update:selectedFileType', e.target.value)
}
</script>

<style src="../styles/moduleHome.css" scoped></style>
