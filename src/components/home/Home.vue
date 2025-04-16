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

export default {
  name: 'HomeApp',
  data() {
    return {
      logo,
      activeButton: 'all_files',
      showDropdown: false,
      selectedFileType: '',
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
      isHomePage: this.$route.path === '/',
    }
  },
  watch: {
    $route(to) {
      this.isHomePage = to.path === '/'
    },
  },
  methods: {
    goToNewPage(page) {
      this.$router.push({ name: page })
    },
    goToTariff() {
      this.$router.push('/').then(() => {
        const tariffSection = document.getElementById('app-tariff')
        if (tariffSection) {
          tariffSection.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
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

<style scoped>
.home-wrapper {
  display: flex;
  padding: 0.75rem;
  box-sizing: border-box;
  gap: 1rem;
  height: 100%;
}

.home-panel-left {
  display: flex;
  flex-direction: column;
  width: 15rem;
  gap: 1rem;
}

.home-panel-right {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.home-panel-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  border: 1px solid #8c8e93;
  background: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
  width: 100%;
}

.home-panel-search {
  display: flex;
  width: 100%;
  max-width: 77.5rem;
  align-items: center;
  box-sizing: border-box;
}

.home-panel-storage {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  box-sizing: border-box;
  max-width: 77.5rem;
  padding-right: 1rem;
  border: 1px solid #8c8e93;
  background: #ffffff;
  border-radius: 8px;
  min-height: calc(100vh - 13rem);
}

.home-panel-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.home-panel-storage {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  box-sizing: border-box;
  max-width: 77.5rem;
  margin-top: 20px;
}

.home-panel-storage .home-storage-container {
  width: 100%;
  border: 1px solid #8c8e93;
  background: #ffffff;
  border-radius: 8px;
  height: 2.75rem;
  box-sizing: border-box;
}

.home-storage-container {
  height: 100%;
  border: 1px solid #8c8e93;
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}

.home-container-search {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #8c8e93;
  background: #ffffff;
  border-radius: 8px;
  height: 2.75rem;
  box-sizing: border-box;
}

.home-icon {
  width: 1.35rem;
  height: 1.35rem;
  margin-inline: 0.75rem;
}

.home-custom-select-chevron {
  position: absolute;
  right: 0.5rem;
  margin-inline: 0;
  pointer-events: none;
}

.home-container-search input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-family: 'Manrope Regular', sans-serif;
  font-size: 1.05rem;
  color: #8c8e93;
  padding: 0;
  height: 100%;
}

.home-custom-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border-right: 1px solid #8c8e93;
  height: 100%;
  min-width: 8rem;
}

#home-file-type {
  padding: 0 2rem 0 0.5rem;
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.05rem;
  color: #8c8e93;
  border: none;
  cursor: pointer;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 100%;
  display: flex;
  align-items: center;
  text-align-last: right;
}

#home-file-type option {
  color: #8c8e93;
  text-align: left;
  direction: ltr;
}

#home-file-type::-ms-expand {
  display: none;
}

#home-file-type:focus {
  outline: none;
  box-shadow: none;
}

#home-button-search {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.05rem;
  padding: 0 2rem;
  color: #2c2d2e;
  background: #ffffff;
  border-radius: 0.85rem;
  border: none;
  cursor: pointer;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.home-click {
  cursor: pointer;
}

.home-button-panel {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  border-radius: 8px;
}

.home-button-panel:active {
  background-color: #e3e5ea;
}

.home-button-panel.is-active {
  background-color: #e3e5ea;
}

.home-button-panel span {
  font-family: 'Manrope Regular', sans-serif;
  font-size: 1.05rem;
  color: #2c2d2e;
}

.home-container-buttons {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin: 4px 0;
}

.home-divider {
  height: 0.1rem;
  background-color: #d0cece;
  width: 100%;
}

.home-blue-buttons-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: none;
  border-right: 0.1rem dashed #d0cece;
  border-bottom: 0.1rem dashed #d0cece;
  border-radius: 0px 0px 8px 0px;
  padding: 1rem;
  box-sizing: border-box;
  width: 12.25rem;
}

.home-blue-button {
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #197ccd;
  border-radius: 10px;
}

.home-logo {
  max-width: 100%;
  height: auto;
}
</style>
