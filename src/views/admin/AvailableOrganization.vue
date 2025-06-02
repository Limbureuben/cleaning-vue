<template>
  <AdminHeader />
  <div class="available-organization container">
    <h2 class="text-center mb-5">Available Organizations</h2>
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Organization Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Services</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(organization, index) in organizations" :key="organization.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ organization.name }}</td>
          <td>{{ organization.email }}</td>
          <td>{{ organization.phone }}</td>
          <td>{{ organization.address }}</td>
          <td>{{ organization.services }}</td>
          <td>
            <button class="btn btn-success me-2" @click="acceptOrganization(organization.id)">Accept</button>
            <button class="btn btn-danger" @click="rejectOrganization(organization.id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import swal from 'sweetalert2';
import AdminHeader from './AdminHeader.vue';
export default {
  name: 'AvailableOrganization',
  components: {
    AdminHeader
  },
  data() {
    return {
      organizations: [
        { id: 1, name: 'CleanCo', email: 'contact@cleanco.com', phone: '123-456-7890', address: '123 Clean St', services: 'Residential Cleaning' },
        { id: 2, name: 'Sparkle Services', email: 'info@sparkleservices.com', phone: '987-654-3210', address: '456 Sparkle Ave', services: 'Commercial Cleaning' },
        // Add more organizations as needed
      ]
    }
  },
  methods: {
    acceptOrganization(id) {
      // Add your accept logic here
      console.log('Accepted organization with ID:', id);
    },
    rejectOrganization(id) {
      // Add your reject logic here
      console.log('Rejected organization with ID:', id);
    }
  }
}
</script>

<style scoped>
.available-organization {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table-hover tbody tr:hover {
  background-color: rgba(254, 79, 45, 0.1);
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-dark {
  background-color: #FE4F2D;
  color: white;
}

.btn-success {
  background-color: #28a745;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>