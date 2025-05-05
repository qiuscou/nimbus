<script>
export default {
  name: 'FormSignUp',
  props: {
    formData: Object,
    name: String,
    surname: String,
    patronymic: String,
    dateOfBirth: String,
    email: String,
    password: String,
  },
  emits: [
    'update:name',
    'update:surname',
    'update:patronymic',
    'update:dateOfBirth',
    'update:email',
    'update:password',
    'submit',
  ],
}
</script>

<template>
  <div class="signupWelcomeContainer">
    <span id="signupHeader">{{ formData.welcome }}</span>
    <div class="signupInputRow">
      <div class="signupInputGroup">
        <span class="signupText">{{ formData.surname }}</span>
        <input
          class="signupInput"
          type="text"
          :value="surname"
          @input="$emit('update:surname', $event.target.value)"
        />
      </div>
      <div class="signupInputGroup">
        <span class="signupText">{{ formData.name }}</span>
        <input
          class="signupInput"
          type="text"
          :value="name"
          @input="$emit('update:name', $event.target.value)"
        />
      </div>
    </div>
    <div class="signupInputRow">
      <div class="signupInputGroup">
        <span class="signupText">{{ formData.patronymic }}</span>
        <input
          class="signupInput"
          type="text"
          :value="patronymic"
          @input="$emit('update:patronymic', $event.target.value)"
        />
      </div>
      <div class="signupInputGroup">
        <span class="signupText">{{ formData.birth_date }}</span>
        <input
          class="signupInput"
          type="date"
          :value="dateOfBirth"
          @input="$emit('update:dateOfBirth', $event.target.value)"
        />
      </div>
    </div>
    <div class="signupInputRow">
      <div class="signupInputGroup">
        <span class="signupText">{{ formData.email }}</span>
        <input
          class="signupInput"
          type="email"
          :value="email"
          @input="$emit('update:email', $event.target.value)"
        />
      </div>
      <div class="signupInputGroup">
        <span class="signupText">{{ formData.password }}</span>
        <input
          class="signupInput"
          type="password"
          :value="password"
          @input="$emit('update:password', $event.target.value)"
        />
      </div>
    </div>
    <button class="click" id="signupButton" @click="$emit('submit')">
      {{ formData.sign_up }}
    </button>
  </div>
</template>

<style src="../styles/moduleSignUp.css" scoped></style>
