<template>
  <cleanerHeader />
  <div class="dashboard">
    <div class="dashboard-grid">
      <div class="card upcoming-jobs">
        <h2>Upcoming Jobs</h2>
        <ul>
          <li v-for="job in upcomingJobs" :key="job.id">
            <span class="job-date">{{ job.date }}</span>
            <span class="job-location">{{ job.location }}</span>
          </li>
        </ul>
      </div>
      <div class="card performance">
        <h2>Performance Metrics</h2>
        <div class="metric">
          <span>Job Completion Rate:</span>
          <span class="metric-value">{{ performanceMetrics.completionRate }}%</span>
        </div>
        <div class="metric">
          <span>On-Time Rate:</span>
          <span class="metric-value">{{ performanceMetrics.onTimeRate }}%</span>
        </div>
      </div>
      <div class="card earnings">
        <h2>Earnings</h2>
        <div class="metric">
          <span>This Month:</span>
          <span class="metric-value">${{ earnings.thisMonth }}</span>
        </div>
        <div class="metric">
          <span>Last Month:</span>
          <span class="metric-value">${{ earnings.lastMonth }}</span>
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
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f7fa;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
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