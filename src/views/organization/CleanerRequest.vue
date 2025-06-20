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

const receivedRequests = ref([])
const showForm = ref(false)
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

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6A80B9;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  max-width: 400px;
  width: 100%;
}
</style>
