<template>
  <AdminHeader />
  <div class="dashboard-wrapper">
    <div class="container py-5">
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
  </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'

const cards = [
  { title: "TOTAL USERS", description: "Manage and view all registered users." },
  { title: "REGISTERED COMPANIES", description: "Track and approve service bookings." },
  { title: "BOOKING SERVICES", description: "Check recent earnings and revenue data." },
  { title: "Messages", description: "Respond to user queries and messages." }
];
</script>

<style scoped>
.dashboard-wrapper {
  background-image: url('/src/assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.9); /* Optional: for better contrast */
}
.card-title {
  font-size: 1.25rem;
  color: #FE4F2D;
}
</style>
