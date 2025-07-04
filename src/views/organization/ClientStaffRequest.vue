<template>
    <OrganizationHeader/>
  <div class="table-container">
    <div class="header-container">
      <h2 class="table-title">CLIENT REQUESTS</h2>

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
            <th class="mat-header-cell">EMAIL</th>
            <th class="mat-header-cell">PHONE</th>
            <th class="mat-header-cell">REQESTED ON</th>
             <th class="mat-header-cell">STATUS</th>
            <th class="mat-header-cell">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(request, index) in paginatedRequests"
              :key="request.id"
            >
              <td class="mat-cell">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td class="mat-cell">{{ request.username }}</td>
              <td class="mat-cell">{{ request.email }}</td>
              <td class="mat-cell">{{ request.phone }}</td>
              <td class="mat-cell">{{ new Date(request.requested_at).toLocaleString() }}</td>
              <td class="mat-cell">
                <span :class="statusClass(request.status)">
                  {{ request.status }}
                </span>
              </td>
              <td class="mat-cell">
                <!-- Accept button -->
                <button
                  v-if="request.status === 'available'"
                  @click="acceptRequest(request.id)"
                  class="btn btn-success btn-sm me-2"
                  title="Accept Request"
                >
                  <i class="fas fa-check"></i>
                </button>

                <!-- Reject button -->
                <button
                  v-if="request.status === 'available'"
                  @click="rejectRequest(request.id)"
                  class="btn btn-warning btn-sm me-2"
                  title="Reject Request"
                >
                  <i class="fas fa-times"></i>
                </button>

                <!-- Delete button -->
                <button
                  @click="deleteRequest(request.id)"
                  class="btn btn-danger btn-sm"
                  title="Delete Request"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
        </tbody>
      </table>

      <div class="pagination-controls mt-3 d-flex justify-content-center align-items-center" v-if="totalPages > 1">
          <button 
            class="btn btn-outline-primary me-2"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </button>

          <span class="page-indicator">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <button 
            class="btn btn-outline-primary ms-2"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import OrganizationHeader from './OrganizationHeader.vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const cleanerRequests = ref([])

const fetchCleanerRequests = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/my-organization-requests/', {
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

const acceptRequest = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to accept this request.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, accept it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#06923E',
    cancelButtonColor: '#FE4F2D'
  });

  if (result.isConfirmed) {
    const res = await fetch(`http://localhost:8000/api/service-request/${id}/action/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ action: 'accept' })
    });

    const data = await res.json();
    Swal.fire('Success', data.success || 'Request accepted', 'success');
  }
};

const rejectRequest = async (id) => {
  const result = await Swal.fire({
    title: 'Reject Request?',
    text: 'Are you sure you want to reject this request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reject it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#06923E',
    cancelButtonColor: '#FE4F2D'
  });

  if (result.isConfirmed) {
    const res = await fetch(`http://localhost:8000/api/service-request/${id}/action/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ action: 'reject' })
    });

    const data = await res.json();
    Swal.fire('Rejected', data.success || 'Request rejected', 'info');
  }
};

const deleteRequest = async (id) => {
  const result = await Swal.fire({
    title: 'Delete Request?',
    text: 'This can only be done for accepted or rejected requests. Are you sure?',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#06923E',
    cancelButtonColor: '#FE4F2D'
  });

  if (result.isConfirmed) {
    const res = await fetch(`http://localhost:8000/api/service-request/${id}/action/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ action: 'delete' })
    });

    const data = await res.json();
    if (res.ok) {
      Swal.fire('Deleted', data.success || 'Request deleted', 'success');
    } else {
      Swal.fire('Error', data.error || 'Delete failed', 'error');
    }
  }
};


const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString()
}

const statusClass = (status) => {
  switch (status) {
    case 'available':
      return 'status-pill available';
    case 'taken':
      return 'status-pill taken';
    case 'rejected':
      return 'status-pill rejected';
    default:
      return 'status-pill';
  }
};


const searchTerm = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(6);


const paginatedRequests = computed(() => {
  let filtered = cleanerRequests.value;

  if (searchTerm.value) {
    filtered = filtered.filter(req =>
      req.username.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  let count = cleanerRequests.value.length;
  if (searchTerm.value) {
    count = cleanerRequests.value.filter(req =>
      req.username.toLowerCase().includes(searchTerm.value.toLowerCase())
    ).length;
  }
  return Math.ceil(count / itemsPerPage.value);
});

watch(searchTerm, () => {
  currentPage.value = 1;
});


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



.report-form-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 450px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #06923E;
  color: white;
  padding: 16px 24px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.report-form {
  padding: 20px 24px 30px;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 1rem;
}

.form-group input[type="date"],
.form-group input[type="file"],
.form-group textarea {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
  resize: vertical;
}

.form-group input[type="date"]:focus,
.form-group input[type="file"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #06923E;
  box-shadow: 0 0 5px rgba(6, 146, 62, 0.5);
}

.form-group textarea {
  min-height: 90px;
}

.form-actions {
  text-align: right;
}

.submit-btn {
  background-color: #06923E;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #057a2a;
}


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.status-pill {
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.85rem;
  display: inline-block;
}

.status-pill.available {
  background-color: #e1f7e7;
  color: #06923E;
}

.status-pill.taken {
  background-color: #e0ecff;
  color: #0d6efd;
}

.status-pill.rejected {
  background-color: #ffe0e0;
  color: #dc3545;
}
</style>







// const acceptRequest = async (id) => {
//   await fetch(`http://localhost:8000/api/service-request/${id}/action/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify({ action: 'accept' })
//   })
// }

// const rejectRequest = async (id)=> {
//   await fetch(`http://localhost:8000/api/service-request/${id}/action/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify({ action: 'reject' })
//   })
// }


// const deleteRequest = async (id) => {
//   await fetch(`http://localhost:8000/api/service-request/${id}/action/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify({ action: 'delete' })
//   })
// }