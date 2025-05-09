import { useRouter } from 'vue-router'

export function useMainPage() {
  const router = useRouter()

  const headerMajorData = {
    title: 'nimbus',
  }

  const sectionsMajorData = {
    sign_up: 'Регистрация',
    sign_in: 'Войти',
  }

  const sliderTariffData = {
    checkout: 'Оформить',
  }

  const goToNewPage = (routeName) => {
    router.push({ name: routeName })
  }

  return {
    headerMajorData,
    sectionsMajorData,
    sliderTariffData,
    goToNewPage,
  }
}
