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

const routes = [
  { path: '/', component: Home },
  { path: '/events', component: Events },
  { path: '/contacts', component: Contacts },
  { path: '/cart', component: Cart },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/favorites', component: Favorites },
  { path: '/events/:id', component: EventDetails, name: 'details', props: true },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
