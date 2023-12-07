<script>
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
  methods: {

  },

};
</script>

<template>
  <article>
    <div class="info" @checkVacant="isSoldOut(event.vacants)">
      <img :src="event.image" alt="img">

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

    <button @click="$emit('seeMore', event.id)">
      See more...
    </button>
  </article>
</template>

<style scoped>
article{
  position: relative;
}
.info {
  height: 550px;

}
.icon{
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
}

img {
    float: left;
    width:  100%;
    height: 280px;
    object-fit: cover;
    border-radius: 10px;
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
