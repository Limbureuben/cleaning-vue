<template>
  <OrganizationHeader />
  <div class="dashboard-wrapper">
    <div class="container py-5">
      <transition-group name="card-fade-slide" tag="div" class="row">
        <div
          class="col-md-6 mb-4"
          v-for="(card, index) in cards"
          :key="card.title"
        >
          <div class="card shadow border-0 hover-effect">
            <div class="card-body text-center d-flex flex-column justify-content-between">
              <div>
                <i :class="card.icon" class="card-icon mb-3 fs-1 text-primary"></i>
                <h5 class="card-title fw-bold">{{ card.title }}</h5>
                <h1 class="display-5 fw-bold">{{ card.count }}</h1>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OrganizationHeader from './OrganizationHeader.vue';

const totalCleaners = ref(0)

onMounted(() => {
  fetchTotalCleaners();
});

const fetchTotalCleaners = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/staff/cleaners/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    totalCleaners.value = data.total_cleaners
  } catch (err) {
    console.error('Failed to fetch cleaner count', err)
  }
}

const cards = ref([
  {
    title: "TOTAL CLEANERS",
    icon: "fas fa-users",
    count: totalCleaners
  },
  {
    title: "AVAILABLE BOOKING",
    icon: "fas fa-building",
    count: ref(0) // You can replace with actual data later
  },
  {
    title: "BOOKING SERVICES",
    icon: "fas fa-calendar-check",
    count: ref(0)
  },
  {
    title: "MESSAGES",
    icon: "fas fa-envelope",
    count: ref(0)
  }
])

// const cards = [
//   { title: "TOTAL CLEANER", description: "Manage all Accounts of Registered users in this platform.", icon: "fas fa-users" },
//   { title: "AVAILABLE BOOKING", description: "These are the Registered Companies that ", icon: "fas fa-building" },
//   { title: "BOOKING SERVICES", description: "Check and Manage bookings available in different companies", icon: "fas fa-calendar-check" },
//   { title: "MESSAGES", description: "Check Messages sent by the users", icon: "fas fa-envelope" }
// ];


</script>

<style scoped>
.dashboard-wrapper .card {
  border-radius: 6px;
  transition: all 0.3s ease;
  overflow: hidden;
  animation: cardAppear 0.5s ease-out;
  padding: 15px;
  height: 180px; /* smaller height */
}

.dashboard-wrapper .card-body {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

.dashboard-wrapper .card-icon {
  font-size: 1.8rem; /* smaller icon */
  color: #06923E;
  margin-bottom: 10px;
}

.dashboard-wrapper .card-title {
  font-size: 1rem;
  color: #06923E;
  margin-bottom: 0.5rem;
}

.dashboard-wrapper .card-text {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0;
}

.dashboard-wrapper .btn {
  background-color: #06923E;
  border-radius: 2px;
  color: white;
  font-weight: bold;
  padding: 0.3rem 1rem;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: center;
  margin-top: 8px;
}

.dashboard-wrapper .btn:hover {
  background-color: #06923E;
  transform: translateY(-2px);
}

.hover-effect:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}
</style>