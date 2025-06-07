<!-- ApprovedOrganizations.vue -->
<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4" style="color: #6A80B9;">Approved Cleaning Organizations</h3>
    <div class="row">
      <div v-for="org in organizations" :key="org.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card shadow rounded p-3">
          <h5 class="fw-bold">{{ org.organization_name }}</h5>
          <p><strong>Location:</strong> {{ org.location }}</p>
          <p><strong>Email:</strong> {{ org.email }}</p>
          <p><strong>Services:</strong> {{ org.services }}</p>
          <button class="btn btn-primary w-100" @click="requestService(org)">
            Request Cleaning Service
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import swal from 'sweetalert2'

const organizations = ref([])

const fetchApprovedOrganizations = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/fetch-approved/', {
      method: 'GET', // use GET, not POST
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    organizations.value = data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
  }
}

const requestService = (org) => {
  swal.fire({
    icon: 'success',
    title: `Request sent to ${org.organization_name}`,
    text: 'They will contact you soon.',
    timer: 2000,
    showConfirmButton: false,
    position: 'top-end',
  });

}

onMounted(() => {
  fetchApprovedOrganizations();
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
</style>
