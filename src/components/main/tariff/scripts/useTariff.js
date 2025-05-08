import { computed } from 'vue'
import { useStore } from 'vuex'
import { TARIFF_CONSTANTS } from './constants'

export function useTariff() {
  const store = useStore()

  const headerTariffData = TARIFF_CONSTANTS.headerTariffData
  const gigabyteTariffData = TARIFF_CONSTANTS.gigabyteTariffData
  const daysTariffData = TARIFF_CONSTANTS.daysTariffData
  const priceTariffData = TARIFF_CONSTANTS.priceTariffData

  const gigabytes = computed(() => store.state.tariff.gigabytes)
  const days = computed(() => store.state.tariff.days)

  const inputValueGB = computed({
    get: () => store.state.tariff.inputValueGB,
    set: (value) => {
      const validValue = validateInput(value, 1000)
      store.commit('tariff/setInputValueGB', validValue)
    },
  })

  const inputValueDays = computed({
    get: () => store.state.tariff.inputValueDays,
    set: (value) => {
      const validValue = validateInput(value, 365)
      store.commit('tariff/setInputValueDays', validValue)
    },
  })

  const totalPrice = computed(() => store.getters['tariff/totalPrice'])

  const filteredGigabytes = computed(() => {
    const startIndex = inputValueGB.value
    return gigabytes.value.slice(startIndex)
  })

  const filteredDays = computed(() => {
    const startIndex = inputValueDays.value
    return days.value.slice(startIndex)
  })

  const scrollHorizontally = (event) => {
    event.preventDefault()
    event.currentTarget.scrollLeft += event.deltaY
  }

  const handleDoubleClickGB = (value) => {
    inputValueGB.value = value
  }

  const handleDoubleClickDays = (value) => {
    inputValueDays.value = value
  }

  const getDayDeclension = (count) => {
    const declensions = ['День', 'Дня', 'Дней']
    if (count % 10 === 1 && count % 100 !== 11) {
      return declensions[0]
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      return declensions[1]
    } else {
      return declensions[2]
    }
  }

  const validateInput = (value, max) => {
    if (value < 1) {
      return 1
    } else if (value > max) {
      return max
    }
    return value
  }

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
    validateInput,
  }
}
