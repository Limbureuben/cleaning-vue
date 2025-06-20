<template>
  <div class="container mt-5">

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Cleaner</th>
          <th>Email</th>
          <th>Location</th>
          <th>Organization</th>
          <th>Status</th>
          <th>Requested At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, index) in receivedRequests" :key="req.id">
          <td>{{ index + 1 }}</td>
          <td>{{ req.username }}</td>
          <td>{{ req.email }}</td>
          <td>{{ req.cleaner_location }}</td>
          <td>{{ req.organization_name }}</td>
          <td>
            <span :class="getStatusClass(req.status)">{{ req.status }}</span>
          </td>
          <td>{{ formatDate(req.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="receivedRequests.length === 0" class="alert alert-info">No cleaner requests yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const receivedRequests = ref([])

const fetchReceivedCleanerRequests = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/cleaner-requests/to-staff/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) throw new Error('Failed to fetch')
    receivedRequests.value = await response.json()
  } catch (error) {
    console.error('Error fetching staff cleaner requests:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'text-warning fw-bold'
    case 'approved': return 'text-success fw-bold'
    case 'rejected': return 'text-danger fw-bold'
    case 'completed': return 'text-primary fw-bold'
    default: return ''
  }
}

onMounted(() => {
  fetchReceivedCleanerRequests()
})
</script>

<style scoped>
.table {
  font-size: 15px;
}
</style>
