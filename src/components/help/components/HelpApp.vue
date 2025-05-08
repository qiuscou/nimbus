<script>
import FilesHelpPanel from './FilesHelpPanel.vue'
import AccountHelpPanel from './AccountHelpPanel.vue'
import ProblemsHelpPanel from './ProblemsHelpPanel.vue'
import HelpResponse from './HelpResponse.vue'
import { useHelp } from '../scripts/useHelp'
import { LABELS } from '../scripts/constants'
import styles from '../styles/help.module.css'

export default {
  name: 'HelpApp',
  components: {
    FilesHelpPanel,
    AccountHelpPanel,
    ProblemsHelpPanel,
    HelpResponse,
  },
  setup() {
    const { responseHeader, responseContent, selectProblem } = useHelp()

    return {
      headerHelpData: LABELS.header,
      filesPanelHelpData: LABELS.filesPanel,
      accountPanelHelpData: LABELS.accountPanel,
      problemsPanelHelpData: LABELS.problemsPanel,
      responseHeader,
      responseContent,
      selectProblem,
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.helpPanel">
    <header :class="styles.helpHeader">
      {{ headerHelpData }}
    </header>

    <div :class="styles.helpContent">
      <FilesHelpPanel :filesPanelHelpData="filesPanelHelpData" :selectProblem="selectProblem" />
      <AccountHelpPanel
        :accountPanelHelpData="accountPanelHelpData"
        :selectProblem="selectProblem"
      />
      <ProblemsHelpPanel
        :problemsPanelHelpData="problemsPanelHelpData"
        :selectProblem="selectProblem"
      />
    </div>

    <HelpResponse :header="responseHeader" :content="responseContent" />
  </div>
</template>
