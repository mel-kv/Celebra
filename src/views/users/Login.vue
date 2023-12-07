<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      console.log(this.user, 'onSubmit');
      this.$router.push('/profile');
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
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          name="email"
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
      <button type="submit" :disabled="isLoading">
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
