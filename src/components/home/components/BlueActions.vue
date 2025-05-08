<script>
import cloud_upload from '@/assets/elements/cloud_upload.svg'
import add_plus_circle from '@/assets/elements/add_plus_circle.svg'
import external_link from '@/assets/elements/external_link.svg'

export default {
  name: 'BlueActions',
  data() {
    return {
      cloud_upload,
      add_plus_circle,
      external_link,
    }
  },
}
</script>

<template>
  <div class="home-blue-buttons-container">
    <div class="home-blue-button" id="home-download-button" @click="$emit('open-file-dialog')">
      <img :src="cloud_upload" alt="download" class="home-icon" />
    </div>
    <div class="home-blue-button" id="home-create-button">
      <img :src="add_plus_circle" alt="create" class="home-icon" />
    </div>
    <div class="home-blue-button" id="home-share-button">
      <img :src="external_link" alt="share" class="home-icon" />
    </div>
  </div>
</template>

<style src="../styles/moduleHome.css" scoped></style>
