import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Events from '../views/Events/Events.vue';
import EventDetails from '../views/Events/EventDetails.vue';
import Contacts from '../views/Contacts.vue';
import Cart from '../views/Cart.vue';
import Register from '../views/users/Register.vue';
import Login from '../views/users/Login.vue';
import Profile from '../views/users/Profile.vue';
import Favorites from '../views/events/Favorities.vue';

import { useUserStore } from '../pinia/userStore';

function validateUser() {
  const userStore = useUserStore();
  return userStore.isAuthenticated ? userStore.isAuthenticated : { path: '/login' };
};

const routes = [
  { path: '/', component: Home },
  { path: '/events', component: Events },
  { path: '/contacts', component: Contacts },
  { path: '/cart', component: Cart },
  { path: '/register', component: Register },
  { path: '/login',component: Login,
beforeEnter: () => {
      const userStore = useUserStore();
      return userStore.isAuthenticated ? { path: '/profile' } : true;
    } },
  { path: '/favorites', component: Favorites },
  { path: '/events/:id', component: EventDetails, name: 'details', props: true },
  { path: '/profile', component: Profile, beforeEnter: validateUser },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
