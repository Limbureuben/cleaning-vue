<template>
  <cleanerHeader />
  <div class="dashboard">
    <div class="dashboard-grid">
    <router-link to="available-house" class="card stats-icon-card" style="text-decoration: none;">
      <i class="fas fa-briefcase icon"></i>
      <p class="count-label">Available Jobs</p>
      <p class="count-number">{{ availableJobsCount }}</p>
    </router-link>
      <router-link to="cleaner-request" div class="card stats-icon-card" style="text-decoration: none">
        <i class="fas fa-paper-plane icon"></i>
        <p class="count-label">Total Requests</p>
        <p class="count-number">{{ totalRequestsCount }}</p>
      </router-link>
      <router-link to="approved-reqest" div class="card stats-icon-card" style="text-decoration: none">
         <i class="fas fa-history icon"></i>
        <p class="count-label">Approved Request</p>
        <p class="count-number">{{ approvedRequestsCount }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import cleanerHeader from './cleaner-header.vue';
export default {
    components: {
        cleanerHeader,
    },
  name: 'CleanerDashboard',
  setup() {
    const availableJobsCount = ref(0)
    const totalRequestsCount = ref(0)
    const approvedRequestsCount = ref(0)

    const fetchDashboardStats = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/cleaner/dashboard-stats/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (!res.ok) throw new Error('Failed to fetch stats')

        const data = await res.json()
        availableJobsCount.value = data.available_jobs_count
        totalRequestsCount.value = data.total_cleaner_requests_count
        approvedRequestsCount.value = data.approved_cleaner_requests_count
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }

    onMounted(() => {
      fetchDashboardStats()
    })

    return {
      availableJobsCount,
      totalRequestsCount,
      approvedRequestsCount
    }
  }
};
</script>

<style scoped>

.stats-icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.stats-icon-card:hover {
  transform: translateY(-5px);
}

.stats-icon-card .icon {
  font-size: 2rem;
  color: #06923E;
  margin-bottom: 10px;
}

.count-label {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 5px;
}

.count-number {
  font-size: 2rem;
  font-weight: bold;
  color: #06923E;
}





.dashboard {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #6A80B9;
  padding-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f4f8;
  border-radius: 5px;
}

.job-date {
  font-weight: bold;
  color: #6A80B9;
}

.job-location {
  margin-left: 10px;
  color: #555;
}

.metric {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f4f8;
  border-radius: 5px;
}

.metric-value {
  font-weight: bold;
  color: #6A80B9;
}

.review {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f0f4f8;
  border-radius: 5px;
}

.rating {
  font-weight: bold;
  color: #f39c12;
  margin-bottom: 5px;
}

p {
  margin: 0;
  color: #555;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>