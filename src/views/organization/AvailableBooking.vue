<template>
  <OrganizationHeader />
  <div class="container my-5">
    <div v-if="requests.length === 0">
      <p>No service requests found.</p>
    </div>
    
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead :style="{ backgroundColor: '#6A80B9', color: '#fff' }">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Requested At</th>
            <th>Organization</th>
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
  const { value: cleaner } = await swal.fire({
    title: `Assign Cleaner to ${request.username}`,
    input: 'text',
    inputLabel: 'Cleaner Name or ID',
    inputPlaceholder: 'Enter cleaner name or ID',
    showCancelButton: true,
    confirmButtonText: 'Assign',
    inputValidator: (value) => {
      if (!value) return 'Cleaner name is required';
    }
  });

  if (cleaner) {
    try {
      const response = await fetch(`http://localhost:8000/api/assign-cleaner/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          request_id: request.id,
          cleaner: cleaner
        })
      });

      if (response.ok) {
        swal.fire('Success', `Cleaner assigned to ${request.username}`, 'success');
      } else {
        const data = await response.json();
        swal.fire('Error', data.detail || 'Failed to assign cleaner', 'error');
      }
    } catch (error) {
      swal.fire('Error', 'Server error', 'error');
    }
  }
}

onMounted(() => {
  fetchMyOrgRequests()
})
</script>
<style scoped>

</style>