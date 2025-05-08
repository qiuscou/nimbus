import { ref } from 'vue'

export function useMajor() {
  const headerMajorData = {
    logo: '@/assets/logo/logo.svg',
    title: 'nimbus',
  }

  const sectionsMajorData = {
    about_us: 'О нас',
    advantages: 'Преимущества',
    frequent_questions: 'Частые вопросы',
  }

  const textMajorData = {
    semibold_text: 'Ваши данные, ваши правила',
    light_text: 'Первое облако с полным контролем над хранилищем',
    collect_tariff: 'Собрать тариф',
  }

  const ellipseMajorData = {
    src: '@/assets/elements/ellipse.svg',
  }

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return {
    headerMajorData,
    sectionsMajorData,
    textMajorData,
    ellipseMajorData,
    scrollTo,
  }
}
