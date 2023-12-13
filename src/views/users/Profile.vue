<script>
import { mapState } from 'pinia';
import { useUserStore } from '../../pinia/userStore';
import { getAllEvents } from '../../dataProviders/events';

export default {

  data() {
    return {
      events: [],

    };
  },
  computed: {
    ...mapState(useUserStore, ['profile', 'isAuthenticated', 'favouritesIds']),
    getFavEvents() {
      const favEvents = [];
      for (let index = 0; index < this.favouritesIds.length; index++) {
        const eventID = this.favouritesIds[index];
        if (this.getEvent(eventID)) {
          const matchEv = this.getEvent(eventID);
          favEvents.push(matchEv);
        }
      }
      return favEvents;
    },
  },

  async created() {
    this.events = await getAllEvents();
    if (!this.isAuthenticated)
      this.$router.push('/login');
  },
  methods: {
    getEvent(id) {
      this.event = this.events.find((event) => {
        return event.id === Number(id);
      });
      return this.event;
    },

  },

};
</script>

<template>
  <article class="card">
    <h1>My Profile</h1>
    <img :src="profile.image " alt="">
    <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
    <ul>
      <li>Email: <b>{{ profile.email }}</b></li>
      <li>Gender: <b>{{ profile.gender }}</b></li>
      <li>Username: <b>{{ profile.username }}</b></li>
    </ul>
  </article>

  <div v-if="events.length && favouritesIds.length > 0" class="events">
    <div v-for="fav in getFavEvents" :key="fav">
      <article class="eventCard">
        <img :src="fav.image" alt="img">
        <h2>{{ fav.artist }}</h2>
        <p>Location: <strong>{{ fav.location }}</strong></p>
        <p v-if="fav.state">
          State: <strong>{{ fav.state }}</strong>
        </p>
        <p>Country: <strong>{{ fav.country }}</strong></p>
        <p>Date: <strong>{{ fav.date }}</strong></p>
        <p>Time: <strong>{{ fav.time }}</strong></p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.card img {
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--primary);
  margin-bottom: 30px;
  transition: transform 0.3s ease-in-out;
}

.card img:hover {
  transform: scale(1.1);
}

.card li {
  list-style: none;
}

.card h1 {
  text-align: start;
  margin-bottom: 50px;
}

.eventCard {
  height: 700px;
  display: grid;
}

.eventCard img {
  float: left;
  width: 350px;
  height: 300px;
  align-self: center;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s ease-in-out;
}

.eventCard img:hover {
  transform: scale(1.1);
}

.eventCard h2 {
  transition: color 0.3s ease-in-out;
}

.eventCard:hover h2 {
  color: var(--primary);
}

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
  }
}

@media screen and (max-width: 1200px) and (min-width: 801px) {
  .events {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media screen and (max-width: 1600px) and (min-width: 1201px) {
  .events {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

@media screen and (min-width: 1601px) {
  .events {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
}
</style>
