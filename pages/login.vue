<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <form @submit.prevent="loginUser">
      <!-- Email Field -->
      <div class="field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" required placeholder="Enter your email">
      </div>

      <!-- Password Field -->
      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password" required placeholder="Enter your password">
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Submit Button -->
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useFetch } from 'nuxt/app'

const user = ref({
  email: '',
  password: ''
})
const errorMessage = ref('')
const successMessage = ref('')

const loginUser = async () => {
  // Reset error and success messages
  errorMessage.value = ''
  successMessage.value = ''

  // Check if passwords match (if you have a confirmPassword field)
  // if (user.value.password !== confirmPassword.value) {
  //   errorMessage.value = "Passwords do not match."
  //   return
  // }

  const { data, error } = await useFetch('https://8f7532c3-ae66-446a-9029-19b1eeebab3b-00-30hfb3eka4tfa.kirk.replit.dev/login', {
    method: 'POST',
    body: user.value,
  })

  if (error.value) {
    errorMessage.value = 'Failed to login. Please check your credentials.'
  } else {
    // Handle login success
    successMessage.value = 'Login successful! Redirecting...'
    // Redirect or update state as needed, e.g., store auth token
    // setTimeout(() => useRouter().push('/dashboard'), 2000)
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
}

.field input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #ff3860;
  margin-bottom: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  color: #fff;
  background-color: #3273dc;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #276cda;
}
</style>

