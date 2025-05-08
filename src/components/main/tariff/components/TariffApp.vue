<script>
import { useTariff } from '../scripts/useTariff'

export default {
  name: 'TariffApp',
  setup() {
    const {
      headerTariffData,
      gigabyteTariffData,
      daysTariffData,
      priceTariffData,
      gigabytes,
      days,
      inputValueGB,
      inputValueDays,
      totalPrice,
      filteredGigabytes,
      filteredDays,
      scrollHorizontally,
      handleDoubleClickGB,
      handleDoubleClickDays,
      getDayDeclension,
    } = useTariff()

    return {
      headerTariffData,
      gigabyteTariffData,
      daysTariffData,
      priceTariffData,
      gigabytes,
      days,
      inputValueGB,
      inputValueDays,
      totalPrice,
      filteredGigabytes,
      filteredDays,
      scrollHorizontally,
      handleDoubleClickGB,
      handleDoubleClickDays,
      getDayDeclension,
    }
  },
}
</script>

<template>
  <div class="tariff-header-container">
    <span id="tariff-header">{{ headerTariffData.header }}</span>
    <span id="tariff-subheading">{{ headerTariffData.subheading }}</span>
  </div>

  <div class="tariff-gigabyte-container" @wheel="scrollHorizontally">
    <input
      id="tariff-input-gigabyte"
      type="number"
      v-model.number="inputValueGB"
      :style="{ width: `${Math.max(5, inputValueGB.toString().length * 3.35)}rem` }"
    />
    <span class="tariff-symbol">{{ gigabyteTariffData.label }}</span>
    <div
      id="tariff-gigabyte"
      v-for="(item, index) in filteredGigabytes"
      :key="index"
      @dblclick="handleDoubleClickGB(item)"
    >
      {{ item }}
    </div>
  </div>

  <div class="tariff-days-container" @wheel="scrollHorizontally">
    <input
      id="tariff-input-day"
      type="number"
      v-model.number="inputValueDays"
      :style="{ width: `${Math.max(5, inputValueDays.toString().length * 3.35)}rem` }"
    />
    <span class="tariff-symbol">{{ getDayDeclension(inputValueDays) }}</span>
    <div
      id="tariff-days"
      v-for="(item, index) in filteredDays"
      :key="index"
      @dblclick="handleDoubleClickDays(item)"
    >
      {{ item }}
    </div>
  </div>

  <div class="tariff-price-container">
    <div id="tariff-price">
      <span id="tariff-total">{{ totalPrice }}</span>
      <span id="tariff-symbol">{{ priceTariffData.currencySymbol }}</span>
    </div>
  </div>

  <div class="tariff-slider-container">
    <div id="tariff-slider">
      <span class="tariff-total">{{ totalPrice }}</span>
      <span class="tariff-symbol">{{ priceTariffData.currencySymbol }}</span>
      <span class="tariff-text">за</span>
      <span class="tariff-total">{{ inputValueGB }}</span>
      <span class="tariff-symbol">{{ gigabyteTariffData.label }}</span>
      <span class="tariff-text">на</span>
      <span class="tariff-total">{{ inputValueDays }}</span>
      <span class="tariff-symbol">{{ getDayDeclension(inputValueDays) }}</span>
    </div>
    <slot name="checkout"></slot>
  </div>
</template>

<style src="../styles/moduleTariff.css" scoped></style>
