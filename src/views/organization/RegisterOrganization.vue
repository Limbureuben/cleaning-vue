<template>
  <OrganizationHeader />
  <div class="container-dashboard">
    <div class="register-organization container">
      <h4 class="text-center mb-4">Register Property</h4>
      <form @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-md-4">
            <label for="location" class="form-label">Region</label>
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
          <div class="col-md-4">
            <label for="price" class="form-label">Price (TZS)</label>
            <input type="number" class="form-control" v-model="form.price" placeholder="100000" id="price" required>
          </div>

          <!-- Row 2 -->
          <div class="col-md-4">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" placeholder="Mwenge, P.O.BOX 28" v-model="form.address" id="address" required>
          </div>
          <div class="col-md-4">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="tel" class="form-control" placeholder="0712345678" v-model="form.phone" id="phone" required>
          </div>
          <div class="col-md-4">
            <label for="file" class="form-label">Upload Document</label>
            <input type="file" class="form-control" @change="handleFileUpload" id="file" />
          </div>

          <!-- Row 3 -->
          <div class="col-md-4">
            <label for="bedrooms" class="form-label">Bedrooms</label>
            <input type="number" class="form-control" v-model="form.bedrooms" id="bedrooms" placeholder="e.g. 3" required>
          </div>
          <div class="col-md-4">
            <label for="guests" class="form-label">Guests</label>
            <input type="number" class="form-control" v-model="form.guests" id="guests" placeholder="e.g. 5" required>
          </div>
          <div class="col-md-4">
            <label for="bathrooms" class="form-label">Bathrooms</label>
            <input type="number" class="form-control" v-model="form.bathrooms" id="bathrooms" placeholder="e.g. 2" required>
          </div>

          <!-- Services Section -->
          <div class="col-12">
            <label class="form-label">Services Offered</label>
            <div class="services-checkboxes">
              <div class="form-check" v-for="service in availableServices" :key="service">
                <input class="form-check-input" type="checkbox" :value="service" v-model="form.services" :id="`service-${service}`" />
                <label class="form-check-label" :for="`service-${service}`">{{ service }}</label>
              </div>
            </div>
          </div>

          <div class="col-12 text-center mt-3">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
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
  location: '',
  price: '',
  address: '',
  phone: '',
  services: [],
  file: null,
  bedrooms: '',
  guests: '',
  bathrooms: ''
})

const handleFileUpload = (event) => {
  form.value.file = event.target.files[0]
}



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
    const token = localStorage.getItem('token');
    const formData = new FormData();

    for (const key in form.value) {
      if (key === 'services') {
        form.value.services.forEach(service => formData.append('services', service));
      } else if (key !== 'file' && form.value[key] !== null && form.value[key] !== '') {
        formData.append(key, form.value[key]);
      }
    }

    if (form.value.file) {
      formData.append('file', form.value.file);
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

    // Reset form
    form.value = {
      location: '',
      price: '',
      phone: '',
      address: '',
      services: [],
      file: null,
      bedrooms: '',
      guests: '',
      bathrooms: ''
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
  min-height: 460px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, #06923E 0px 6px 6px;
  padding: 30px;
  transition: all 0.3s ease;
}

.register-organization:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px #06923E;
}

h4 {
  color: #06923E;
  font-weight: bold;
  padding-top: 0px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom:8px;
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
  border-color: #06923E;
  box-shadow: 0 0 0 3px #06923E;
}

.btn-primary {
  background-color: #06923E;
  border: none;
  border-radius: 4px;
  padding: 0.35rem 2.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(106, 128, 185, 0.2);
}

.btn-primary:hover {
  background-color: #06923E;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(106, 128, 185, 0.3);
}

.container-dashboard {
  /* background-image: url('../../assets/images/wonaclean.jpg'); */
  background-size: cover;
  background-position: center;
  min-height: 88vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
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
}

.services-checkboxes .form-check {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 8px 15px;
  border-radius: 10px;
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