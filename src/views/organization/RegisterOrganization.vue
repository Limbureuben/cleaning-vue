<template>
  <OrganizationHeader />
  <div class="container-dashboard">
  <div class="register-organization container">
    <h4 class="text-center mb-4">Register Organization</h4>
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- First row: Organization Name and Location Dropdown -->
        <div class="col-md-6 mb-3">
          <label for="organizationName" class="form-label">Organization Name</label>
          <input type="text" class="form-control" v-model="form.organization_name" id="organizationName" required>
        </div>

        <div class="col-md-6 mb-3">
          <label for="location" class="form-label">Organization Location</label>
          <select id="location" v-model="form.location" class="form-control" required>
            <option value="">Select a location</option>
            <option value="Location 1">Dar-es-salaam</option>
            <option value="Location 2">Dodoma</option>
            <option value="Location 3">Mwanza</option>
            <option value="Location 4">Arusha</option>
            <option value="Location 5">Mbeya</option>
            <option value="Location 6">Tanga</option>
            <option value="Location 7">Morogoro</option>
            <option value="Location 8">Iringa</option>
            <option value="Location 9">Kagera</option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label for="phone" class="form-label">Email</label>
          <input type="tel" class="form-control" v-model="form.email" id="email" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" v-model="form.address" id="address" required>
        </div>

        <div class="col-12 mb-3">
          <label for="services" class="form-label">Services Offered</label>
          <textarea class="form-control" id="services" rows="3" v-model="form.service" required></textarea>
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
import OrganizationHeader from './OrganizationHeader.vue';

const form = ref({
  organization_name: '',
  location: '',
  email: '',
  address: '',
  service: ''
})

const router = useRouter()

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/organizations-registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    console.log('Registered:', data)

    // Use SweetAlert2 success alert
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Organization registered successfully!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })

    // Optionally, clear the form after registration
    form.value = {
      organization_name: '',
      location: '',
      email: '',
      address: '',
      service: ''
    }

    // Optionally redirect
    // router.push('/some-route')
  } catch (error) {
    console.error('Error registering:', error)

    // Use SweetAlert2 error alert
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Error registering organization. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    })
  }
}
</script>


<style scoped>
.register-organization {
  max-width: 700px;
  border-radius: 4px;
  position: relative;
  align-items: center;
  top: 0px;
  min-height: 470px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

h4 {
  color: #333;
  font-weight: bold;
  padding-top: 10px;
  text-transform: uppercase;
  color: #1C70E6FF;
  letter-spacing: 2px;
}

.form-label {
  font-weight: bold;
  color: #555;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 0.75rem;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #FE4F2D;
  box-shadow: 0 0 5px rgba(254, 79, 45, 0.5);
}

.btn-primary {
  background-color: #1C70E6FF;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 4.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
  background-color: #1C70E6FF;
  transform: scale(1.05);
}

.container-dashboard {
  background-image: url('../../assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  min-height: 88vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  background: rgba(253, 253, 253, 0.985);
  z-index: -1;

}

.container-dashboard > * {
  position: relative;
  z-index: 1;

}
</style>