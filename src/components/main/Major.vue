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

<style>
.major-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  width: 100%;
  box-sizing: border-box;
}

.major-sections-container {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding-left: 4rem;
  margin-left: auto;
  box-sizing: border-box;
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 1.15rem;
}

.major-texts-container {
  margin-left: 4rem;
  margin-top: 10rem;
}

.major-ellipse-container {
  position: absolute;
  left: 50%;
  top: 5rem;
  transform: translateY(5%);
  width: 60rem;
  height: 60rem;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

#major-sign-up {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 1.15rem;
  color: #197ccd;
  background-color: transparent;
  border: none;
}

#major-sign-in {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 1.15rem;
  color: #ffffff;
  background-color: #197ccd;
  border: none;
  border-radius: 0.55rem;
  padding: 0.35rem 1rem;
}

#major-text-semibold {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2.05rem;
  display: block;
}

#major-text-light {
  font-family: 'Manrope Light', sans-serif;
  font-size: 1.45rem;
  display: block;
}

#major-collect-tariff {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 1.15rem;
  color: #ffffff;
  background-color: #197ccd;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 2.5rem;
  margin-top: 2rem;
}

#major-ellipse {
  position: absolute;
  right: 0;
  top: 10%;
  transform: translateY(-10%);
  height: 100%;
  width: 100%;
}
</style>
