<template>
  <OrganizationHeader />
  <div class="container-dashboard">
    <div class="register-organization container">
      <h4 class="text-center mb-4">Register Property</h4>
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="organizationName" class="form-label">Organization Name</label>
            <input type="text" placeholder="DEBORA COMPANY" class="form-control" v-model="form.organization_name" id="organizationName" required>
          </div>

          <div class="col-md-6 mb-3">
            <label for="location" class="form-label">Organization Region</label>
            <select id="location" v-model="form.location" class="form-control" required>
              <option value="">Select a location</option>
              <option value="Dar-es-salaam">Dar-es-salaam</option>
              <option value="Dodoma">Dodoma</option>
              <option value="Mwanza">Mwanza</option>
              <option value="Arusha">Arusha</option>
              <option value="Mbeya">Mbeya</option>
              <option value="Tanga">Tanga</option>
              <option value="Morogoro">Morogoro</option>
              <option value="Iringa">Iringa</option>
              <option value="Kagera">Kagera</option>
            </select>
          </div>

          <div class="col-md-6 mb-3">
            <input type="number" class="form-control" v-model="form.price" placeholder="100000" id="price" required>
          </div>

          <div class="col-md-6 mb-3">
            <input type="text" class="form-control" placeholder="Mwenge, P.O.BOX 28" v-model="form.address" id="address" required>
          </div>

          <!-- Horizontal Phone Number and File Upload -->
          <div class="col-md-6 mb-3">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="tel" class="form-control" placeholder="e.g. 0712345678" v-model="form.phone" id="phone" required>
          </div>

          <div class="col-md-6 mb-3">
            <label for="file" class="form-label">Upload Document</label>
            <input type="file" class="form-control" @change="handleFileUpload" id="file" />
          </div>

          <!-- Multiple services checkboxes - horizontal layout -->
          <div class="col-12 mb-3">
            <label class="form-label">Services Offered</label>
            <div class="services-checkboxes d-flex flex-wrap gap-3">
              <div class="form-check" v-for="service in availableServices" :key="service">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="service"
                  v-model="form.services"
                  :id="`service-${service}`"
                />
                <label class="form-check-label" :for="`service-${service}`">{{ service }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import OrganizationHeader from './OrganizationHeader.vue'

const form = ref({
  organization_name: '',
  location: '',
  email: '',
  address: '',
  services: []
})


const availableServices = [
  'Cleaning',
  'Laundry',
  'Gardening',
  'Pest Control',
  'Security',
  'Waste Management'
]

const router = useRouter()

const submitForm = async () => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const formData = new FormData();

    for (const key in form.value) {
      if (key === 'services') {
        form.value.services.forEach(service => formData.append('services', service));
      } else if (form.value[key] !== null && form.value[key] !== '') {
        formData.append(key, form.value[key]);
      }
    }

    const response = await fetch('http://localhost:8000/api/organizations-registration/', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    console.log('Registered:', data);

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Organization registered successfully!',
      confirmButtonColor: '#6A80B9',
      confirmButtonText: 'OK'
    });

    router.push('/organization');

    // Clear form
    form.value = {
      organization_name: '',
      location: '',
      price: '',
      phone: '',
      address: '',
      services: [],
      file: null  
    };

  } catch (error) {
    console.error('Error registering:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Error registering organization. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  }
}

</script>
<style scoped>
.register-organization {
  max-width: 800px;
  border-radius: 4px;
  position: relative;
  align-items: center;
  top: 0px;
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
  margin-bottom: 15px;
  font-size: 20px;
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