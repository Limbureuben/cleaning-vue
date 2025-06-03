<template>
  <AdminHeader />
    <div class="bg-cover">
  <div class="d-flex justify-content-center align-items-center full-screen">

    <div class="container position-relative z-1">
      <div class="row justify-content-center">
        <transition name="fade-slide">
          <div
            v-if="showForm"
            class="col-12 col-md-8 col-lg-6 col-xl-5 bg-white p-5 rounded shadow"
            style="min-width: 450px;"
          >
            <form @submit.prevent="onSubmit">
              <div class="mb-4">
                <input
                  type="text"
                  v-model="form.username"
                  class="form-control"
                  placeholder="Enter Staff name"
                  required
                />
              </div>

              <div class="mb-4">
                <input
                  type="email"
                  v-model="form.email"
                  class="form-control"
                  placeholder="Comapny email"
                  required
                />
              </div>

              <div class="mb-4">
                <input
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  placeholder="Enter default password"
                  required
                />
              </div>

              <div class="mb-4">
                <input
                  type="password"
                  v-model="form.confirmPassword"
                  class="form-control"
                  placeholder="Confirm default password"
                  required
                />
              </div>
              <div class="mb-3">
                <select
                  v-model="form.role"
                  id="role"
                  class="form-select py-2 border border-primary rounded-1 shadow-sm"
                  style="color: #6c757d;"
                  required
                >
                  <option value="" disabled selected hidden>-- Select role --</option>
                  <option value="staff" style="color: #000;">Staff</option>
                  <option value="user" style="color: #000;">User</option>
                </select>
              </div>
              <button type="submit" class="btn w-100 fw-bold" style="background-color: #6A80B9; border-color: #6A80B9;">
                Register
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable';
import REGISTER_USER from '@/graphql/registerUser.graphql'
import Swal from 'sweetalert2'
import router from '@/router';
import AdminHeader from './AdminHeader.vue';

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
});


const showForm = ref(false)

const { mutate: registerUser, onDone, onError } = useMutation(REGISTER_USER);

const onSubmit = async () => {
  registerUser({
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
    confirmPassword: form.value.confirmPassword,
    role: form.value.role
  });

  onDone(({ data }) => {
    if (data.registerUser.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500
      });

      form.value.username = '';
      form.value.email = '';
      form.value.password = '';
      form.value.confirmPassword = '';
      form.value.role = '';

      setTimeout(() => {
        router.push('/admin-dashboard');
      }, 200);
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: data.registerUser.message
      });
    }
  });

  onError((error) => {
    Swal.fire({
      icon: "error",
      title: "Registration failed",
      text: error.message
    });
  });
}
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-image: url('../../assets/images/wonaclean.jpg');
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