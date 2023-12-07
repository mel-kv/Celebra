<template>
  <div class="welcome-container">
    <h1>Welcome to CELABRA </h1>
    <p>Discover and explore upcoming music events in your area!</p>
    <router-link to="/events" class="explore-btn">
      Explore Events
    </router-link>
  </div>
</template>

<style scoped>
.welcome-container {
  text-align: center;
  margin: 100px auto;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.explore-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: var(--primary);
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.explore-btn:hover {
  background-color: var(--secondary);
}
</style>
