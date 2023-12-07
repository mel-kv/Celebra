import { defineStore } from 'pinia';

export const useCartEventStore = defineStore('eventsStore', {
  state: () => ({
    events: [],

  }),
  getters: {

  },

  actions: {
    addEvent(event) {
      this.events.push(event);
    },
  },

});
