<template>
    <OrganizationHeader />
  <div class="container">
    <h2>Cleaning Service Requests for Your Organization(s)</h2>
    <div v-if="requests.length === 0">No service requests found.</div>
    <div v-else>
      <div v-for="req in requests" :key="req.id" class="card my-3 p-3">
        <h5>{{ req.username }}</h5>
        <p><strong>Email:</strong> {{ req.email }}</p>
        <p><strong>Phone:</strong> {{ req.phone }}</p>
        <p><strong>Requested At:</strong> {{ new Date(req.requested_at).toLocaleString() }}</p>
        <p><strong>Organization:</strong> {{ req.organization_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrganizationHeader from './OrganizationHeader.vue'

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

onMounted(() => {
  fetchMyOrgRequests()
})
</script>
