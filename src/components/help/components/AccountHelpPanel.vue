<script>
import styles from '../styles/help.module.css'

export default {
  name: 'AccountHelpPanel',
  props: {
    accountPanelHelpData: Object,
    selectProblem: Function,
  },
  computed: {
    accountTopics() {
      return [
        this.accountPanelHelpData.password_change,
        this.accountPanelHelpData.change_of_tariff,
        this.accountPanelHelpData.account_deletion,
        this.accountPanelHelpData.account_creation,
        this.accountPanelHelpData.two_factor_authentication,
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
      {{ accountPanelHelpData.header }}
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
