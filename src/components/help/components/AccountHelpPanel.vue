<script>
import { LABELS } from '../scripts/constants'
import styles from '../styles/help.module.css'

export default {
  name: 'AccountHelpPanel',
  props: {
    selectProblem: Function,
  },
  data() {
    return {
      styles,
      accountTopics: Object.values(LABELS.accountPanel).filter(
        (item) => item !== LABELS.accountPanel.header,
      ),
    }
  },
  setup() {
    return {
      labels: LABELS,
    }
  },
}
</script>

<template>
  <div :class="styles.helpSection">
    <header :class="styles.headerCaption">
      {{ labels.accountPanel.header }}
    </header>

    <div
      v-for="item in accountTopics"
      :key="item"
      :class="[styles.helpCaption, styles.click]"
      @click="selectProblem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
