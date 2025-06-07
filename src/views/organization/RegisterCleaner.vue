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
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name"
                    v-model="cleaner.full_name"
                    required
                  />
                </div>
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone / Contact"
                    v-model="cleaner.contact"
                    required
                  />
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
import OrganizationHeader from './OrganizationHeader.vue';

const showForm = ref(false)

const cleaner = ref({
  full_name: '',
  contact: ''
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

    if (!response.ok) throw new Error('Failed to register cleaner');

    alert('Cleaner registered successfully!');
    cleaner.value = {
      full_name: '',
      contact: ''
    };
  } catch (error) {
    console.error(error);
    alert('Something went wrong during cleaner registration.');
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
  background-image: url('../assets/images/woman.png');
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
