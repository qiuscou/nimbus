export default {
  namespaced: true,
  state: {
    gigabyteTariffData: {
      label: 'ГБ',
      min: 1,
      max: 1000,
    },
    daysTariffData: {
      label: 'День',
      min: 1,
      max: 365,
    },
    priceTariffData: {
      currencySymbol: '₽',
    },
    gigabytes: Array.from({ length: 1000 }, (_, i) => i + 1),
    days: Array.from({ length: 365 }, (_, i) => i + 1),
    inputValueGB: 1,
    inputValueDays: 1,
    pricePerGBDay: 0.05,
  },
  mutations: {
    setInputValueGB(state, value) {
      state.inputValueGB = value
    },
    setInputValueDays(state, value) {
      state.inputValueDays = value
    },
  },
  getters: {
    totalPrice: (state) => {
      const price = state.inputValueGB * state.inputValueDays * state.pricePerGBDay
      const formattedPrice = parseFloat(price).toFixed(2).replace('.', ',')
      if (formattedPrice.endsWith(',00')) {
        return formattedPrice.slice(0, -3)
      }
      return formattedPrice
    },
  },
}
