<script>
import { mapActions, mapState } from 'pinia';
import { getAllEvents } from '../../dataProviders/events';
import { useCartEvents } from '../../pinia/cartEventStore';
import { useUserStore } from '../../pinia/userStore';

export default {
  emits: ['onAddToCart'],
  data() {
    return {
      events: [],
      event: {},
      id: Number(this.$route.params.id),
      quantity: 0,
      errorMsg: '',
    };
  },
  computed: {
    ...mapState(useCartEvents, ['getEvent']),
    ...mapState(useUserStore, ['favouritesIds', 'isAuthenticated']),
    isDisabled() {
      const current = this.getProduct(this.product.id);
      if (!current)
        return false;

      return current.quantity >= this.product.stock;
    },
    isInFavourites() {
      return this.favouritesIds.includes(this.product.id);
    },
  },
  async created() {
    this.events = await getAllEvents();
    this.event = this.events.find(event => event.id === this.id);
  },
  methods: {
    ...mapActions(useCartEvents, ['addEvent']),
    ...mapActions(useUserStore, ['addFavEvent', 'removeFavEvent']),
    onFavouriteClick() {
      if (this.isInFavourites)
        this.removeFavEvent(this.event.id);

      else
        this.addFavEvent(this.event.id);
    },
    addToCart() {
      if (this.quantity <= this.event.vacants) {
        this.addEvent(this.event, this.event.id, this.quantity);
        this.event.vacants -= this.quantity;
      }
      else { this.errorMsg = `Only ${this.event.vacants} tickets left! Cannot buy more than that.`; }
    },
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

        <div v-if="isAuthenticated && event.vacants > 0">
          <div class="grid">
            <input
              v-model="quantity"
              type="number"
              name="quantity"
              placeholder="Quantity*"
              min="1"
            >
            <button @click="addToCart">
              Add to Cart
            </button>
          </div> <p v-if="errorMsg" class="errorMsg">
            {{ errorMsg }}
          </p>
        </div>
        <div v-if="!isAuthenticated && event.vacants > 0">
          If you want to buy tickets you must <RouterLink to="/login">
            Log In
          </RouterLink> first!
        </div>
        <div v-if="event.vacants === 0">
          Sorry! The tickets for the current event are SOLD OUT! Find more <RouterLink to="/events">
            here.
          </RouterLink>
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

.note {
 font-style: italic;
 font-size: 0.75rem;
}
.errorMsg {
  color: var(--primary);
  font-style: italic;
}

img {
  max-width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}
</style>
