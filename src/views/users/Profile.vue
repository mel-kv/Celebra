<script>
import { mapState } from 'pinia';
import { useUserStore } from '../../pinia/userStore';

export default {
  computed: {
    ...mapState(useUserStore, ['profile', 'isAuthenticated']),
  },
  created() {
    if (!this.isAuthenticated)
      this.$router.push('/login');
  },
};
</script>

<template>
  <article class="card">
    <h1>My Profile</h1>
    <img :src="profile.image " alt="">
    <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
    <ul>
      <li>Email: <b>{{ profile.email }}</b></li>
      <li>Gender: <b>{{ profile.gender }}</b></li>
      <li>Username: <b>{{ profile.username }}</b></li>
    </ul>
  </article>
</template>

<style scoped>
.card{
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.card img {
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
  border: 2px solid var(--primary);
  margin-bottom: 30px;
}
li {
  list-style: none;
}
.card h1 {
  text-align: start;
  margin-bottom: 50px;
}
</style>
