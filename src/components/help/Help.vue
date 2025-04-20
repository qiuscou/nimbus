<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useHelp } from './useHelp'

export default {
  name: 'HelpApp',
  setup() {
    const {
      headerHelpData,
      filesPanelHelpData,
      accountPanelHelpData,
      problemsPanelHelpData,
      responseHeader,
      responseContent,
      selectProblem,
    } = useHelp()

    return {
      headerHelpData,
      filesPanelHelpData,
      accountPanelHelpData,
      problemsPanelHelpData,
      responseHeader,
      responseContent,
      selectProblem,
    }
  },
}
</script>

<template>
  <div class="help-panel">
    <header class="help-header">{{ headerHelpData.header }}</header>
    <div class="help-content">
      <div class="help-section">
        <header class="header-caption">{{ filesPanelHelpData.header }}</header>
        <div class="help-caption click" @click="selectProblem(filesPanelHelpData.uploading_files)">
          {{ filesPanelHelpData.uploading_files }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(filesPanelHelpData.downloading_files)"
        >
          {{ filesPanelHelpData.downloading_files }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(filesPanelHelpData.folder_organization)"
        >
          {{ filesPanelHelpData.folder_organization }}
        </div>
        <div class="help-caption click" @click="selectProblem(filesPanelHelpData.shared_access)">
          {{ filesPanelHelpData.shared_access }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(filesPanelHelpData.recover_deleted_files)"
        >
          {{ filesPanelHelpData.recover_deleted_files }}
        </div>
      </div>
      <div class="help-section">
        <header class="header-caption">{{ accountPanelHelpData.header }}</header>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.password_change)"
        >
          {{ accountPanelHelpData.password_change }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.change_of_tariff)"
        >
          {{ accountPanelHelpData.change_of_tariff }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.account_deletion)"
        >
          {{ accountPanelHelpData.account_deletion }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.account_creation)"
        >
          {{ accountPanelHelpData.account_creation }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.two_factor_authentication)"
        >
          {{ accountPanelHelpData.two_factor_authentication }}
        </div>
      </div>
      <div class="help-section">
        <header class="header-caption">{{ problemsPanelHelpData.header }}</header>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.freeing_up_space)"
        >
          {{ problemsPanelHelpData.freeing_up_space }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.file_not_displayed)"
        >
          {{ problemsPanelHelpData.file_not_displayed }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.contact_support)"
        >
          {{ problemsPanelHelpData.contact_support }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.problems_with_downloading_files)"
        >
          {{ problemsPanelHelpData.problems_with_downloading_files }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.restore_account_access)"
        >
          {{ problemsPanelHelpData.restore_account_access }}
        </div>
      </div>
    </div>
    <div class="help-response">
      <header class="response-header">{{ responseHeader }}</header>
      <div class="help-response-content" v-html="responseContent"></div>
    </div>
  </div>
</template>

<style src="./moduleHelp.css" scoped></style>
