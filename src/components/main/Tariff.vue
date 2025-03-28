<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'TariffApp',
  data() {
    return {
      headerTariffData: {
        header: 'Собери свой тариф',
        subheading: 'Введи нужное количество гигабайт и срок использования и узнай цену',
      },
    }
  },
  computed: {
    gigabyteTariffData() {
      return this.$store.state.tariff.gigabyteTariffData
    },
    daysTariffData() {
      return this.$store.state.tariff.daysTariffData
    },
    priceTariffData() {
      return this.$store.state.tariff.priceTariffData
    },
    gigabytes() {
      return this.$store.state.tariff.gigabytes
    },
    days() {
      return this.$store.state.tariff.days
    },
    inputValueGB: {
      get() {
        return this.$store.state.tariff.inputValueGB
      },
      set(value) {
        const validValue = this.validateInput(value, 1000)
        this.$store.commit('tariff/setInputValueGB', validValue)
      },
    },
    inputValueDays: {
      get() {
        return this.$store.state.tariff.inputValueDays
      },
      set(value) {
        const validValue = this.validateInput(value, 365)
        this.$store.commit('tariff/setInputValueDays', validValue)
      },
    },
    totalPrice() {
      return this.$store.getters['tariff/totalPrice']
    },
    filteredGigabytes() {
      const startIndex = this.inputValueGB
      return this.gigabytes.slice(startIndex)
    },
    filteredDays() {
      const startIndex = this.inputValueDays
      return this.days.slice(startIndex)
    },
  },
  methods: {
    scrollHorizontally(event) {
      event.preventDefault()
      event.currentTarget.scrollLeft += event.deltaY
    },
    handleDoubleClickGB(value) {
      this.inputValueGB = value
    },
    handleDoubleClickDays(value) {
      this.inputValueDays = value
    },
    getDayDeclension(count) {
      const declensions = ['День', 'Дня', 'Дней']
      if (count % 10 === 1 && count % 100 !== 11) {
        return declensions[0]
      } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return declensions[1]
      } else {
        return declensions[2]
      }
    },
    validateInput(value, max) {
      if (value < 1) {
        return 1
      } else if (value > max) {
        return max
      }
      return value
    },
  },
  watch: {
    inputValueGB(newValue) {
      this.inputValueGB = this.validateInput(newValue, 1000)
    },
    inputValueDays(newValue) {
      this.inputValueDays = this.validateInput(newValue, 365)
    },
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

<style>
.tariff-header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.tariff-gigabyte-container,
.tariff-days-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  padding: 2rem;
  margin-left: 4.85rem;
  max-width: 100%;
  scrollbar-width: none;
  user-select: none;
}

.tariff-gigabyte-container span,
.tariff-days-container span {
  color: #197ccd;
  font-size: 2.35rem;
}

.tariff-price-container {
  margin-left: 7rem;
}

.tariff-slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 7.5rem;
  background-color: #197ccd;
}

.tariff-total {
  font-family: 'Circular Std', sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 3.75rem;
}

.tariff-symbol {
  font-family: 'Circular Std', sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 1.85rem;
  position: relative;
  top: -1.75rem;
  margin-left: 0.5rem;
}

.tariff-text {
  font-family: 'Circular Std', sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 2rem;
  margin-inline: 1rem;
}

#tariff-header {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2.05rem;
}

#tariff-subheading {
  font-family: 'Manrope Light', sans-serif;
  font-weight: normal;
  font-size: 1.25rem;
}

#tariff-input-gigabyte,
#tariff-input-day {
  font-family: 'Circular Std', sans-serif;
  font-size: 5.5rem;
  font-weight: bold;
  color: #197ccd;
  background-color: transparent;
  border: none;
  padding: 0;
}

#tariff-input-gigabyte:focus,
#tariff-input-day:focus {
  outline: none;
  border: none;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#tariff-gigabyte,
#tariff-days {
  display: inline-block;
  margin: 0 1rem;
  font-family: 'Circular Std', sans-serif;
  font-size: 5.5rem;
  font-weight: bold;
  color: #d0cece;
}

#tariff-price {
  display: inline-flex;
  align-items: center;
}

#tariff-total {
  font-family: 'Circular Std', sans-serif;
  font-size: 5.5rem;
  font-weight: bold;
  color: #2c2d2e;
}

#tariff-symbol {
  font-family: 'Circular Std', sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: #2c2d2e;
  position: relative;
  top: -1.75rem;
  margin-left: 0.5rem;
}

#tariff-slider {
  display: inline-flex;
  align-items: baseline;
  margin-left: 7.45rem;
}

#tariff-checkout {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 1.15rem;
  color: #2c2d2e;
  background-color: #f6f7f8;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 2.35rem;
  margin-left: auto;
  margin-right: 7.85rem;
  cursor: pointer;
}
</style>
