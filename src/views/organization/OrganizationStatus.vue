<template>
    <OrganizationHeader />
  <div class="organization-background">
    <div class="available-organization container my-5 p-4 bg-light rounded shadow">
      <h4 class="text-center mb-4 fw-bold">ORGANIZATIONS STATUS</h4>
      <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
          <thead class="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Organization Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="fade-slide" appear>
            <tr
              v-for="(organization, index) in organizations"
              :key="organization.id"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td class="fw-semibold text-dark">
                {{ organization.organization_name }}
              </td>
              <td>{{ organization.email }}</td>
              <td>{{ organization.status }}</td>
            </tr>
          </transition-group>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import swal from 'sweetalert2';
import OrganizationHeader from './OrganizationHeader.vue';
export default {
  name: 'AvailableOrganization',
  components: {
    OrganizationHeader
  },
 setup() {
  const organizations = ref([]);

  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8000/api/organization-status/', {
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

    onMounted(() => {
      fetchOrganizations();
    });

    return {
      organizations
    }
  }
}
</script>

<style scoped>
.available-organization {
  background: #ffffff;
  border-radius: 4px;
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

.organization-background {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-image: url('../../assets/images/wonaclean.jpg'); /* Example: '/images/admin-bg.jpg' */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 3rem 0;
  height: 650px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 1.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}


</style>