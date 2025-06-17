<template>
  <OrganizationHeader />
  <div class="bg-cover">
    <div class="d-flex justify-content-center align-items-center full-screen">
      <div class="container position-relative z-1">
        <div class="row justify-content-center">
          <transition name="fade-slide">
            <div
              class="col-12 col-md-10 col-lg-8 bg-white p-5 rounded shadow"
              style="min-width: 450px;"
              v-show="showForm"
            >
              <h4 class="mb-4 text-center fw-bold" style="color: #6A80B9;">Register New Cleaner</h4>

              <form @submit.prevent="registerCleaner">
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Full Name" v-model="cleaner.full_name" required />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Location" v-model="cleaner.location" required />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Phone / Contact" v-model="cleaner.contact" required />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Username" v-model="cleaner.username" required />
                </div>
                <div class="mb-3">
                  <input type="email" class="form-control" placeholder="Email" v-model="cleaner.email" required />
                </div>
                <div class="mb-4">
                  <input type="password" class="form-control" placeholder="Password" v-model="cleaner.password" required />
                </div>

                <button type="submit" class="btn w-100 fw-bold text-white" style="background-color: #6A80B9;">
                  Register Cleaner
                </button>
              </form>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import OrganizationHeader from './OrganizationHeader.vue'

const showForm = ref(false)

const cleaner = ref({
  full_name: '',
  location: '',
  contact: '',
  username: '',
  email: '',
  password: ''
})

const registerCleaner = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/register-cleaner/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(cleaner.value)
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Build a readable error message
      const errorMessages = Object.entries(errorData)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');

      // Show error with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessages,
        confirmButtonColor: '#d33'
      });

      return; // Stop further execution
    }

    // Success
    Swal.fire({
      icon: 'success',
      title: 'Cleaner Registered',
      text: 'The cleaner was successfully added and can now log in.',
      confirmButtonColor: '#6A80B9'
    });

    cleaner.value = {
      full_name: '',
      location: '',
      contact: '',
      username: '',
      email: '',
      password: ''
    };
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Request Failed',
      text: 'A system error occurred. Please try again later.',
      confirmButtonColor: '#d33'
    });
  }
};


onMounted(() => {
  showForm.value = true;
});
</script>


<style scoped>
input.form-control,
select.form-select {
  height: 50px;
  border-radius: 0;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
}

.bg-cover {
  background-image: url('../../assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 1;
}

.full-screen {
  height: 100vh;
  position: relative;
  z-index: 1;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-enter-active {
  transition: all 0.6s ease;
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
