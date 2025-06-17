<template>
  <OrganizationHeader />
  <div class="background-image">
    <div class="container my-5 content-wrapper">
      <div v-if="requests.length === 0">
        <p>No service requests found.</p>
      </div>
      
      <div v-else>
        <table class="table table-bordered table-striped">
          <thead :style="{ backgroundColor: '#6A80B9', color: '#fff' }">
            <tr>
              <th>#</th>
              <th>Booker</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Requested At</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(req, index) in requests" :key="req.id">
              <td>{{ index + 1 }}</td>
              <td>{{ req.username }}</td>
              <td>{{ req.email }}</td>
              <td>{{ req.phone }}</td>
              <td>{{ new Date(req.requested_at).toLocaleString() }}</td>
              <td>{{ req.organization_name }}</td>
              <td>
                <button
                  class="btn btn-sm text-white"
                  :style="{ backgroundColor: '#6A80B9' }"
                  @click="assignCleaner(req)"
                >
                  Assign Cleaner
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrganizationHeader from './OrganizationHeader.vue'
import swal from 'sweetalert2'

const requests = ref([])

const fetchMyOrgRequests = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/my-organization-requests/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch requests');

    const data = await response.json();
    requests.value = data;
  } catch (err) {
    console.error(err);
  }
}

const assignCleaner = async (request) => {
  try {
    // 1. Fetch available cleaners
    const cleanerRes = await fetch('http://localhost:8000/api/available-cleaners/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!cleanerRes.ok) throw new Error('Failed to fetch cleaners');

    const cleaners = await cleanerRes.json();

    // 2. Prepare options for dropdown
    const options = cleaners.reduce((acc, cleaner) => {
      acc[cleaner.id] = `${cleaner.full_name} - ${cleaner.location} (${cleaner.status})`;
      return acc;
    }, {});

    // 3. Show SweetAlert2 dropdown
    const { value: selectedCleanerId } = await swal.fire({
      title: `Assign Cleaner to ${request.username}`,
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Select a cleaner',
      showCancelButton: true,
      confirmButtonText: 'Assign',
      inputValidator: (value) => {
        if (!value) return 'Please select a cleaner';
      }
    });

    // 4. Send assign request
    if (selectedCleanerId) {
      const response = await fetch(`http://localhost:8000/api/assign-cleaner/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          request_id: request.id,
          cleaner_id: parseInt(selectedCleanerId)
        })
      });

      if (response.ok) {
        swal.fire('Success', `Cleaner assigned to ${request.username}`, 'success');
        fetchMyOrgRequests(); // optionally refresh list
      } else {
        const data = await response.json();
        swal.fire('Error', data.detail || 'Failed to assign cleaner', 'error');
      }
    }

  } catch (error) {
    console.error(error);
    swal.fire('Error', 'Something went wrong', 'error');
  }
}


onMounted(() => {
  fetchMyOrgRequests()
})
</script>
<style scoped>
.background-image {
  background-image: url('../../assets/images/wonaclean.jpg'); /* put your actual path here */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1; /* behind the content */
}

.content-wrapper {
  position: relative;
  top: 50px;
  z-index: 1; /* above background */
  background: rgba(255, 255, 255, 0.85); /* optional: white transparent overlay for readability */
  padding: 20px;
  border-radius: 8px;
}




</style>

