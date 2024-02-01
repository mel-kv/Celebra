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
      selected_country: '',
      selected_artist: '',
      countries: null,
      artists: null,

    };
  },
  computed: {
    displayEvents() {
      return this.events.filter((e) => {
        return (
          (!this.selected_country || e.country === this.selected_country)
          && (!this.selected_artist || e.artist === this.selected_artist)
        );
      });
    },
  },
  async created() {
    this.events = await getAllEvents();
    this.countries = new Set(this.events.map(event => event.country));
    this.artists = new Set(this.events.map(event => event.artist));
  },
  methods: {
    getEvent(id) {
      this.event = this.events.find((event) => {
        return event.id === id;
      });
      this.$router.push(`/events/${id}`);
    },
    select_artist(a) {
      this.selected_artist = a;
    },
    select_country(c) {
      this.selected_country = c;
    },

  },

};
</script>

<template>
  <AppFilters
    :countries="countries" :entertainers="artists" @filter-artist="select_artist" @filter-country="select_country"
  />
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
  <div v-if="displayEvents.length === 0" class="no-events">
    There are no events corresponding to the chosen criteria. Try again!
  </div>
</template>

<style scoped>
.no-events {
  font-size: 32px;
}
.events {
  display: grid;
  gap: 1rem;
  justify-content: space-around;
}
@media screen and (max-width: 600px) {
  .events {
  grid-template-columns: repeat(1, 1fr);

}
}

@media screen and (max-width: 800px) and (min-width: 601px) {
  .events {
    grid-template-columns: repeat(2, minmax(0, 1fr));

}}

@media screen and (max-width: 1200px) and (min-width: 801px){
  .events {
    grid-template-columns: repeat(3, minmax(0, 1fr));

}}
@media screen and (max-width: 1600px) and (min-width: 1201px)  {
  .events {
    grid-template-columns: repeat(4, minmax(0, 1fr));

}}
@media screen and (min-width: 1601px)  {
  .events {
    grid-template-columns: repeat(5, minmax(0, 1fr));

}}
</style>
