<template>
    <cleanerHeader />
  <div class="dashboard">
    <h1>Cleaner Dashboard</h1>
    <div class="dashboard-grid">
      <div class="card upcoming-jobs">
        <h2>Upcoming Jobs</h2>
        <ul>
          <li v-for="job in upcomingJobs" :key="job.id">
            {{ job.date }} - {{ job.location }}
          </li>
        </ul>
      </div>
      <div class="card performance">
        <h2>Performance Metrics</h2>
        <div class="metric">
          <span>Job Completion Rate:</span>
          <span>{{ performanceMetrics.completionRate }}%</span>
        </div>
        <div class="metric">
          <span>On-Time Rate:</span>
          <span>{{ performanceMetrics.onTimeRate }}%</span>
        </div>
      </div>
      <div class="card earnings">
        <h2>Earnings</h2>
        <div class="metric">
          <span>This Month:</span>
          <span>${{ earnings.thisMonth }}</span>
        </div>
        <div class="metric">
          <span>Last Month:</span>
          <span>${{ earnings.lastMonth }}</span>
        </div>
      </div>
      <div class="card reviews">
        <h2>Recent Reviews</h2>
        <div v-for="review in recentReviews" :key="review.id" class="review">
          <div class="rating">{{ review.rating }} / 5</div>
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import cleanerHeader from './cleaner-header.vue';
export default {
    components: {
        cleanerHeader,
    },
  name: 'CleanerDashboard',
  data() {
    return {
      upcomingJobs: [
        { id: 1, date: '2025-06-20', location: '123 Main St' },
        { id: 2, date: '2025-06-22', location: '456 Elm St' },
      ],
      performanceMetrics: {
        completionRate: 98,
        onTimeRate: 95,
      },
      earnings: {
        thisMonth: 2500,
        lastMonth: 2300,
      },
      recentReviews: [
        { id: 1, rating: 5, comment: 'Excellent service!' },
        { id: 2, rating: 4, comment: 'Very good, but a bit late.' },
      ],
    };
  },
};
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

h2 {
  color: #444;
  margin-top: 0;
}

.metric {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.review {
  margin-bottom: 15px;
}

.rating {
  font-weight: bold;
  color: #f39c12;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>