<!-- eslint-disable vue/multi-word-component-names -->
<script>
import logo from '@/assets/logo/logo.svg'
import magnifier from '@/assets/elements/magnifier.svg'
import chevron_down from '@/assets/elements/chevron_down.svg'
import chrervon_right from '@/assets/elements/chevron_right.svg'
import image from '@/assets/elements/image.svg'
import heart from '@/assets/elements/heart.svg'
import clock from '@/assets/elements/clock.svg'
import trash_empty from '@/assets/elements/trash_empty.svg'
import user_circle from '@/assets/elements/user_circle.svg'
import headphones from '@/assets/elements/headphones.svg'
import data from '@/assets/elements/data.svg'
import cloud_upload from '@/assets/elements/cloud_upload.svg'
import add_plus_circle from '@/assets/elements/add_plus_circle.svg'
import external_link from '@/assets/elements/external_link.svg'
import { useHome } from './useHome'

export default {
  name: 'HomeApp',
  setup() {
    const { activeButton, selectedFileType, isHomePage, goToNewPage, goToTariff } = useHome()

    return {
      logo,
      activeButton,
      selectedFileType,
      isHomePage,
      goToNewPage,
      goToTariff,
      searchPanelHomeData: {
        magnifier,
        search: 'Поиск по облаку',
        button: 'Найти',
        file_type: 'Тип файла',
        file_types: ['Изображения', 'Документы', 'Музыка', 'Видео', 'Папки', 'Архивы'],
        chevron_down,
      },
      stackPanelHomeData: {
        all_files: 'Все файлы',
        gallery: 'Галерея',
        favorites: 'Избранное',
        recents: 'Недавние',
        trash: 'Корзина',
        account: 'Аккаунт',
        help: 'Помощь',
        tariff: 'Тариф',
        chrervon_right,
        image,
        heart,
        clock,
        trash_empty,
        user_circle,
        headphones,
        data,
      },
      blueButtonsData: {
        cloud_upload,
        add_plus_circle,
        external_link,
      },
    }
  },
}
</script>

<template>
  <div class="home-wrapper">
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
              @click="activeButton = 'all_files'"
            >
              <img :src="stackPanelHomeData.chrervon_right" alt="chevron right" class="home-icon" />
              <span>{{ stackPanelHomeData.all_files }}</span>
            </button>
          </div>
          <div class="home-container-buttons">
            <button
              id="home-button-gallery"
              class="home-button-panel"
              :class="{ 'is-active': activeButton === 'gallery' }"
              @click="activeButton = 'gallery'"
            >
              <img :src="stackPanelHomeData.image" alt="image" class="home-icon" />
              <span>{{ stackPanelHomeData.gallery }}</span>
            </button>
          </div>
          <div class="home-container-buttons">
            <button
              id="home-button-favorites"
              class="home-button-panel"
              :class="{ 'is-active': activeButton === 'favorites' }"
              @click="activeButton = 'favorites'"
            >
              <img :src="stackPanelHomeData.heart" alt="heart" class="home-icon" />
              <span>{{ stackPanelHomeData.favorites }}</span>
            </button>
          </div>
          <div class="home-container-buttons">
            <button
              id="home-button-recents"
              class="home-button-panel"
              :class="{ 'is-active': activeButton === 'recents' }"
              @click="activeButton = 'recents'"
            >
              <img :src="stackPanelHomeData.clock" alt="clock" class="home-icon" />
              <span>{{ stackPanelHomeData.recents }}</span>
            </button>
          </div>
          <div class="home-container-buttons">
            <button
              id="home-button-trash"
              class="home-button-panel"
              :class="{ 'is-active': activeButton === 'trash' }"
              @click="activeButton = 'trash'"
            >
              <img :src="stackPanelHomeData.trash_empty" alt="trash empty" class="home-icon" />
              <span>{{ stackPanelHomeData.trash }}</span>
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
              <img :src="stackPanelHomeData.user_circle" alt="account" class="home-icon" />
              <span>{{ stackPanelHomeData.account }}</span>
            </button>
          </div>
          <div class="home-container-buttons">
            <button
              id="home-button-help"
              class="home-button-panel"
              :class="{ 'is-active': activeButton === 'help' }"
              @click="goToNewPage('Help')"
            >
              <img :src="stackPanelHomeData.headphones" alt="help" class="home-icon" />
              <span>{{ stackPanelHomeData.help }}</span>
            </button>
          </div>
          <div class="home-container-buttons">
            <button
              id="home-button-tariff"
              class="home-button-panel"
              :class="{ 'is-active': activeButton === 'tariff' }"
              @click="goToTariff"
            >
              <img :src="stackPanelHomeData.data" alt="data" class="home-icon" />
              <span>{{ stackPanelHomeData.tariff }}</span>
            </button>
          </div>
        </div>
        <div class="home-divider"></div>
      </div>
    </div>

    <div class="home-panel-right">
      <div class="home-panel-search">
        <div class="home-container-search">
          <img :src="searchPanelHomeData.magnifier" alt="search" class="home-icon" />
          <input type="text" :placeholder="searchPanelHomeData.search" class="home-input-search" />
          <div class="home-custom-select-wrapper">
            <select id="home-file-type" v-model="selectedFileType">
              <option value="" disabled hidden>{{ searchPanelHomeData.file_type }}</option>
              <option v-for="type in searchPanelHomeData.file_types" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <img
              class="home-icon home-custom-select-chevron"
              :src="searchPanelHomeData.chevron_down"
              alt="chevron down"
            />
          </div>
          <button class="home-click" id="home-button-search">
            {{ searchPanelHomeData.button }}
          </button>
        </div>
      </div>
      <div class="home-panel-storage">
        <div class="home-blue-buttons-container">
          <div class="home-blue-button" id="home-download-button">
            <img :src="blueButtonsData.cloud_upload" alt="download" class="home-icon" />
          </div>
          <div class="home-blue-button" id="home-create-button">
            <img :src="blueButtonsData.add_plus_circle" alt="create" class="home-icon" />
          </div>
          <div class="home-blue-button" id="home-share-button">
            <img :src="blueButtonsData.external_link" alt="share" class="home-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./moduleHome.css" scoped></style>
