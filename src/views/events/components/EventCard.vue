<script>
import { mapActions, mapState } from 'pinia';
import { useCartEvents } from '../../../pinia/cartEventStore';
import { useUserStore } from '../../../pinia/userStore';

export default {
  props: {
    event: {
      type: Object,
      required: true,
      default: () => ({
        id: -1,
        artist: 'ARTIST',
        eventType: 'EVENT TYPE',
        image: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
        location: 'LOCATION',
        state: null,
        country: 'COUTRY',
        date: 'DATE',
        time: 'TIME',
        ticket: 0,
        vacants: 0,
      }),
      soldOut: false,
    },
  },
  emits: ['seeMore'],

  computed: {
    ...mapState(useCartEvents, ['getEvents']),
    ...mapState(useUserStore, ['favouritesIds', 'isAuthenticated']),

    isInFavourites() {
      return this.favouritesIds.includes(this.event.id);
    },
  },
  methods: {
    ...mapActions(useUserStore, ['addFavEvent', 'removeFavEvent']),
    onFavouriteClick() {
      if (this.isInFavourites)
        this.removeFavEvent(this.event.id);

      else
        this.addFavEvent(this.event.id);
    },
  },

};
</script>

<template>
  <article>
    <div class="info" @checkVacant="isSoldOut(event.vacants)">
      <span v-if="isInFavourites" class="icon">❤️</span>
      <img :src="event.image" alt="img">
      <div>
        <h2>{{ event.artist }}</h2>
        <p v-if="event.vacants === 0" class="zero">
          SOLD OUT
        </p>
        <p v-else-if="event.vacants < 30" class="smallNum">
          Hurry up! Only {{ event.vacants }} ticket(s) left!!!
        </p>
        <p>
          <strong>{{ event.eventType }}</strong>
        </p>

        <p>Location: <strong>{{ event.location }}</strong></p>
        <p v-if="event.state">
          State: <strong>{{ event.state }}</strong>
        </p>
        <p>Country: <strong>{{ event.country }}</strong></p>
        <p>Date: <strong>{{ event.date }}</strong></p>
      </div>
    </div>

    <button @click="$emit('seeMore', event.id)">
      See more...
    </button>
    <button
      v-if="isAuthenticated"
      class="secondary outline"
      @click="onFavouriteClick"
    >
      {{ isInFavourites ? 'Remove from favourites' : 'Add to favourites' }}
    </button>
  </article>
</template>

<style scoped>
article {
  position: relative;
}

.info {
  height: 700px;
  display: grid;
}

.icon {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
}

img {
  float: left;
  width: 350px;
  height: 300px;

  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}

h2 {
  transition: color 0.3s ease-in-out;
}

h2:hover {
  color: var(--primary);
}

.smallNum {
  color: #ba4493;
  font-size: smaller;
}

.zero {
  color: red;
  font-size: smaller;
}
</style>
