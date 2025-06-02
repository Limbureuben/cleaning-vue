<template>
  <div class="organization-dashboard">
    <h2>Organization Dashboard</h2>
    <div class="dashboard-stats">
      <div class="stat-card">
        <h3>Total Members</h3>
        <p>{{ totalMembers }}</p>
      </div>
      <div class="stat-card">
        <h3>Active Projects</h3>
        <p>{{ activeProjects }}</p>
      </div>
      <div class="stat-card">
        <h3>Completed Tasks</h3>
        <p>{{ completedTasks }}</p>
      </div>
    </div>
    <div class="recent-activity">
      <h3>Recent Activity</h3>
      <ul>
        <li v-for="activity in recentActivities" :key="activity.id">
          {{ activity.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizationDashboard',
  data() {
    return {
      totalMembers: 25,
      activeProjects: 5,
      completedTasks: 150,
      recentActivities: [
        { id: 1, description: 'New member joined: John Doe' },
        { id: 2, description: 'Project "Website Redesign" completed' },
        { id: 3, description: '10 new tasks added to "Mobile App Development"' }
      ]
    }
  }
}
</script>

<style scoped>
.organization-dashboard {
  padding: 1rem;
}

.dashboard-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.recent-activity {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
}

.recent-activity ul {
  list-style-type: none;
  padding-left: 0;
}

.recent-activity li {
  margin-bottom: 0.5rem;
}
</style>