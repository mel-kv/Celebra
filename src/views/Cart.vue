<script>
import { mapState } from 'pinia';
import { useCartEventStore } from '../pinia/cartEventStore';

export default {
  setup() {
    const eventStore = useCartEventStore();
    return { eventStore };
  },

  computed: {
    ...mapState(useCartEventStore, ['test', 'events']),
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
