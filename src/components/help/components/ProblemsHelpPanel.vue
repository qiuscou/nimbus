<script>
import { LABELS } from '../scripts/constants'
import styles from '../styles/help.module.css'

export default {
  name: 'ProblemsHelpPanel',
  props: {
    selectProblem: Function,
  },
  computed: {
    problemTopics() {
      return Object.values(LABELS.problemsPanel).filter(
        (item) => item !== LABELS.problemsPanel.header,
      )
    },
  },
  data() {
    return {
      styles,
      problemsPanelHelpData: LABELS.problemsPanel,
    }
  },
}
</script>

<template>
  <div :class="styles.helpSection">
    <header :class="styles.headerCaption">
      {{ problemsPanelHelpData.header }}
    </header>

    <div
      v-for="item in problemTopics"
      :key="item"
      :class="[styles.helpCaption, styles.click]"
      @click="selectProblem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
