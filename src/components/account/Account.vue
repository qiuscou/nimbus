<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'AccountApp',
  data() {
    return {
      personalDataPanelAccountData: {
        header: 'Личные данные',
        snp: 'Фамилия, имя, отчество',
        birth_date: 'Дата рождения',
        gender: 'Пол',
        country: 'Страна',
      },
      securityPanelAccountData: {
        header: 'Безопасность',
        email: 'Email',
        phone: 'Номер телефона',
        password: 'Пароль',
        delete_account: 'Удалить аккаунт',
        delete_account_description:
          'После удаления вы сможете восстановить\nаккаунт в течение 30 дней.',
        logout: 'Выйти из аккаунта',
        logout_description: 'Рекомендуется после использования на\nчужом устройстве.',
      },
      buttonAccountData: {
        save: 'Сохранить',
        cancel: 'Отменить',
      },
    }
  },
}
</script>

<template>
  <div class="account-panel">
    <div class="account-personal-data">
      <div class="account-header">{{ personalDataPanelAccountData.header }}</div>
      <div class="account-caption-grey">{{ personalDataPanelAccountData.snp }}</div>
      <div class="account-user-data">Краснов Игорь Алексеевич</div>
      <div class="account-caption-grey">{{ personalDataPanelAccountData.birth_date }}</div>
      <div class="account-user-data">18 января 2005</div>
      <div class="account-caption-grey">{{ personalDataPanelAccountData.gender }}</div>
      <div class="account-user-data">Мужской</div>
      <div class="account-caption-grey">{{ personalDataPanelAccountData.country }}</div>
      <div class="account-user-data">Россия</div>
      <div class="account-buttons-container">
        <button class="account-button-blue click">{{ buttonAccountData.save }}</button>
        <button class="account-button-grey click">{{ buttonAccountData.cancel }}</button>
      </div>
    </div>
    <div class="account-security">
      <div class="account-header">{{ securityPanelAccountData.header }}</div>
      <div class="account-caption-grey">{{ securityPanelAccountData.email }}</div>
      <div class="account-user-data">krasnov_ia@mail.ru</div>
      <div class="account-caption-grey">{{ securityPanelAccountData.phone }}</div>
      <div class="account-user-data">+7 (932) 470 ** - **</div>
      <div class="account-caption-grey">{{ securityPanelAccountData.password }}</div>
      <div class="account-user-data">********</div>
      <div class="account-caption-red click">{{ securityPanelAccountData.delete_account }}</div>
      <div class="account-description">
        {{ securityPanelAccountData.delete_account_description }}
      </div>
      <div class="account-caption-red click">{{ securityPanelAccountData.logout }}</div>
      <div class="account-description">{{ securityPanelAccountData.logout_description }}</div>
      <div class="account-buttons-container">
        <button class="account-button-blue click">{{ buttonAccountData.save }}</button>
        <button class="account-button-grey click">{{ buttonAccountData.cancel }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-user-data {
  font-family: 'Manrope Medium', sans-serif;
  font-size: 1.15rem;
  color: #2c2d2e;
}

.account-button-blue {
  background-color: #197ccd;
  color: #ffffff;
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 2.25rem;
}

.account-button-grey {
  background-color: #e3e5ea;
  color: #2c2d2e;
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 2.25rem;
  margin-left: 1rem;
}

.account-personal-data,
.account-security {
  position: relative;
}

.account-personal-data > div:last-child,
.account-security > div:last-child {
  position: absolute;
  bottom: 2rem;
}

.account-header {
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Manrope SemiBold', sans-serif;
}

.account-panel {
  padding: 2rem;
  display: flex;
  gap: 2rem;
}

.account-caption-grey {
  font-size: 1.05rem;
  font-family: 'Manrope Regular', sans-serif;
  color: #d0cece;
}

.account-caption-red {
  font-size: 1.15rem;
  font-family: 'Manrope Medium', sans-serif;
  color: #f95454;
}

.account-description {
  font-size: 0.95rem;
  font-family: 'Manrope Regular', sans-serif;
  color: #d0cece;
  white-space: pre-line;
}

.account-personal-data,
.account-security {
  position: relative;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 38rem;
  width: auto;
  border: 1px solid #8c8e93;
  gap: 0.55rem;
}
</style>
