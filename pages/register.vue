<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="registerUser">
      <!-- Username Field -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input v-model="user.username" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="user.email" required pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" title="Invalid email address" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
      </div>

      <!-- Password Field -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="user.password" required minlength="8" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
      </div>

      <!-- Confirm Password Field -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
          Confirm Password
        </label>
        <input v-model="confirmPassword" required minlength="8" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="Confirm Password">
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 text-red-500">
        {{ errorMessage }}
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-4 text-green-500">
        {{ successMessage }}
      </div>

      <!-- Submit Button -->
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  username: '',
  email: '',
  password: ''
});
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const registerUser = async () => {
  // Check if passwords match
  if (user.value.password !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  try {
    const { data, error } = await useFetch('https://8f7532c3-ae66-446a-9029-19b1eeebab3b-00-30hfb3eka4tfa.kirk.replit.dev/register', {
      method: 'POST',
      body: user.value
    });

    if (error.value) {
      errorMessage.value = error.value.message || 'Registration failed. Please try again.';
      successMessage.value = '';
    } else {
      successMessage.value = 'Registration successful! Redirecting to login...';
      errorMessage.value = '';
      // Clear form fields
      user.value = { username: '', email: '', password: '' };
      confirmPassword.value = '';
      // Redirect to login after a short delay
      setTimeout(() => useRouter().push('/login'), 2000);
    }
  } catch (err) {
    console.error('Registration error:', err);
    errorMessage.value = 'An unexpected error occurred. Please try again.';
    successMessage.value = '';
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 50px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

button[type="submit"] {
  cursor: pointer;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007bff;
  font-size: 1rem;
  line-height: 1.5;
  transition: background-color 0.15s ease-in-out;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.text-red-500 {
  color: #f56565;
}

.text-green-500 {
  color: #48bb78;
}
</style>