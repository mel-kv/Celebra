import { defineStore } from 'pinia';

export const useCartEvents = defineStore('eventsInCartStore', {
  state: () => ({
    eventsInCart: [],

  }),
  getters: {

  },

  actions: {
    addEvent(event) {
      this.eventsInCart.push(event);
    },
  },

});
