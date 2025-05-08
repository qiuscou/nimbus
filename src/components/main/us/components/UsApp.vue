<script>
import { useUs } from '../scripts/useUs'

export default {
  name: 'UsApp',
  setup() {
    const { headerUsData, formattedSubheading, formattedMission } = useUs()

    return {
      headerUsData,
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

<style src="../styles/moduleUs.css" scoped></style>
