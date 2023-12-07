<script>
import { getAllEvents } from '../../dataProviders/events';

export default {
  data() {
    return {
      events: [],
      event: {},
      id: Number(this.$route.params.id),
      quanity: null,
    };
  },

  async created() {
    this.events = await getAllEvents();
    this.event = this.events.find(event => event.id === this.id);
  },

  methods: {
    buy() {},
  },
};
</script>

<template>
  <article>
    <div v-if="event" class="grid">
      <div>
        <img :src="event.image" alt="img">
      </div>
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
        <p>Time: <strong>{{ event.time }}</strong></p>

        <p>Ticket price: ${{ event.ticket }}</p>
        <br>
        <div class="grid">
          <input v-model="quanity" type="number" name="quantity" placeholder="Quantity"><button @click="buy">
            Buy
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.smallNum {
  color: #ba4493;
  font-size: smaller;
}

.zero {
  color: red;
  font-size: smaller;

}
</style>
