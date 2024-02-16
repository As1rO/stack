<template>
  <div class="container">
    <div class="login-container">
      <h1>Login</h1>

      <form>
        <div class="space-y-4">
          <UFormGroup label="Email">
            <UInput
              v-model="email"
              name="emailInput"
              type="email"
              placeholder="email"
              required
            />
          </UFormGroup>

          <UFormGroup label="Email">
            <UInput
              v-model="password"
              name="passwordInput"
              type="password"
              placeholder="password"
              required
            />
          </UFormGroup>

          <UButton
            color="primary"
            variant="solid"
            block
            :loading="loading"
            @click="login"
            >Login</UButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import { useMutation } from '@vue/apollo-composable'
  import gql from 'graphql-tag'
  import { setJwtToken } from '../utils/local-storage.js'

  const email = ref('')
  const password = ref('')

  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          email
        }
        token
      }
    }
  `

  const { mutate: loginMutation, loading } = useMutation(LOGIN_MUTATION)

  const login = async () => {
    if (!email.value || !password.value) return
    try {
      const { data } = await loginMutation({
        email: email.value,
        password: password.value,
      })
      if (data.login.token) {
        setJwtToken(data.login.token)
        navigateTo('/')
      }
    } catch (error) {
      console.error('Error on login', error)
    }
  }
</script>
<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
  .login-container {
    position: relative;
    top: 20%;
    width: 400px;
    height: fit-content;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
