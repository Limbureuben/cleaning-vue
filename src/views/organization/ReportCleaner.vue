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
            <th class="mat-header-cell">CLEANER</th>
            <th class="mat-header-cell">CLIENT</th>
            <th class="mat-header-cell">DESCRIPTIONS</th>
            <th class="mat-header-cell">COMPLETED AT</th>
             <th class="mat-header-cell">ATTACHMENT</th>
            <th class="mat-header-cell">CLIENT RATING</th>
            <th class="mat-header-cell">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(report, index) in StaffReports"
              :key="report.id"
            >
              <td class="mat-cell">{{ index + 1 }}</td>
              <td class="mat-cell">{{ report.cleaner }}</td>
              <td class="mat-cell">{{ report.client }}</td>
              <td class="mat-cell">{{ report.description }}</td>
              <td class="mat-cell">{{ new Date(report.completed_at).toLocaleString() }}</td>
              <td class="mat-cell">
             <a v-if="report.attachment" :href="report.attachment" target="_blank">View</a>
             <span v-else>No file</span>
             </td>
             <td class="mat-cell">
                <span v-if="report.client_rating">{{ report.client_rating }}/5</span>
                <span v-else class="text-muted">Not rated</span>
             </td>
             <td class="mat-cell">
                <button
                    class="btn btn-primary btn-sm me-2"
                    @click="forwardReport(report)"
                    v-if="!report.forwarded"
                >
                    Forward
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    @click="deleteReport(report.id)"
                    v-if="report.forwarded"
                >
                    Delete
                </button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import OrganizationHeader from './OrganizationHeader.vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'


const StaffReports = ref([])

const fetchStaffReport = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/reports/staff/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch');

    StaffReports.value = await res.json();
  } catch (error) {
    console.error('Error fetching cleaner requests:', error)
  }
}

const forwardReport = async (report) => {
  try {
    const res = await fetch(`http://localhost:8000/api/reports/${report.id}/forward/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!res.ok) throw new Error('Failed to forward report')

    Swal.fire('Forwarded', 'Report has been forwarded to the client.', 'success')
    fetchStaffReport()
  } catch (err) {
    Swal.fire('Error', err.message, 'error')
  }
}

const deleteReport = async (id) => {
  const confirm = await Swal.fire({
    title: 'Delete Report?',
    text: 'This will remove the report permanently.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel'
  })

  if (confirm.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:8000/api/reports/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!res.ok) throw new Error('Failed to delete')

      Swal.fire('Deleted', 'Report deleted successfully.', 'success')
      fetchStaffReport()
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    }
  }
}

onMounted(() => {
  fetchStaffReport()
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