<script>
import { mapActions, mapState } from 'pinia';
import { useCartEvents } from '../pinia/cartEventStore';
import { getAllEvents } from '../dataProviders/events';

export default {
  setup() {
    const eventStore = useCartEvents();
    return { eventStore };
  },
  data() {
    return {
      eventsInfo: {},
      isLoading: true,

    };
  },

  computed: {
    ...mapState(useCartEvents, ['events']),
    totalSum() {
      let sum = 0;

      this.eventStore.events.forEach((event) => {
        sum += (event.event?.ticket ?? 0) * event.quantity;
      });
      return sum;
    },
  },

  async created() {
    const promises = [];
    this.eventStore.events.forEach((event) => {
      promises.push(getAllEvents(event.id));
    });
    const allEvents = await Promise.all(promises);
    allEvents.forEach((event) => {
      this.eventsInfo[event.id] = event;
    });
    this.isLoading = false;
  },

  methods: {
    ...mapActions(useCartEvents, ['changeQuantity']),
  },
};
</script>

<template>
  <h1 style="text-align: center;">
    Cart
  </h1>
  <Loader v-if="isLoading" />
  <div v-else class="container">
    <article>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Artist</th>

            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in eventStore.events" :key="event.id">
            <td>
              <div style="aspect-ratio: 1/1; width: 5rem; border-radius: 0.5rem; overflow: hidden;">
                <img
                  style="object-fit: cover; width: 100%; height: 100%;"
                  :src="event.event.image"
                  alt=""
                >
              </div>
            </td>
            <td>
              <p style="font-size: 1.25rem;">
                {{ event.event.artist }}
              </p>
              <p style="font-size: 0.75rem;">
                Ticket price: {{ event.event.ticket }}$
              </p>
            </td>
            <td>
              <input
                type="number"
                :value="event.quantity"
                style="width: 5rem;"
                @input="changeQuantity(event.id, $event)"
              >
            </td>
            <td class="price">
              {{ event.event.ticket * event.quantity }}$
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">
              Total:
            </td>
            <td class="price">
              ${{ totalSum }}
            </td>
          </tr>
        </tfoot>
      </table>
    </article>
  </div>
</template>

<style scoped>
table {
  max-width: 720px;
  margin: 0 auto;
}

.imgWrapper {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
