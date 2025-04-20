import { ref, computed } from 'vue'

export function useHelp() {
  const selectedProblem = ref('')

  const headerHelpData = {
    header: 'Чем мы можем вам помочь?',
  }

  const filesPanelHelpData = {
    header: 'Файлы',
    uploading_files: 'Загрузка файлов',
    downloading_files: 'Скачивание файлов',
    folder_organization: 'Организация папок',
    shared_access: 'Совместный доступ',
    recover_deleted_files: 'Восстановление удаленных файлов',
  }

  const accountPanelHelpData = {
    header: 'Аккаунт',
    password_change: 'Смена пароля',
    change_of_tariff: 'Смена тарифа',
    account_deletion: 'Удаление аккаунта',
    account_creation: 'Создание аккаунта',
    two_factor_authentication: 'Двухфакторная аутентификация',
  }

  const problemsPanelHelpData = {
    header: 'Проблемы',
    freeing_up_space: 'Освобождение места',
    file_not_displayed: 'Файл не отображается',
    contact_support: 'Связаться с поддержкой',
    problems_with_downloading_files: 'Проблемы с загрузкой файлов',
    restore_account_access: 'Восстановление доступа к аккаунту',
  }

  const responseHelpData = {
    response: 'Решение вашей проблемы',
  }

  const problemDescriptions = {
    // Файлы
    'Загрузка файлов': 'Чтобы загрузить файлы, перетащите их в окно браузера...',
    'Скачивание файлов': 'Для скачивания файла нажмите на значок загрузки...',
    'Организация папок': 'Создавайте папки для упорядочивания файлов...',
    'Совместный доступ': 'Делитесь файлами и папками с другими пользователями...',
    'Восстановление удаленных файлов': 'Удаленные файлы хранятся в корзине 30 дней...',
    // Аккаунт
    'Смена пароля': 'Для смены пароля перейдите в настройки аккаунта...',
    'Смена тарифа': 'В настройках аккаунта выберите "Тарифы и оплата"...',
    'Удаление аккаунта': 'Перейдите в настройки аккаунта, выберите "Удаление аккаунта"...',
    'Создание аккаунта': 'Нажмите "Регистрация", введите email...',
    'Двухфакторная аутентификация': 'Включите 2FA в настройках безопасности...',
    // Проблемы
    'Освобождение места': 'Проверьте корзину и очистите её...',
    'Файл не отображается': 'Обновите страницу браузера...',
    'Связаться с поддержкой': 'Наша служба поддержки доступна 24/7...',
    'Проблемы с загрузкой файлов': 'Проверьте стабильность интернет-соединения...',
    'Восстановление доступа к аккаунту': 'Нажмите "Забыли пароль?" на странице входа...',
  }

  const responseHeader = computed(() => selectedProblem.value || responseHelpData.response)

  const responseContent = computed(() =>
    selectedProblem.value ? problemDescriptions[selectedProblem.value] : responseHelpData.response,
  )

  const selectProblem = (problem) => {
    selectedProblem.value = problem
  }

  return {
    headerHelpData,
    filesPanelHelpData,
    accountPanelHelpData,
    problemsPanelHelpData,
    responseHeader,
    responseContent,
    selectProblem,
  }
}
