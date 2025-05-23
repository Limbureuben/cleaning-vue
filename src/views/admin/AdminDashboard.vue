<template>
    <AdminHeader />
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 mb-4" v-for="(card, index) in cards" :key="index">
        <div class="card shadow border-0 h-100">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">{{ card.title }}</h5>
            <p class="card-text text-muted">{{ card.description }}</p>
            <button class="btn btn-outline-primary mt-3">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminHeader from './AdminHeader.vue';

const cards = [
  { title: "Total Users", description: "Manage and view all registered users." },
  { title: "Bookings", description: "Track and approve service bookings." },
  { title: "Revenue", description: "Check recent earnings and revenue data." },
  { title: "Messages", description: "Respond to user queries and messages." }
];
</script>

<style scoped>
.card {
  border-radius: 2px;
}
.card-title {
  font-size: 1.25rem;
  color: #FE4F2D;
}
</style>
