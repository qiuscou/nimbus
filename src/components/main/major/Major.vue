<!-- eslint-disable vue/multi-word-component-names -->
<script>
import logo from '@/assets/logo/logo.svg'
import ellipse from '@/assets/elements/ellipse.svg'

export default {
  name: 'MajorApp',
  data() {
    return {
      headerMajorData: {
        logo: logo,
        title: 'nimbus',
      },
      sectionsMajorData: {
        about_us: 'О нас',
        advantages: 'Преимущества',
        frequent_questions: 'Частые вопросы',
      },
      textMajorData: {
        semibold_text: 'Ваши данные, ваши правила',
        light_text: 'Первое облако с полным контролем над хранилищем',
        collect_tariff: 'Собрать тариф',
      },
      ellipseMajorData: {
        src: ellipse,
      },
    }
  },
  methods: {
    scrollTo(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    },
  },
}
</script>

<template>
  <header class="major-header">
    <div id="logo">
      <img :src="headerMajorData.logo" alt="logo" class="click" />
      <span class="click" id="name">{{ headerMajorData.title }}</span>
    </div>

    <div class="major-sections-container">
      <span class="click" id="about_us" @click="scrollTo('app-us')">
        {{ sectionsMajorData.about_us }}</span
      >
      <span class="click" id="advantages" @click="scrollTo('app-advantages')">
        {{ sectionsMajorData.advantages }}</span
      >
      <span class="click" id="frequent_questions" @click="scrollTo('app-questions')">{{
        sectionsMajorData.frequent_questions
      }}</span>
      <slot name="buttons"></slot>
    </div>
  </header>

  <div class="major-texts-container">
    <span id="major-text-semibold">{{ textMajorData.semibold_text }}</span>
    <span id="major-text-light">
      {{ textMajorData.light_text.split(' ').slice(0, -1).join(' ') }}<br />
      {{ textMajorData.light_text.split(' ').pop() }}
    </span>
    <button class="click" id="major-collect-tariff" @click="scrollTo('app-tariff')">
      {{ textMajorData.collect_tariff }}
    </button>
    <div class="major-ellipse-container">
      <img :src="ellipseMajorData.src" :alt="ellipseMajorData.alt" id="major-ellipse" />
    </div>
  </div>
</template>

<style src="./moduleMajor.css" scoped></style>
