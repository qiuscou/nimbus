<script>
import { LABELS } from '../scripts/constants'
import styles from '../styles/help.module.css'

export default {
  name: 'FilesHelpPanel',
  props: {
    selectProblem: Function,
  },
  computed: {
    fileTopics() {
      return Object.values(LABELS.filesPanel).filter((item) => item !== LABELS.filesPanel.header)
    },
  },
  data() {
    return {
      styles,
      filesPanelHelpData: LABELS.filesPanel,
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
