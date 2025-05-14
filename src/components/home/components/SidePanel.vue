<script setup>
import logo from '@/assets/logo/logo.svg'
import chevron_right from '@/assets/elements/chevron_right.svg'
import image from '@/assets/elements/image.svg'
import heart from '@/assets/elements/heart.svg'
import clock from '@/assets/elements/clock.svg'
import trash_empty from '@/assets/elements/trash_empty.svg'
import user_circle from '@/assets/elements/user_circle.svg'
import headphones from '@/assets/elements/headphones.svg'
import data from '@/assets/elements/data.svg'
import { SIDE_PANEL_CONSTANTS, SEARCH_PANEL_CONSTANTS } from '../scripts/constants'

const props = defineProps({
  activeButton: {
    type: String,
    required: true,
  },
})

const emit = defineEmits([
  'update:activeButton',
  'update:selectedFileType',
  'update:searchQuery',
  'go-to-new-page',
  'go-to-tariff',
])

const icons = {
  chevron_right,
  image,
  heart,
  clock,
  trash_empty,
  user_circle,
  headphones,
  data,
}
const labels = SIDE_PANEL_CONSTANTS

function handleButtonClick(button) {
  // при смене категории сбрасываем поиск
  emit('update:searchQuery', '')
  if (button === 'gallery') {
    // Галерея = только изображения
    emit('update:selectedFileType', SEARCH_PANEL_CONSTANTS.file_types[0] || '')
  } else {
    // остальные категории — сброс фильтра по типу
    emit('update:selectedFileType', '')
  }
  emit('update:activeButton', button)
}

function goToNewPage(page) {
  emit('go-to-new-page', page)
}

function goToTariff() {
  emit('go-to-tariff')
}
</script>

<template>
  <div class="home-panel-left">
    <div class="home-panel-data">
      <img :src="logo" alt="logo" class="home-logo" />
    </div>
    <div class="home-panel-stack">
      <div class="home-container-cloud">
        <div class="home-container-buttons">
          <button
            id="home-button-all-files"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'all_files' }"
            @click="handleButtonClick('all_files')"
          >
            <img :src="icons.chevron_right" alt="all files" class="home-icon" />
            <span>{{ labels.all_files }}</span>
          </button>
        </div>

        <div class="home-container-buttons">
          <button
            id="home-button-gallery"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'gallery' }"
            @click="handleButtonClick('gallery')"
          >
            <img :src="icons.image" alt="gallery" class="home-icon" />
            <span>{{ labels.gallery }}</span>
          </button>
        </div>

        <div class="home-container-buttons">
          <button
            id="home-button-favorites"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'favorites' }"
            @click="handleButtonClick('favorites')"
          >
            <img :src="icons.heart" alt="favorites" class="home-icon" />
            <span>{{ labels.favorites }}</span>
          </button>
        </div>

        <div class="home-container-buttons">
          <button
            id="home-button-recents"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'recents' }"
            @click="handleButtonClick('recents')"
          >
            <img :src="icons.clock" alt="recents" class="home-icon" />
            <span>{{ labels.recents }}</span>
          </button>
        </div>

        <div class="home-container-buttons">
          <button
            id="home-button-trash"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'trash' }"
            @click="handleButtonClick('trash')"
          >
            <img :src="icons.trash_empty" alt="trash" class="home-icon" />
            <span>{{ labels.trash }}</span>
          </button>
        </div>
      </div>

      <div class="home-divider"></div>

      <div class="home-panel-user">
        <div class="home-container-buttons">
          <button
            id="home-button-account"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'account' }"
            @click="goToNewPage('Account')"
          >
            <img :src="icons.user_circle" alt="account" class="home-icon" />
            <span>{{ labels.account }}</span>
          </button>
        </div>
        <div class="home-container-buttons">
          <button
            id="home-button-help"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'help' }"
            @click="goToNewPage('Help')"
          >
            <img :src="icons.headphones" alt="help" class="home-icon" />
            <span>{{ labels.help }}</span>
          </button>
        </div>
        <div class="home-container-buttons">
          <button
            id="home-button-tariff"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'tariff' }"
            @click="goToTariff"
          >
            <img :src="icons.data" alt="tariff" class="home-icon" />
            <span>{{ labels.tariff }}</span>
          </button>
        </div>
      </div>
      <div class="home-divider"></div>
    </div>
  </div>
</template>

<style scoped src="../styles/moduleHome.css"></style>
