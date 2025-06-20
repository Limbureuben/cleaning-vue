<template>
  <cleanerHeader />
  <div class="container mt-5">

    <div class="table-responsive">
      <table class="table table-striped table-hover shadow-sm">
        <thead>
          <tr>
            <th style="background-color: #6A80B9; color: white;">#</th>
            <th style="background-color: #6A80B9; color: white;">CLIENT</th>
            <th style="background-color: #6A80B9; color: white;">LOCATION</th>
            <th style="background-color: #6A80B9; color: white;">STATUS</th>
            <th style="background-color: #6A80B9; color: white;">REQUESTED ON</th>
            <th style="background-color: #6A80B9; color: white;">ACTION</th>
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
              <button 
                  v-if="request.status === 'cancelled'"
                  @click="deleteRequest(request.id)" 
                  class="btn btn-outline-danger btn-sm ms-2"
                  title="Delete Request"
                >
                  <i class="fas fa-trash"></i>
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
import swal from 'sweetalert2'

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
    case 'cancelled': return 'text-danger fw-bold'
    default: return ''
  }
}

const cancelRequest = async (requestId) => {
  const confirm = await swal.fire({
    title: 'Cancel Request?',
    text: 'Do you really want to cancel this cleaning request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Cancel it',
    cancelButtonText: 'No'
  });

  if (confirm.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:8000/api/cancel-cleaner-request/${requestId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        swal.fire('Cancelled', data.detail, 'success');
        fetchCleanerRequests();  // Refresh the table
      } else {
        swal.fire('Error', data.detail || 'Failed to cancel request.', 'error');
      }
    } catch (error) {
      swal.fire('Network Error', 'Please try again later.', 'error');
    }
  }
};

const deleteRequest = async (requestId) => {
  const confirm = await swal.fire({
    title: 'Delete Request?',
    text: 'This action will permanently delete the request.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'No'
  });

  if (confirm.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:8000/api/delete-cleaner-request/${requestId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        swal.fire('Deleted!', 'Request has been removed.', 'success');
        fetchCleanerRequests();  // Refresh list
      } else {
        const data = await response.json();
        swal.fire('Error', data.detail || 'Could not delete request.', 'error');
      }
    } catch (error) {
      swal.fire('Network Error', 'Please try again later.', 'error');
    }
  }
};

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
