<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'HelpApp',
  data() {
    return {
      headerHelpData: {
        header: 'Чем мы можем вам помочь?',
      },
      filesPanelHelpData: {
        header: 'Файлы',
        uploading_files: 'Загрузка файлов',
        downloading_files: 'Скачивание файлов',
        folder_organization: 'Организация папок',
        shared_access: 'Совместный доступ',
        recover_deleted_files: 'Восстановление удаленных файлов',
      },
      accountPanelHelpData: {
        header: 'Аккаунт',
        password_change: 'Смена пароля',
        change_of_tariff: 'Смена тарифа',
        account_deletion: 'Удаление аккаунта',
        account_creation: 'Создание аккаунта',
        two_factor_authentication: 'Двухфакторная аутентификация',
      },
      problemsPanelHelpData: {
        header: 'Проблемы',
        freeing_up_space: 'Освобождение места',
        file_not_displayed: 'Файл не отображается',
        contact_support: 'Связаться с поддержкой',
        problems_with_downloading_files: 'Проблемы с загрузкой файлов',
        restore_account_access: 'Восстановление доступа к аккаунту',
      },
      responseHelpData: {
        response: 'Решение вашей проблемы',
      },
      problemDescriptions: {
        // Файлы
        'Загрузка файлов':
          'Чтобы загрузить файлы, перетащите их в окно браузера или нажмите кнопку "Загрузить".<br>Поддерживаются файлы размером до 50 ГБ.<br>Вы можете загружать несколько файлов одновременно.',
        'Скачивание файлов':
          'Для скачивания файла нажмите на значок загрузки рядом с его названием.<br>Для скачивания нескольких файлов выберите их и нажмите "Скачать выбранное".',
        'Организация папок':
          'Создавайте папки для упорядочивания файлов, перемещайте файлы между папками перетаскиванием.<br>Используйте поиск для быстрого доступа к нужным файлам.',
        'Совместный доступ':
          'Делитесь файлами и папками с другими пользователями.<br>Настраивайте права доступа: просмотр или редактирование.<br>Доступ можно предоставить по email или по ссылке.',
        'Восстановление удаленных файлов':
          'Удаленные файлы хранятся в корзине 30 дней.<br>Чтобы восстановить файл, перейдите в корзину, найдите нужный файл и нажмите "Восстановить".',

        // Аккаунт
        'Смена пароля':
          'Для смены пароля перейдите в настройки аккаунта, выберите "Безопасность" и нажмите "Изменить пароль".<br>Введите текущий пароль и дважды новый.',
        'Смена тарифа':
          'В настройках аккаунта выберите "Тарифы и оплата".<br>Выберите подходящий тариф и следуйте инструкциям для его активации.',
        'Удаление аккаунта':
          'Перейдите в настройки аккаунта, выберите "Удаление аккаунта".<br>Подтвердите действие, введя пароль.<br>Важно: это действие необратимо.',
        'Создание аккаунта':
          'Нажмите "Регистрация", введите email и придумайте надежный пароль.<br>Подтвердите email по ссылке из письма.<br>Заполните профиль в настройках.',
        'Двухфакторная аутентификация':
          'Включите 2FA в настройках безопасности.<br>Установите приложение-аутентификатор на телефон и следуйте инструкциям для настройки.',

        // Проблемы
        'Освобождение места':
          'Проверьте корзину и очистите её.<br>Используйте сортировку по размеру для поиска больших файлов.<br>Архивируйте редко используемые файлы.',
        'Файл не отображается':
          'Обновите страницу браузера.<br>Проверьте права доступа к файлу.<br>Убедитесь, что формат файла поддерживается системой.',
        'Связаться с поддержкой':
          'Наша служба поддержки доступна 24/7.<br>Опишите проблему в форме обратной связи или напишите на support@nimbus.com.',
        'Проблемы с загрузкой файлов':
          'Проверьте стабильность интернет-соединения.<br>Убедитесь, что размер файла не превышает лимит.<br>Попробуйте использовать другой браузер.',
        'Восстановление доступа к аккаунту':
          'Нажмите "Забыли пароль?" на странице входа.<br>Введите email и следуйте инструкциям из письма.<br>При проблемах обратитесь в поддержку.',
      },
      selectedProblem: '',
    }
  },
  computed: {
    responseHeader() {
      return this.selectedProblem || this.responseHelpData.response
    },
    responseContent() {
      return this.selectedProblem
        ? this.problemDescriptions[this.selectedProblem]
        : this.responseHelpData.response
    },
  },
  methods: {
    selectProblem(problem) {
      this.selectedProblem = problem
    },
  },
}
</script>

