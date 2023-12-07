<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      // eslint-disable-next-line no-alert
      window.alert('You question was sent successfully');

      this.$router.push('/');
    },
  },

};
</script>

<template>
  <article class="container">
    <h1>Do you have questions?</h1>
    <p>Don't hesitate and write us using the form below!</p>
    <br>
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input id="name" v-model="formData.name" type="text" required>

      <label for="email">Email:</label>
      <input id="email" v-model="formData.email" type="email" required>

      <label for="message">Message:</label>
      <textarea id="message" v-model="formData.message" required />

      <button type="submit">
        Submit
      </button>
    </form>
  </article>
</template>

<style scoped>
.container {
  padding: 50px;
}
</style>
