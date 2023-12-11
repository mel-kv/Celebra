<!-- eslint-disable vue/return-in-computed-property -->
<script>
import AppFilters from '../../components/AppFilters.vue';

import { getAllEvents } from '../../dataProviders/events';

import EventCard from '../events/components/EventCard.vue';

export default {
  components: { EventCard, AppFilters },

  data() {
    return {
      events: [],
      event: {},
      selected_type: '',
      selected_artist: '',
      categories: null,
      artists: null,

    };
  },
  computed: {
    displayEvents() {
      return this.events.filter((e) => {
        return (
          (!this.selected_type || e.eventType === this.selected_type)
          && (!this.selected_artist || e.artist === this.selected_artist)
        );
      });
    },
  },
  async created() {
    this.events = await getAllEvents();
    this.categories = new Set(this.events.map(event => event.eventType));
    this.artists = new Set(this.events.map(event => event.artist));
  },
  methods: {
    getEvent(id) {
      this.event = this.events.find((event) => {
        return event.id === id;
      });
      this.$router.push(`/events/${id}`);
    },
    select_artist(artist) {
      this.selected_artist = artist;
    },
    select_filter(type) {
      this.selected_type = type;
    },

  },

};
</script>

<template>
  <AppFilters :types="categories" :entertainers="artists" @filter-artist="select_artist" @filter-type="select_filter" />
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
@media screen and (max-width: 600px) {
  .events {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

}
}

@media screen and (max-width: 800px) and (min-width: 601px) {
  .events {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}}

@media screen and (max-width: 1200px) and (min-width: 801px){
  .events {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}}
@media screen and (max-width: 1600px) and (min-width: 1201px)  {
  .events {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}}
@media screen and (min-width: 1601px)  {
  .events {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}}
</style>
