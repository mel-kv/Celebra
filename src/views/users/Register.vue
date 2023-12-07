<script>
import { useVuelidate } from '@vuelidate/core';
import { alphaNum, email, maxLength, minLength, required, sameAs } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isLoading: false,
    };
  },
  validations() {
    return {
      user: {
        firstName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(10),
        },
        lastName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(10),
        },
        email:
      { required, email },
        password: {
          required,
          alphaNum,
        },
        confirmPassword: {
          required,
          sameAs: sameAs(this.user.password),
        },
      },
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.v$.$validate();
      console.log('Is form valid?', isValid);
      // if (isValid)
      //   this.$emit('onSubmit', this.user);
    },
  },

};
</script>

<template>
  <article class="container">
    <h1>Register</h1>
    <h6>
      Do you have a profile? Go to <RouterLink to="/login">
        Log in
      </RouterLink>
    </h6>

    <form @submit.prevent="onSubmit">
      <div>
        <label for="firstName">First Name:</label>
        <input
          id="firstName"
          v-model="user.firstName"
          type="text"
          name="firstName"
          :disabled="isLoading"
        >
        <div v-for="error of v$.user.firstName.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input
          id="lastName"
          v-model="user.lastName"
          type="text"
          name="lastName"
          :disabled="isLoading"
        > <div v-for="error of v$.user.lastName.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          name="email"
          :disabled="isLoading"
        > <div v-for="error of v$.user.email.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          name="password"
          :disabled="isLoading"
        > <div v-for="error of v$.user.password.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <label for="confirm-password">Confirm Password:</label>
        <input
          id="confirm-password"
          v-model="user.confirmPassword"
          type="password"
          name="confirm-password"
          :disabled="isLoading"
        > <div v-for="error of v$.user.confirmPassword.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
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
.error-msg {
  color: red;
  font-style: italic;
  font-size: small;
}
</style>
