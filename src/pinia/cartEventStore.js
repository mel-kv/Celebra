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
      const eventInCart = this.events.find(event => event.event.id === selectedId);
      if (!eventInCart)
        this.events.push({ event, quantity: selectedQuantity });

      else eventInCart.quantity += selectedQuantity;
    },
    changeQuantity(eventId, e) {
      const qty = Number(e.target.value) ?? 0;
      const eventInCart = this.events.find(ev => ev.event.id === eventId);

      if (!eventInCart)
        return;

      if (qty > 0)

        eventInCart.quantity = qty;

      else
        this.events = this.events.filter(ev => ev.event.id !== eventId);
    },
  },
});
