import { useRouter } from 'vue-router'

export function useMainPage() {
  const router = useRouter()

  const sectionsMajorData = {
    sign_up: 'Регистрация',
    sign_in: 'Войти',
    admin_panel: 'Панель администратора',
  }

  const sliderTariffData = {
    checkout: 'Оформить',
  }

  const goToNewPage = (routeName) => {
    router.push({ name: routeName })
  }

  return {
    sectionsMajorData,
    sliderTariffData,
    goToNewPage,
  }
}
