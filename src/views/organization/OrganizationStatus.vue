<template>
    <OrganizationHeader />
  <div class="organization-background">
    <div class="available-organization container my-5 p-4 bg-light rounded shadow">
      <h3 class="text-center mb-4 fw-bold">ORGANIZATIONS</h3>
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
.register-organization {
  max-width: 800px;
  border-radius: 4px;
  position: relative;
  align-items: center;
  top: 6px;
  background: rgba(255, 255, 255, 0.95);
  min-height: 470px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: all 0.3s ease;
}

.register-organization:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

h4 {
  color: #6A80B9;
  font-weight: bold;
  padding-top: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

.form-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.form-control {
  border-radius: 4px;
  border: 2px solid #e0e0e0;
  padding: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #6A80B9;
  box-shadow: 0 0 0 3px rgba(106, 128, 185, 0.2);
}

.btn-primary {
  background-color: #6A80B9;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 4.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(106, 128, 185, 0.2);
}

.btn-primary:hover {
  background-color: #5A70A9;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(106, 128, 185, 0.3);
}

.container-dashboard {
  background-image: url('../../assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  min-height: 88vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
}

.container-dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: -1;
}

.container-dashboard > * {
  position: relative;
  z-index: 1;
}

.services-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 10px;
}

.services-checkboxes .form-check {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.services-checkboxes .form-check:hover {
  background-color: #e9ecef;
}

.services-checkboxes .form-check-input {
  margin-right: 8px;
}

.services-checkboxes .form-check-label {
  margin-left: 0.3rem;
  font-size: 0.9rem;
  color: #495057;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.register-organization {
  animation: fadeIn 0.5s ease-out;
}
</style>