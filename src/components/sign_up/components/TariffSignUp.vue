<script>
export default {
  name: 'TariffSignUp',
  props: {
    formData: Object,
    inputValueGB: Number,
    inputValueDays: Number,
    totalPrice: Number,
    gigabyteTariffData: Object,
    daysTariffData: Object,
    priceTariffData: Object,
    getDayDeclension: Function,
  },
  emits: ['submit'],
}
</script>

<template>
  <div class="signupTariffContainer">
    <span id="signupHeader">{{ formData.tariff }}</span>
    <div class="signupTariffContent">
      <div class="signupTariffItem">
        <span class="signupText signupTariffTitle">{{ formData.volume }}</span>
        <div class="signupTariffRow">
          <span class="signupText signupDescription">{{ formData.volume_description }}</span>
          <div class="signupTariffValues">
            <span class="signupTotal">{{ inputValueGB }}</span>
            <span class="signupSymbol">{{ gigabyteTariffData.label }}</span>
          </div>
        </div>
      </div>
      <div class="signupDivider"></div>
      <div class="signupTariffItem">
        <span class="signupText signupTariffTitle">{{ formData.term }}</span>
        <div class="signupTariffRow">
          <span class="signupText signupDescription">{{ formData.term_description }}</span>
          <div class="signupTariffValues">
            <span class="signupTotal">{{ inputValueDays }}</span>
            <span class="signupSymbol">{{ getDayDeclension(inputValueDays) }}</span>
          </div>
        </div>
      </div>
      <div class="signupDivider"></div>
      <div class="signupTariffItem">
        <span class="signupText signupTariffTitle">{{ formData.total }}</span>
        <div class="signupTariffRow">
          <span class="signupText signupDescription">{{ formData.total_description }}</span>
          <div class="signupTariffValues">
            <span class="signupTotal">{{ totalPrice }}</span>
            <span class="signupSymbol">{{ priceTariffData.currencySymbol }}</span>
          </div>
        </div>
      </div>
    </div>
    <button class="click" id="signupCheckout" @click="$emit('submit')">
      {{ formData.checkout }}
    </button>
  </div>
</template>

<style src="../styles/moduleSignUp.css" scoped></style>
