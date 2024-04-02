<template>
  <div class="events-container">
    <h1>Events</h1>
    <!-- Category Filter -->
    <select v-model="selectedCategory" @change="fetchEvents">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>

    <!-- Events List -->
    <div v-if="events.length">
      <div v-for="event in events" :key="event.id" class="event">
        <h2>{{ event.name }}</h2>
        <p>{{ event.description }}</p>
        <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
        <p>Location: {{ event.location }}</p>
        <p>Tickets Remaining: {{ event.tickets_remaining }}</p>
      </div>
    </div>
    <div v-else>
      <p>No events found.</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useFetch } from 'nuxt/app';

const selectedCategory = ref('');
const { data: events, execute: fetchEvents } = useFetch('https://8f7532c3-ae66-446a-9029-19b1eeebab3b-00-30hfb3eka4tfa.kirk.replit.dev/events', {
  params: {
    category: selectedCategory.value
  }
}).json();

// Example categories (could also be fetched from the API)
const categories = ref(['Music', 'Sports', 'Technology']);

// Fetch events whenever the selected category changes
watch(selectedCategory, () => {
  fetchEvents({
    params: {
      category: selectedCategory.value
    }
  });
});
</script>
<style scoped>
.events-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.event {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.event h2 {
  margin: 0;
}

.event p {
  margin: 10px 0;
}
</style>
