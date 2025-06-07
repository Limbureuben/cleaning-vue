<template>
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
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <input type="text" class="form-control" placeholder="First Name" v-model="cleaner.firstName" required />
                  </div>
                  <div class="col-md-6 mb-4">
                    <input type="text" class="form-control" placeholder="Last Name" v-model="cleaner.lastName" required />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <input type="email" class="form-control" placeholder="Email" v-model="cleaner.email" required />
                  </div>
                  <div class="col-md-6 mb-4">
                    <input type="tel" class="form-control" placeholder="Phone Number" v-model="cleaner.phone" required />
                  </div>
                </div>

                <div class="mb-4">
                  <textarea class="form-control" placeholder="Address" rows="3" v-model="cleaner.address" required></textarea>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-4">
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Skills (e.g. Carpet cleaning)"
                        v-model="cleaner.skills"
                        />
                    </div>
                    <div class="col-md-6 mb-4">
                        <select class="form-select" v-model="cleaner.availability" required>
                        <option value="">Select Availability</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="weekends">Weekends Only</option>
                        </select>
                    </div>
                    </div>
                <h5 class="mb-3 text-center text-primary">Assign to Booking</h5>
                <div class="mb-4">
                  <select class="form-select" v-model="selectedBooking">
                    <option value="">Select a booking</option>
                    <option v-for="booking in availableBookings" :key="booking.id" :value="booking.id">
                      {{ booking.customerName }} - {{ booking.date }} - {{ booking.service }}
                    </option>
                  </select>
                </div>

                <button type="submit" class="btn w-100 fw-bold" style="background-color: #6A80B9; border-color: #FE4F2D;">
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

const showForm = ref(false)

onMounted(() => {
  showForm.value = true
})

const cleaner = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  skills: '',
  availability: ''
})

const selectedBooking = ref('')
const availableBookings = ref([
  { id: 1, customerName: 'John Doe', date: '2025-06-10', service: 'House Cleaning' },
  { id: 2, customerName: 'Jane Smith', date: '2025-06-11', service: 'Office Cleaning' },
])

const registerCleaner = async () => {
  console.log('Registering cleaner:', cleaner.value)
  if (selectedBooking.value) {
    console.log('Assigning cleaner to booking:', selectedBooking.value)
  }

  cleaner.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    availability: ''
  }
  selectedBooking.value = ''
}
</script>

<style scoped>
input.form-control,
textarea.form-control,
select.form-select {
  height: 50px;
  border-radius: 0;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
}

textarea.form-control {
  height: auto;
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

.btn {
  border-radius: 2px;
}
</style>
