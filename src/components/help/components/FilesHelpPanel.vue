<script>
import styles from '../styles/help.module.css'

export default {
  name: 'FilesHelpPanel',
  props: {
    filesPanelHelpData: Object,
    selectProblem: Function,
  },
  computed: {
    fileTopics() {
      return [
        this.filesPanelHelpData.uploading_files,
        this.filesPanelHelpData.downloading_files,
        this.filesPanelHelpData.folder_organization,
        this.filesPanelHelpData.shared_access,
        this.filesPanelHelpData.recover_deleted_files,
      ]
    },
  },
  data() {
    return {
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.helpSection">
    <header :class="styles.headerCaption">
      {{ filesPanelHelpData.header }}
    </header>

    <div
      v-for="item in fileTopics"
      :key="item"
      :class="[styles.helpCaption, styles.click]"
      @click="selectProblem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
