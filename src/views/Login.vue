<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginError, loginSuccess, tokenName } from '@/utils/config.js'
import { useRoute, useRouter } from 'vue-router'
import { loginApi } from '@/api/authentication.js'
import { error, success } from '@/utils/message.js'

const router = useRouter()
const route = useRoute()
const username = ref('')
const password = ref('')

const login = () => {
  loginApi({
    identifier: username.value,
    password: password.value
  })
    .then((data) => {
      sessionStorage.setItem(tokenName, data.jwt)
      router.push(route.query.redirect || '/')
      success(loginSuccess)
    })
    .catch((err) => {
      console.log(err)
      error(loginError)
    })
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  margin-bottom: 5px;
  display: inline-block;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 8px;
  margin: 5px 0 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
