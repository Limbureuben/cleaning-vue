<template>
    <div class="bg-cover">
     <BackButton />
  <div class="d-flex justify-content-center align-items-center full-screen">

    <div class="container position-relative z-1">
      <div class="row justify-content-center">
        <transition name="fade-slide">
          <div
            v-if="showForm"
            class="col-12 col-md-8 col-lg-6 col-xl-5 bg-white p-5 rounded shadow"
            style="min-width: 450px;"
          >
            <h4 class="mb-4 text-center fw-bold" style="color: #FE4F2D;">REGISTRATION</h4>
            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <input
                  v-model="form.username"
                  type="text"
                  class="form-control"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div class="mb-4">
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="mb-4">
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div class="mb-4">
                <input
                  v-model="form.confirmPassword"
                  type="password"
                  class="form-control"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button type="submit" class="btn w-100 fw-bold" style="background-color: #FE4F2D; border-color: #FE4F2D;">
                Register
              </button>
            </form>

            <p class="mt-3 text-center">
              Already have an account?
              <router-link to="/login" class="fw-bold" style="color: #FE4F2D;">Login</router-link>
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Background from './Background.vue'
import BackButton from './BackButton.vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function submitForm() {
  if (form.password !== form.confirmPassword) {
    alert("Passwords don't match!")
    return
  }
  alert(`Registered with username: ${form.username}, email: ${form.email}`)
}

const showForm = ref(false)

onMounted(() => {
  showForm.value = true
})

</script>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
}

input.form-control {
  height: 50px;        /* Increase height as you like */
  border-radius: 0 !important; /* Remove border radius */
  font-size: 1rem;     /* Optional: bigger font for better look */
  padding: 0.375rem 0.75rem; /* You can adjust vertical padding */
}

input.form-control:focus {
  box-shadow: none !important;
  outline: none !important;
  border-color: #ced4da; /* Optional: make border same as unfocused state */
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

.bg-cover {
  background-image: url('../assets/images/woman.png'); /* Replace with actual path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}

.full-screen {
  height: 100vh;
  position: relative;
  z-index: 1;
}

.btn {
  border-radius: 2px;
}

</style>
