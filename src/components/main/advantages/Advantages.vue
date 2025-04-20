<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useAdvantages } from './useAdvantages'

export default {
  name: 'AdvantagesApp',
  setup() {
    const { headerAdvantagesData, formattedAvailable, formattedSafely, formattedJust } =
      useAdvantages()

    return {
      headerAdvantagesData,
      formattedAvailable,
      formattedSafely,
      formattedJust,
    }
  },
}
</script>

<template>
  <div class="advantages-header-container">
    <span id="advantages-header">{{ headerAdvantagesData.header }}</span>
  </div>

  <div class="advantages-points-container">
    <span id="advantages-available">
      <span
        v-for="(word, index) in formattedAvailable"
        :key="index"
        :class="{ 'advantages-highlight': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
    <span id="advantages-safely">
      <span
        v-for="(word, index) in formattedSafely"
        :key="index"
        :class="{ 'advantages-highlight': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
    <span id="advantages-just">
      <span
        v-for="(word, index) in formattedJust"
        :key="index"
        :class="{ 'advantages-highlight': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
  </div>
</template>

<style src="./moduleAdvantages.css" scoped></style>
