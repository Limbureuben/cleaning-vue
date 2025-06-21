<template>
    <cleanerHeader/>
  <div class="table-container">
    <div class="header-container">
      <h2 class="table-title">MY REQUEST</h2>

      <!-- Search Input -->
      <div class="search-container">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Filter by name"
          class="search-field"
        />
      </div>
    </div>

    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr class="mat-header-row">
           <th class="mat-header-cell">#</th>
            <th class="mat-header-cell">CLIENT</th>
            <th class="mat-header-cell">LOCATION</th>
            <th class="mat-header-cell">STATUS</th>
            <th class="mat-header-cell">REQESTED ON</th>
            <th class="mat-header-cell">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(request, index) in cleanerRequests"
            :key="request.id"
          >
            <td class="mat-cell">{{ index + 1 }}</td>
            <td class="mat-cell">{{ request.service_request_username }}</td>
            <td class="mat-cell">{{ request.cleaner_location }}</td>
            <td class="mat-cell">
              <span :class="getStatusClass(request.status)" class="badge">
                {{ request.status }}
              </span>
            </td>
            <td class="mat-cell">{{ formatDate(request.created_at) }}</td>
            <td class="mat-cell">
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
          <tr v-if="cleanerRequests.length === 0">
            <td class="mat-cell" colspan="5">No matching reports found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cleanerHeader from './cleaner-header.vue';
import swal from 'sweetalert2'
import { useRouter } from 'vue-router'

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
.table-container {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px #06923E;
  min-height: 490px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-title {
  font-size: 24px;
  font-weight: bold;
  color: #06923E;
}

.search-container {
  display: flex;
  justify-content: flex-end;
}

.search-field {
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.mat-header-row {
  background-color: #06923E;
}

.mat-header-cell {
  background-color: #06923E;
  color: white;
  font-weight: bold;
  padding: 12px;
  text-align: left;
}

.mat-cell {
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.active {
  color: green;
}

.inactive {
  color: red;
}

.confirmed-icon {
  color: green;
}
</style>
