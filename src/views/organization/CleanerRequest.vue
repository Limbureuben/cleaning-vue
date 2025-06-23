<template>
    <OrganizationHeader/>
  <div class="table-container">
    <div class="header-container">
      <h2 class="table-title">CLEANERS REQUESTS</h2>

      <!-- Search Input -->
      <div class="search-container" style="display: flex; align-items: center;">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Filter by name"
          class="search-field"
        />
        <button 
          class="btn btn-success ms-2"
          @click="showForm = true"
          title="Add Cleaner"
          style="font-size: 20px; padding: 4px 10px; line-height: 1;"
        >
        <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr class="mat-header-row">
           <th class="mat-header-cell">#</th>
            <th class="mat-header-cell">CLEANER NAME</th>
            <th class="mat-header-cell">EMAIL</th>
            <th class="mat-header-cell">LOCATION</th>
            <th class="mat-header-cell">HOUSE LOCATION</th>
            <th class="mat-header-cell">REQUESTED TIME</th>
             <th class="mat-header-cell">STATUS</th>
            <th class="mat-header-cell">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(req, index) in receivedRequests"
              :key="req.id"
            >
              <td class="mat-cell">{{ index + 1 }}</td>
              <td class="mat-cell">{{ req.username }}</td>
              <td class="mat-cell">{{ req.email }}</td>
              <td class="mat-cell">{{ req.cleaner_location }}</td>
              <td class="mat-cell">{{ req.organization_location }}</td>
              <td class="mat-cell">{{ formatDate(req.created_at) }}</td>
              <td class="mat-cell">
                <span :class="getStatusClass(req.status)">{{ req.status }}</span>
              </td>
              <td class="mat-cell">
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
    </div>

         <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
          <div class="modal-content p-4 rounded bg-white shadow position-relative">
            <button 
              class="btn-close position-absolute top-2 end-2" 
              aria-label="Close"
              @click="showForm = false"
              style="cursor:pointer;"
            ></button>

            <h5>ADD CLEANER</h5>
            <form @submit.prevent="registerCleaner">
              <div class="mb-3">
                <input v-model="form.username" id="username" type="text" placeholder="Enter username" class="form-control" required />
              </div>
              <div class="mb-3">
                <input v-model="form.email" id="email" type="email" placeholder="Enter cleaner email" class="form-control" required />
              </div>
              <div class="mb-3">
                <input v-model="form.password" id="cleaner_location" placeholder="Password" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <input v-model="form.passwordConfirm" id="organization_location" placeholder="Confirm password" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                  <select
                    class="form-select"
                    v-model="form.role"
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="is_cleaner">Cleaner</option>
                    <option value="user">Normal User</option>
                  </select>
                </div>

              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" @click="showForm = false">Cancel</button>
                <button type="submit" class="btn btn-success">Submit</button>
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
const showAddCleanerForm = ref(false)
const form = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
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
    const res = await fetch(`http://localhost:8000/api/cleaner-requests/${id}/approve/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!res.ok) throw new Error('Failed to accept request')
    swal.fire('Accepted', 'Cleaner request accepted successfully', 'success')
    fetchReceivedCleanerRequests()
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
    fetchReceivedCleanerRequests()
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



const registerCleaner = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/register-cleaner/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        passwordConfirm: form.value.passwordConfirm,
        role: form.value.role
      })
    });

    const data = await response.json();

    if (response.ok) {
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500
      });

      form.value = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: ''
      };
      showForm.value = false;
      showAddCleanerForm.value = false;
    } else {
      swal.fire({
        icon: "error",
        title: "Registration failed",
        text: data.error || 'Something went wrong.'
      });
    }
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Network Error",
      text: error.message
    });
  }
};

onMounted(() => {
  fetchReceivedCleanerRequests()
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

.modal-content {
  max-width: 400px;
  width: 90%;
  background-color: white;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  border-radius: 8px;
  position: relative;
  animation: popupFadeIn 0.3s ease forwards;
  padding: 24px 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

input.form-control,
select.form-select,
textarea.form-control {
  border: 1.5px solid #06923E;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input.form-control:focus,
select.form-select:focus,
textarea.form-control:focus {
  border-color: #06923E;
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
  background-color: #06923E;
  border-color: #06923E;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button.btn-primary:hover {
  background-color: #06923E;
  border-color: #06923E;
}

button.btn-secondary {
  background-color: #FE4F2D;
  border-color: #FE4F2D;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button.btn-secondary:hover {
  background-color: #FE4F2D;
  border-color: #FE4F2D;
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


.btn-close:hover {
  opacity: 1;
  cursor: pointer;
}


@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #555;
  cursor: pointer;
  transition: color 0.2s ease;
}

.form-label {
  font-weight: 600;
  color: #3a3a3a;
  margin-bottom: 8px;
  display: block;
  font-size: 1rem;
}

/* Form inputs */
input.form-control {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #06923E;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-family: inherit;
}

input.form-control:focus {
  outline: none;
  border-color: #057a2a;
  box-shadow: 0 0 8px rgba(6, 146, 62, 0.5);
}

/* Buttons */
.btn-success {
  background-color: #06923E;
  border: none;
  padding: 4px 10px;
  font-size: 1rem;
  font-weight: 200;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #057a2a;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #565e64;
}


.search-container {
  display: flex;
  align-items: center;
}

.search-field {
  width: 300px;
  padding: 8px 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-field:focus {
  outline: none;
  border-color: #06923E;
  box-shadow: 0 0 5px rgba(6, 146, 62, 0.5);
}

.btn-success.ms-2 {
  font-size: 20px;
  padding: 6px 12px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}

/* Plus icon inside button */
.btn-success.ms-2 i {
  pointer-events: none;
  color: white;
}


</style>