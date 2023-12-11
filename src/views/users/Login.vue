<script>
import { loginUser } from '../../dataProviders/auth';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      const userData = await loginUser(this.user);
      if (userData)
        this.$router.push('/profile');
      else
        this.user.username = '';
      this.user.password = '';

      this.isLoading = false;
      window.alert('Wrong username or password!!! Try again!');
    },
  },
};
</script>

<template>
  <article class="container">
    <h1>Sign in</h1>
    <h6>
      New to Celabra? <RouterLink to="/register">
        Sign Up
      </RouterLink>
    </h6>

    <form @submit.prevent="onSubmit">
      <div>
        <label for="username">Username:</label>
        <input
          id="username"
          v-model="user.username"
          name="username"
          :disabled="isLoading"
          required
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          name="password"
          :disabled="isLoading"
          required
        >
      </div>
      <button v-if="isLoading" aria-busy="true">
        Please wait…
      </button>
      <button v-else type="submit" :disabled="isLoading">
        Log in
      </button>
    </form>
  </article>
</template>

<style scoped>
.container {
  display: grid;
  padding: 50px;

}
.wrapper {
  width: 60%;
}
</style>
