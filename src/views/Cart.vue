<script>
import { mapState } from 'pinia';
import { useCartEvents } from '../pinia/cartEventStore';

export default {
  setup() {
    const eventStore = useCartEvents();
    return { eventStore };
  },

  computed: {
    ...mapState(useCartEvents, ['test', 'events']),
  },
  mounted() {
    console.log(this.eventStore.events);
  },

  methods: {
    addMe() {
      this.events.push('Mel');
      console.log(this.events);
    },
    resetCard() {
      this.eventStore.$reset();
    },
  },
};
</script>

<template>
  <h1>Cart</h1>
  <button @click="addMe">
    Click {{ events }}
  </button>
</template>

<style scoped>

</style>
