<script>
import logo from '@/assets/logo/logo.svg'
import chevron_right from '@/assets/elements/chevron_right.svg'
import image from '@/assets/elements/image.svg'
import heart from '@/assets/elements/heart.svg'
import clock from '@/assets/elements/clock.svg'
import trash_empty from '@/assets/elements/trash_empty.svg'
import user_circle from '@/assets/elements/user_circle.svg'
import headphones from '@/assets/elements/headphones.svg'
import data from '@/assets/elements/data.svg'
import { SIDE_PANEL_CONSTANTS } from '../scripts/constants'

export default {
  name: 'SidePanel',
  props: {
    activeButton: String,
  },
  data() {
    return {
      logo,
      stackPanelHomeData: {
        ...SIDE_PANEL_CONSTANTS,
        chevron_right,
        image,
        heart,
        clock,
        trash_empty,
        user_circle,
        headphones,
        data,
      },
    }
  },
  methods: {
    handleButtonClick(button) {
      if (button === 'favorites') {
        this.$emit('update-filter', { filter: 'favorites' })
      }
      if (button === 'recents') {
        this.$emit('update-filter', { filter: 'recents' })
      }
      this.$emit('update:activeButton', button)
    },
    goToNewPage(page) {
      this.$emit('go-to-new-page', page)
    },
    goToTariff() {
      this.$emit('go-to-tariff')
    },
  },
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
            <img :src="stackPanelHomeData.chevron_right" alt="chevron right" class="home-icon" />
            <span>{{ stackPanelHomeData.all_files }}</span>
          </button>
        </div>
        <div class="home-container-buttons">
          <button
            id="home-button-gallery"
            class="home-button-panel"
            :class="{ 'is-active': activeButton === 'gallery' }"
            @click="handleButtonClick('gallery')"
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
            @click="handleButtonClick('favorites')"
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
            @click="handleButtonClick('recents')"
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
            @click="handleButtonClick('trash')"
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
</template>

<style src="../styles/moduleHome.css" scoped></style>