<template>
  <div class="help-panel">
    <header class="help-header">{{ headerHelpData.header }}</header>
    <div class="help-content">
      <div class="help-section">
        <header class="header-caption">{{ filesPanelHelpData.header }}</header>
        <div class="help-caption click" @click="selectProblem(filesPanelHelpData.uploading_files)">
          {{ filesPanelHelpData.uploading_files }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(filesPanelHelpData.downloading_files)"
        >
          {{ filesPanelHelpData.downloading_files }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(filesPanelHelpData.folder_organization)"
        >
          {{ filesPanelHelpData.folder_organization }}
        </div>
        <div class="help-caption click" @click="selectProblem(filesPanelHelpData.shared_access)">
          {{ filesPanelHelpData.shared_access }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(filesPanelHelpData.recover_deleted_files)"
        >
          {{ filesPanelHelpData.recover_deleted_files }}
        </div>
      </div>
      <div class="help-section">
        <header class="header-caption">{{ accountPanelHelpData.header }}</header>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.password_change)"
        >
          {{ accountPanelHelpData.password_change }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.change_of_tariff)"
        >
          {{ accountPanelHelpData.change_of_tariff }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.account_deletion)"
        >
          {{ accountPanelHelpData.account_deletion }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.account_creation)"
        >
          {{ accountPanelHelpData.account_creation }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(accountPanelHelpData.two_factor_authentication)"
        >
          {{ accountPanelHelpData.two_factor_authentication }}
        </div>
      </div>
      <div class="help-section">
        <header class="header-caption">{{ problemsPanelHelpData.header }}</header>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.freeing_up_space)"
        >
          {{ problemsPanelHelpData.freeing_up_space }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.file_not_displayed)"
        >
          {{ problemsPanelHelpData.file_not_displayed }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.contact_support)"
        >
          {{ problemsPanelHelpData.contact_support }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.problems_with_downloading_files)"
        >
          {{ problemsPanelHelpData.problems_with_downloading_files }}
        </div>
        <div
          class="help-caption click"
          @click="selectProblem(problemsPanelHelpData.restore_account_access)"
        >
          {{ problemsPanelHelpData.restore_account_access }}
        </div>
      </div>
    </div>
    <div class="help-response">
      <header class="response-header">{{ responseHeader }}</header>
      <div class="help-response-content" v-html="responseContent"></div>
    </div>
  </div>
</template>

<style scoped>
.help-content {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1rem;
}

.help-section {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 17.5rem;
  width: 20rem;
  border: 1px solid #8c8e93;
  gap: 0.75rem;
}
.header-caption {
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Manrope SemiBold', sans-serif;
}

.help-caption {
  font-size: 1.05rem;
  font-family: 'Manrope Light', sans-serif;
  color: #197ccd;
}

.help-header {
  margin-top: 1.5rem;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  font-family: 'Manrope SemiBold', sans-serif;
}

.response-header {
  font-weight: bold;
  font-size: 1.5rem;
  font-family: 'Manrope SemiBold', sans-serif;
}

.help-response {
  margin: 1rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #8c8e93;
}

.help-response-content {
  margin-top: 1rem;
  font-family: 'Manrope Light', sans-serif;
  font-size: 1.05rem;
  line-height: 1.5;
  color: #d0cece;
}
</style>
