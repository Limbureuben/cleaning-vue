<template>
  <div class="bg-cover">
  <BackButton />
    <div class="d-flex justify-content-center align-items-center full-screen">
      <div class="container position-relative z-1">
        <div class="row justify-content-center">
          <transition name="fade-slide">
            <div
              class="col-12 col-md-8 col-lg-6 col-xl-5 bg-white p-5 rounded shadow"
              style="min-width: 450px;"
              v-show="showForm"
            >
              <h4 class="mb-4 text-center fw-bold" style="color: #06923E;">LOGIN</h4>

              <form @submit.prevent="submitForm">
                <div class="mb-4">
                  <input
                    v-model="form.username"
                    type="text"
                    id="username"
                    class="form-control"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div class="mb-4">
                  <input
                    v-model="form.password"
                    type="password"
                    id="email"
                    class="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" class="btn w-100 fw-bold" style="background-color: #06923E; border-color: #FE4F2D;">
                  Login
                </button>
              </form>
              <p class="mt-3 text-center">
                Don't have an account?
                <router-link to="/register" class="fw-bold" style="color: #06923E;">
                  Register
                </router-link>
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
import swal from 'sweetalert2'
import { useMutation } from '@vue/apollo-composable';
import LoginUser from '@/graphql/loginUser.graphql'

const router = useRouter();

const form = ref({
  username: '',
  password: '',
})

const { mutate: loginUser, onDone, onError } = useMutation(LoginUser);

const submitForm = async () => {
  loginUser({
    username: form.value.username,
    password: form.value.password
  });

  onDone(({ data }) => {
    const result = data.loginUser;

    if (result.success && result.user.token) {
      const user = result.user;
      
      localStorage.setItem('token', user.token);
      localStorage.setItem('role', user.isSuperuser ? 'superuser' : user.isStaff ? 'staff' : user.isCleaner ? 'cleaner' : 'user');

      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500
     }).then(() => {
      const user = result.user;

      if (user.isSuperuser === true) {
      router.push('/admin-dashboard');
        } else if (user.isStaff === true && user.isCleaner !== true) {
          router.push('/organization');
        } else if (user.isCleaner === true) {
          router.push('/cleaner-dashboard');
        } else {
          router.push('/user-dashboard');
        }

        // if (user.isSuperuser === true) {
        //   router.push('/admin-dashboard');
        // } else if (user.isStaff === true && user.isCleaner !== true) {
        //   router.push('/organization');
        // } else if (user.isCleaner === true) {
        //   router.push('/availablebooking');
        // } else {
        //   router.push('/available-organization');
        // }
      });
    } else {
      swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: result.message || 'Please check your credentials and try again.'
      });
    }
  });

  onError((error) => {
    swal.fire({
      icon: 'error',
      title: 'Login failed',
      text: error.message
    });
  });
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
  /* background-image: url('../assets/images/woman.png'); Replace with actual path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.8;
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
