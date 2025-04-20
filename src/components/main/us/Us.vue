<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useUs } from './useUs'

export default {
  name: 'UsApp',
  setup() {
    const { headerUsData, missionUsData, subheadingUsData, formattedSubheading, formattedMission } =
      useUs()

    return {
      headerUsData,
      missionUsData,
      subheadingUsData,
      formattedSubheading,
      formattedMission,
    }
  },
}
</script>

<template>
  <div class="us-header-container">
    <span id="us-header">{{ headerUsData.header }}</span>
  </div>
  <div class="us-subheading-container">
    <span id="us-subheading">
      <span
        v-for="(word, index) in formattedSubheading"
        :key="index"
        :class="{ 'us-subheading-word': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
  </div>
  <div class="us-mission-container">
    <span id="us-mission">
      <span
        v-for="(word, index) in formattedMission"
        :key="index"
        :class="{ 'us-subheading-word': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
  </div>
</template>

<style src="./moduleUs.css" scoped></style>
