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
                <!-- Full Name -->
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name"
                    v-model="form.username"
                    required
                  />
                </div>

                <!-- Email -->
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    v-model="form.email"
                    required
                  />
                </div>

                <!-- Password -->
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="form.password"
                    required
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="form.passwordConfirm"
                    required
                  />
                </div>

                <!-- Role Dropdown -->
                <div class="mb-4">
                  <select
                    class="form-select"
                    v-model="form.role"
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="is_cleaner">Cleaner</option>
                    <option value="user">Normal User</option>
                  </select>
                </div>
                <button type="submit" class="btn w-100 fw-bold text-white" style="background-color: #6A80B9;">
                  Register User
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
import { useMutation } from '@vue/apollo-composable'

const form = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: ''
})

const showForm = ref(false)

const registerCleaner = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/register-cleaner/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        passwordConfirm: form.value.passwordConfirm,
        role: form.value.role
      })
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500
      });

      // Reset the form
      form.value = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: ''
      };
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: data.error || 'Something went wrong.'
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: error.message
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
