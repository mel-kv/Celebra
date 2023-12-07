<script>
import { getAllEvents } from '../../dataProviders/events';

import EventCard from '../events/components/EventCard.vue';

export default {
  components: { EventCard },
  // emits: ['seeMore'],
  data() {
    return {
      events: [],
      event: {},

    };
  },
  computed: {
    displayEvents() {
      return this.events;
    },

  },
  async created() {
    this.events = await getAllEvents();
  },
  methods: {
    getEvent(id) {
      this.event = this.events.find((event) => {
        return event.id === id;
      });
      this.$router.push(`/events/${id}`);
    },

  },
};
</script>

<template>
  <div v-if="events.length > 0 ">
    <div class="events">
      <EventCard
        v-for="e in displayEvents"
        :key="e.id"
        :event="e"
        @see-more="getEvent"
      />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
