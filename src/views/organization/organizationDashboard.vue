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
import { ref, onMounted, computed } from 'vue';
import OrganizationHeader from './OrganizationHeader.vue';

const totalCleaners = ref(0)
const totalOrganizations = ref(0);
const totalServiceRequests = ref(0);

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

const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const statsRes = await fetch('http://localhost:8000/api/dashboard-stats/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (statsRes.ok) {
      const data = await statsRes.json();
      totalOrganizations.value = data.total_organizations;
      totalServiceRequests.value = data.total_service_requests;
    }
  } catch (err) {
    console.error('Failed to fetch dashboard stats', err);
  }
};

onMounted(() => {
  fetchTotalCleaners();
  fetchDashboardStats();
});

const cards = computed(() => [
  {
    title: "TOTAL CLEANERS",
    icon: "fas fa-users",
    count: totalCleaners.value
  },
  {
    title: "AVAILABLE HOUSES",
    icon: "fas fa-building",
    count: totalOrganizations.value
  },
  {
    title: "BOOKING SERVICES",
    icon: "fas fa-calendar-check",
    count: totalServiceRequests.value
  },
  {
    title: "MESSAGES",
    icon: "fas fa-envelope",
    count: 0
  }
])
</script>

<style scoped>
.dashboard-wrapper {
    background: linear-gradient(to right, #f0f4ff, #e8f0fe);
  min-height: 87vh;
    
}

.dashboard-wrapper .card {
  border-radius: 2px;
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
  border-radius: 0;
  color: white;
  font-weight: bold;
  padding: 0.3rem 1rem;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: center;
  margin-top: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.dashboard-wrapper .btn:hover {
  background-color: #06923E;
  transform: translateY(-2px);
}

.hover-effect:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 25px rgba(49, 183, 95, 0.08);
}
</style>