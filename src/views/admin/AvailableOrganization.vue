<template>
  <AdminHeader />
  <div class="available-organization container my-5 p-4 bg-light rounded shadow">
    <h3 class="text-center mb-4 fw-bold">ORGANIZATIONS</h3>
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Organization Name</th>
            <th scope="col">Region</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Services</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(organization, index) in organizations" :key="organization.id">
            <th scope="row">{{ index + 1 }}</th>
            <td class="fw-semibold text-dark">{{ organization.organization_name }}</td>
            <td>{{ organization.location }}</td>
            <td>{{ organization.email }}</td>
            <td>{{ organization.address }}</td>
            <td>
              <span class="badge bg-secondary">{{ organization.services }}</span>
            </td>
            <td>
              <button class="btn btn-success btn-sm me-2" @click="acceptOrganization(organization.id)">
                <i class="bi bi-check-circle me-1"></i> Accept
              </button>
              <button class="btn btn-danger btn-sm" @click="rejectOrganization(organization.id)">
                <i class="bi bi-x-circle me-1"></i> Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import swal from 'sweetalert2';
import AdminHeader from './AdminHeader.vue';
export default {
  name: 'AvailableOrganization',
  components: {
    AdminHeader
  },
 setup() {
  const organizations = ref([]);

  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8000/api/organizations-list/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Organizations fetched:', data);
    organizations.value = data;
  } catch (error) {
      console.error('Error fetching organizations:', error);
      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Could not fetch organizations. Please try again later.'
      });
    }
 }

 const acceptOrganization = (id) => {
      console.log('Accepted organization with ID:', id);
      // TODO: Call backend to update status
    };

    const rejectOrganization = (id) => {
      console.log('Rejected organization with ID:', id);
      // TODO: Call backend to update status
    };

    onMounted(() => {
      fetchOrganizations();
    });

    return {
      organizations,
      acceptOrganization,
      rejectOrganization
    }
  }
}
</script>

<style scoped>
.available-organization {
  background: #ffffff;
  border-radius: 8px;
}
.available-organization h2 {
  font-size: 1.8rem;
}
.table th,
.table td {
  vertical-align: middle !important;
}
.table thead th {
  background-color: #6A80B9 !important;
  color: #ffffff;
}
.table tbody tr:hover {
  background-color: #f0f8ff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.badge {
  font-size: 0.85rem;
}

h3 {
  color: #6A80B9;
}
</style>
