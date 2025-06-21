<template>
    <cleanerHeader/>
  <div class="table-container">
    <div class="header-container">
      <h2 class="table-title">MY APPROVED REQUEST</h2>

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
  <!-- Cancel if pending -->
              <button 
                v-if="request.status === 'pending'"
                @click="cancelRequest(request.id)" 
                class="btn btn-danger btn-sm"
              >
                Cancel
              </button>

              <!-- Delete if cancelled -->
              <button 
                v-if="request.status === 'cancelled'"
                @click="deleteRequest(request.id)" 
                class="btn btn-outline-danger btn-sm ms-2"
                title="Delete Request"
              >
                <i class="fas fa-trash"></i>
              </button>

              <!-- Report if approved -->
              <button 
                v-if="request.status === 'approved'"
                @click="openReportForm(request.id)"
                class="btn btn-success btn-sm ms-2"
                title="Submit Cleaning Report"
              >
                <i class="fas fa-file-alt"></i> Report
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

  <div v-if="showReportForm" class="overlay" @click="showReportForm = false"></div>
    <div v-if="showReportForm" class="report-form-popup">
      <div class="report-header">
        <strong>Work Completion Report</strong>
        <button class="close-btn" @click="showReportForm = false">&times;</button>
      </div>
      <form @submit.prevent="submitReport" class="report-form">
        <div class="form-group">
          <input type="date" id="date" v-model="report.date" required />
        </div>
        <div class="form-group">
          <textarea id="description" v-model="report.description" rows="4" placeholder="Describe the work done or any problems"></textarea>
        </div>
        <div class="form-group">
          <label for="file">Attach File (optional):</label>
          <input type="file" id="file" @change="handleFileUpload" />
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-btn">Submit Report</button>
        </div>
      </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cleanerHeader from './cleaner-header.vue';
import swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const cleanerRequests = ref([])
const showReportForm = ref(false)
const selectedServiceRequestId = ref(null)

const openReportForm = (requestId) => {
  selectedServiceRequestId.value = requestId
  report.value = {
    date: '',
    description: '',
    file: null,
    service_request: requestId
  }
  showReportForm.value = true
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  report.value.file = file || null
}


const submitReport = async () => {
    if (!report.value.date || !report.value.description) {
      swal.fire('Error', 'Please complete all required fields.', 'error')
      return
    }

    const formData = new FormData()
    formData.append('completed_at', report.value.date)
    formData.append('description', report.value.description)

    if (report.value.file) {
      formData.append('attachment', report.value.file)
    }

    if (report.value.service_request) {
      formData.append('service_request', report.value.service_request)
    }

    try {
      const res = await fetch('http://localhost:8000/api/cleaning-reports/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        swal.fire('Success', 'Report submitted successfully.', 'success')
        showReportForm.value = false
        fetchCleanerRequests()
      } else {
        swal.fire('Error', data.detail || 'Submission failed.', 'error')
      }
    } catch (error) {
      console.error('Failed to submit report:', error)
      swal.fire('Error', 'Something went wrong.', 'error')
    }
  }


const report = ref({
      date: '',
      description: '',
      file: null
    })

const fetchCleanerRequests = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/cleaner-request-approved/', {
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

  return {
    cleanerRequests,
    fetchCleanerRequests,
    cancelRequest,
    deleteRequest,
    formatDate,
    getStatusClass,
    showReportForm,
    openReportForm,
    report,
    handleFileUpload,
    submitReport,
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
</style>
