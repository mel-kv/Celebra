<script>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    RouterView,
  },
};
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>
  <AppFooter />
</template>

<style scoped>
main {

  min-height: calc(100vh - 200px);
}
.wrapper {
  margin-right: 20px;
  margin-left: 20px;
}
</style>

