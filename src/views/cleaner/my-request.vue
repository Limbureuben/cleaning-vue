<template>
  <cleanerHeader />
  <div class="container mt-5">

    <div class="table-responsive">
      <table class="table table-striped table-hover shadow-sm">
        <thead style="background-color: #6A80B9; color: white;">
          <tr>
            <th>#</th>
            <th>CLIENT</th>
            <th>LOCATION</th>
            <th>STATUS</th>
            <th>REQUESTED ON</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in cleanerRequests" :key="request.id">
            <td>{{ index + 1 }}</td>
            <td>{{ request.service_request_username }}</td>
            <td>{{ request.cleaner_location }}</td>
            <td>
              <span :class="getStatusClass(request.status)" class="badge">
                {{ request.status }}
              </span>
            </td>
            <td>{{ formatDate(request.created_at) }}</td>
            <td>
              <button 
                v-if="request.status === 'pending'"
                @click="cancelRequest(request.id)" 
                class="btn btn-danger btn-sm"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="cleanerRequests.length === 0" class="alert alert-info text-center">
      No requests submitted yet.
    </div>
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

.badge {
  font-size: 0.9em;
  padding: 0.5em 0.7em;
}

h2 {
  color: #333;
  font-weight: 600;
}

.table-responsive {
  border-radius: 8px;
  overflow: hidden;
}

.btn-sm {
  font-size: 0.8em;
  padding: 0.25em 0.5em;
}

.table-class {
  background-color: #6A80B9;
}
</style>
