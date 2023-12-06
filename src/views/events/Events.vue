<script>
import { events } from './components/events.json';
import EventCard from './EventCard.vue';

export default {
  components: { EventCard },
  emits: ['seeMore'],
  data() {
    return {
      events,

    };
  },
  computed: {
    displayEvents() {
      return this.events;
    },
  },
};
</script>

<template>
  <div v-if="events.length > 0">
    <div class="events">
      <EventCard
        v-for="event in displayEvents"
        :key="event.id"
        :event="event"
        @seeMore="$emit('seeMore', $event)"
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
