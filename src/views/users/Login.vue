<script>
import { mapActions } from 'pinia';
import { loginUser } from '../../dataProviders/auth';
import { useUserStore } from '../../pinia/userStore';

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
    ...mapActions(useUserStore, ['setProfile']),

    async onSubmit() {
      this.isLoading = true;
      const userData = await loginUser(this.user);

      if (userData) {
        this.setProfile(userData);
        this.$router.push('/profile');
      }
      else {
        console.log(userData);
        this.user.username = '';
        this.user.password = '';
        this.isLoading = false;
        // eslint-disable-next-line no-alert
        window.alert('Wrong username or password!!! Try again!');
      }
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
  <article class="demo">
    # Added only for the demonstration purposes during the current presentation:
    <div>
      username: username: 'kminchelle'
    </div>
    <div>
      password: '0lelplR'
    </div>
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
.demo > div{
  color: var(--secondary)

}
</style>
