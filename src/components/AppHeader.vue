<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapStores } from 'pinia';
import { useUserStore } from '../pinia/userStore';
import { useCartEvents } from '../pinia/cartEventStore';

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      currentPath: null,

    };
  },
  computed: {
    ...mapStores(useUserStore, ['profile', 'isAuthenticated']),
    ...mapStores(useCartEvents, ['eventsInCart']),
  },
  mounted() {
    this.currentPath = this.$route.path;
  },
  methods: {
    eventPathChecker() {
      console.log(this.currentPath);
    },
    ...mapActions(useUserStore, ['logout']),
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
      <li>
        <RouterLink to="/">
          Home
        </RouterLink>
      </li>
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
      <li v-if="isAuthenticated">
        <RouterLink to="/profile" class="profileLink">
          Profile <img :src="profile.image" alt="">
        </RouterLink>
      </li>
      <li v-if="isAuthenticated">
        <RouterLink to="/favourites">
          My favourites
        </RouterLink>
      </li>
      <li v-if="isAuthenticated">
        <RouterLink to="/" @click="logout">
          Logout
        </RouterLink>
      </li>
      <li v-else>
        <RouterLink to="/login">
          Login
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/cart" role="button">
          Cart
          <!-- Cart <span v-if="eventsInCart">
            ({{ eventsInCart }})
          </span> -->
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
