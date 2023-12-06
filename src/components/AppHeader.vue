<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      currentPath: null,
    };
  },
  mounted() {
    this.currentPath = this.$route.path;
  },
  methods: {
    eventPathChecker() {
      console.log(this.currentPath);
    },
  },

};
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">
          <img src="https://www.celabra.com/_nuxt/img/blue.acab14a.png" alt="Celabra logo" class="logo">
        </RouterLink>
      </li>
    </ul>

    <ul>
      <RouterLink to="/">
        Home
      </RouterLink>
      <li>
        <RouterLink to="/events">
          Events
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/contacts">
          Contacts
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/login">
          Login
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/cart">
          <button>Cart</button>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.logo {

  height: 50px;
  width: auto;
}
</style>
