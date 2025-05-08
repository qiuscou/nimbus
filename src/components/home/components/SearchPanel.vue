<script>
import magnifier from '@/assets/elements/magnifier.svg'
import chevron_down from '@/assets/elements/chevron_down.svg'

export default {
  name: 'SearchPanel',
  props: {
    selectedFileType: String,
  },
  data() {
    return {
      magnifier,
      chevron_down,
      searchPanelHomeData: {
        search: 'Поиск по облаку',
        button: 'Найти',
        file_type: 'Тип файла',
        file_types: ['Изображения', 'Документы', 'Музыка', 'Видео', 'Папки', 'Архивы'],
      },
    }
  },
}
</script>

<template>
  <div class="home-panel-search">
    <div class="home-container-search">
      <img :src="magnifier" alt="search" class="home-icon" />
      <input type="text" :placeholder="searchPanelHomeData.search" class="home-input-search" />
      <div class="home-custom-select-wrapper">
        <select
          id="home-file-type"
          :value="selectedFileType"
          @change="$emit('update:selectedFileType', $event.target.value)"
        >
          <option value="" disabled hidden>{{ searchPanelHomeData.file_type }}</option>
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

<style src="../styles/moduleHome.css" scoped></style>
