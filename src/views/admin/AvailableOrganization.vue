<template>
  <AdminHeader />
  <div class="organization-background">
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
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
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
              <td>{{ organization.location }}</td>
              <td>{{ organization.email }}</td>
              <td>{{ organization.address }}</td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': organization.status === 'approved',
                    'bg-danger': organization.status === 'rejected',
                    'bg-warning': organization.status === 'suspended',
                    'bg-secondary': organization.status === 'pending'
                  }"
                >
                  {{ organization.status }}
                </span>
              </td>
              <td>
                <button
                  class="btn btn-success btn-sm me-2"
                  @click="acceptOrganization(organization.id)"
                >
                  <i class="bi bi-check-circle me-1"></i> Accept
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="rejectOrganization(organization.id)"
                >
                  <i class="bi bi-x-circle me-1"></i> Reject
                </button>
              </td>
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

 const updateOrganizationStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8000/api/organization/${id}/update-status/`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const updatedOrganization = await response.json();
    console.log(`Organization ${id} status updated to ${status}:`, updatedOrganization);

    swal.fire({
      icon: 'success',
      title: 'Success!',
      text: `Organization has been ${status === 'approved' ? 'accepted' : 'rejected'} successfully.`
    });

    const orgIndex = organizations.value.findIndex(org => org.id === id);
      if (orgIndex !== -1) {
        organizations.value[orgIndex].status = status;
      }
  } catch (error) {
      console.error('Error updating organization status:', error);
      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Could not update status. Please try again later.'
      });
    }
 }

    const acceptOrganization = (id) => {
      swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to accept this organization?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6A80B9',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, accept it!'
      }).then((result) => {
        if (result.isConfirmed) {
          updateOrganizationStatus(id, 'approved');
        }
      });
    };

    const rejectOrganization = (id) => {
      swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reject this organization?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6A80B9',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
          updateOrganizationStatus(id, 'rejected');
        }
      });
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
  transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

</style>
