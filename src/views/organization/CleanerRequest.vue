<template>
  <OrganizationHeader />
  <div class="container mt-5 position-relative">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="background-color: #6A80B9; color: white;">#</th>
          <th style="background-color: #6A80B9; color: white;">Cleaner</th>
          <th style="background-color: #6A80B9; color: white;">Email</th>
          <th style="background-color: #6A80B9; color: white;">Location</th>
          <th style="background-color: #6A80B9; color: white;">Organization</th>
          <th style="background-color: #6A80B9; color: white;">Status</th>
          <th style="background-color: #6A80B9; color: white;">Requested At</th>
          <th style="background-color: #6A80B9; color: white;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, index) in receivedRequests" :key="req.id">
          <td>{{ index + 1 }}</td>
          <td>{{ req.username }}</td>
          <td>{{ req.email }}</td>
          <td>{{ req.cleaner_location }}</td>
          <td>{{ req.organization_location }}</td>
          <td>
            <span :class="getStatusClass(req.status)">{{ req.status }}</span>
          </td>
          <td>{{ formatDate(req.created_at) }}</td>
          <td>
            <button v-if="req.status === 'pending'" @click="acceptRequest(req.id)" class="btn btn-success btn-sm me-1">
              Accept
            </button>
            <button v-if="req.status === 'pending'" @click="openRejectModal(req)" class="btn btn-warning btn-sm me-1"
            >
              Reject
            </button>
            <button v-if="req.status === 'rejected'" @click="deleteRequest(req.id)" class="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="receivedRequests.length === 0" class="alert alert-info">No cleaner requests yet.</div>

       <!-- Modal Markup -->
        <div v-if="showRejectModal" class="modal-backdrop" @click.self="closeRejectModal">
          <div class="modal-content p-4 rounded bg-white shadow position-relative">
            <!-- Close button -->
            <button 
              class="btn-close position-absolute top-2 end-2" 
              aria-label="Close"
              @click="closeRejectModal"
              style="cursor:pointer;"
            ></button>

            <h5>Reject Cleaner Request - {{ rejectRequest.username }}</h5>
            <textarea 
              v-model="rejectReason" 
              rows="4" 
              class="form-control" 
              placeholder="Enter reason for rejection" 
              required
            ></textarea>
            <div class="mt-3 d-flex justify-content-end">
              <button class="btn btn-secondary me-2" @click="closeRejectModal">Cancel</button>
              <button class="btn btn-warning" @click="submitReject">Submit Rejection</button>
            </div>
          </div>
        </div>
    <button 
      class="btn rounded-circle position-absolute"
      style="bottom: 100px; right: -30px; width: 45px; height: 45px; font-size: 24px; line-height: 1;"
      @click="showForm = true"
      aria-label="Add Cleaner"
    >+</button>

    <div v-if="receivedRequests.length === 0" class="alert alert-info">No cleaner requests yet.</div>

    <!-- Modal Form -->
    <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
      <div class="modal-content p-4 rounded bg-white shadow">
        <form @submit.prevent="submitCleaner">
          <div class="mb-3">
            <input v-model="form.username" id="username" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <input v-model="form.email" id="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <input v-model="form.password" id="location" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="organization" class="form-label">password Confirm</label>
            <input v-model="form.passwordConfirm" id="organization" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select v-model="form.role" id="role" class="form-select" required>
              <option value="" disabled>Select role</option>
              <option value="is_cleaner">Cleaner</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-secondary me-2" @click="showForm = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrganizationHeader from './OrganizationHeader.vue'
import swal from 'sweetalert2'

const receivedRequests = ref([])
const showForm = ref(false)
const showRejectModal = ref(false)
const rejectRequest = ref(null)
const rejectReason = ref('')
const form = ref({
  username: '',
  email: '',
  cleaner_location: '',
  organization_location: ''
})

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



const acceptRequest = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/cleaner-requests/${id}/accept/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!res.ok) throw new Error('Failed to accept request')
    swal.fire('Accepted', 'Cleaner request accepted successfully', 'success')
    fetchRequests()
  } catch (error) {
    swal.fire('Error', error.message, 'error')
  }
}

const openRejectModal = (req) => {
  rejectRequest.value = req
  rejectReason.value = ''
  showRejectModal.value = true
}

const closeRejectModal = () => {
  showRejectModal.value = false
  rejectRequest.value = null
  rejectReason.value = ''
}


const submitReject = async () => {
  if (!rejectReason.value.trim()) {
    swal.fire('Error', 'Please enter rejection reason', 'error')
    return
  }
  try {
    const res = await fetch(`http://localhost:8000/api/cleaner-requests/${rejectRequest.value.id}/reject/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ reason: rejectReason.value })
    })
    if (!res.ok) throw new Error('Failed to reject request')
    swal.fire('Rejected', 'Cleaner request rejected and notified', 'success')
    closeRejectModal()
    fetchRequests()
  } catch (error) {
    swal.fire('Error', error.message, 'error')
  }
}


const deleteRequest = async (id) => {
  const confirmed = await swal.fire({
    title: 'Delete Request?',
    text: 'Are you sure you want to delete this rejected request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No'
  })
  if (confirmed.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:8000/api/cleaner-requests/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!res.ok) throw new Error('Failed to delete request')
      swal.fire('Deleted', 'Request deleted successfully', 'success')
      fetchRequests()
    } catch (error) {
      swal.fire('Error', error.message, 'error')
    }
  }
}

const submitCleaner = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/cleaners/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Failed to register cleaner')

    // Reset form and close modal
    form.value = {
      username: '',
      email: '',
      cleaner_location: '',
      organization_location: ''
    }
    showForm.value = false

    // Optionally refresh the list
    fetchReceivedCleanerRequests()
  } catch (error) {
    console.error('Error registering cleaner:', error)
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

.position-relative {
  position: relative;
}

.modal-content {
  max-width: 400px;
  width: 100%;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5); /* translucent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* high z-index to overlay other elements */
}

/* .modal-content {
  max-width: 400px;
  width: 90%;
  background-color: white;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  border-radius: 8px;
  position: relative;
  padding: 20px;
} */

.modal-content {
  max-width: 400px;
  width: 90%;
  background-color: white;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  border-radius: 8px;
  position: relative;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

input.form-control,
select.form-select,
textarea.form-control {
  border: 1.5px solid #6A80B9;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input.form-control:focus,
select.form-select:focus,
textarea.form-control:focus {
  border-color: #4a5dbb;
  box-shadow: 0 0 8px rgba(74, 93, 187, 0.4);
  outline: none;
}

.form-label {
  font-weight: 600;
  color: #3a3a3a;
  margin-bottom: 6px;
  display: block;
}

button.btn-primary {
  background-color: #4a5dbb;
  border-color: #4a5dbb;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button.btn-primary:hover {
  background-color: #3a4a9a;
  border-color: #3a4a9a;
}

button.btn-secondary {
  background-color: #6A80B9;
  border-color: #6A80B9;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button.btn-secondary:hover {
  background-color: #576a9a;
  border-color: #576a9a;
}

/* Reject modal textarea */
.modal-content textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

.modal-content h5 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.25rem;
}

.modal-content .d-flex.justify-content-end {
  margin-top: 15px;
}

/* Rounded corners for buttons */
button.btn {
  border-radius: 6px;
}

/* Add some spacing between form groups */
.mb-3 {
  margin-bottom: 1rem !important;
}

/* Bootstrap 5 style close button */
.btn-close {
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  opacity: 0.5;
  transition: opacity 0.15s ease;
}
.btn-close:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
