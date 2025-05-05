<script>
import styles from '../styles/help.module.css'

export default {
  name: 'ProblemsHelpPanel',
  props: {
    problemsPanelHelpData: Object,
    selectProblem: Function,
  },
  computed: {
    problemTopics() {
      return [
        this.problemsPanelHelpData.freeing_up_space,
        this.problemsPanelHelpData.file_not_displayed,
        this.problemsPanelHelpData.contact_support,
        this.problemsPanelHelpData.problems_with_downloading_files,
        this.problemsPanelHelpData.restore_account_access,
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
