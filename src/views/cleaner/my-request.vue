<template>
    <cleanerHeader />
  <div class="container mt-5">

    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Organization</th>
          <th>Client</th>
          <th>Location</th>
          <th>Status</th>
          <th>Requested On</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in cleanerRequests" :key="request.id">
          <td>{{ index + 1 }}</td>
          <td>{{ request.organization_name }}</td>
          <td>{{ request.service_request_username }}</td>
          <td>{{ request.cleaner_location }}</td>
          <td>
            <span :class="getStatusClass(request.status)">
              {{ request.status }}
            </span>
          </td>
          <td>{{ formatDate(request.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="cleanerRequests.length === 0" class="alert alert-info">No requests submitted yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cleanerHeader from './cleaner-header.vue';

const cleanerRequests = ref([])

const fetchCleanerRequests = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/cleaner-requests/from-cleaner/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch');

    cleanerRequests.value = await res.json();
  } catch (error) {
    console.error('Error fetching cleaner requests:', error)
  }
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString()
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
  fetchCleanerRequests()
})
</script>

<style scoped>
.table {
  font-size: 15px;
}
</style>
