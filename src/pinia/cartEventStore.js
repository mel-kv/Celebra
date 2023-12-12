import { defineStore } from 'pinia';

export const useCartEvents = defineStore('eventsStore', {
  state: () => ({
    events: [],
  }),
  getters: {
    getEvent: (state) => {
      return eventId => state.events.find(event => event.id === eventId);
    },
  },

  actions: {
    addEvent(event, selectedId, selectedQuantity) {
      const eventsInCard = this.events.find(event => event.id === selectedId);
      if (!eventsInCard) {
        this.events.push({ event, quantity: selectedQuantity });
        console.log(this.events);
      }
      else { eventsInCard.quantity += selectedQuantity; }
    },
    changeQuantity(eventId, event) {
      const qty = Number(event.target.value) ?? 0;
      const eventsInCard = this.events.find(event => event.id === eventId);
      if (!eventsInCard)
        return;
      if (qty > 1)
        eventsInCard.quantity = qty;

      else
        this.events = this.events.filter(event => event.id !== eventId);
    },

  },
});
