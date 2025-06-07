<template>
  <div class="register-cleaner-container">
    <h2 class="mb-4">Register New Cleaner</h2>
    <form @submit.prevent="registerCleaner">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input type="text" class="form-control" id="firstName" v-model="cleaner.firstName" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="lastName" v-model="cleaner.lastName" required>
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="cleaner.email" required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input type="tel" class="form-control" id="phone" v-model="cleaner.phone" required>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <textarea class="form-control" id="address" v-model="cleaner.address" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="skills" class="form-label">Skills</label>
        <input type="text" class="form-control" id="skills" v-model="cleaner.skills" placeholder="e.g. Carpet cleaning, Window washing">
      </div>
      <div class="mb-4">
        <label for="availability" class="form-label">Availability</label>
        <select class="form-select" id="availability" v-model="cleaner.availability" required>
          <option value="">Select availability</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="weekends">Weekends Only</option>
        </select>
      </div>

      <h3 class="mb-3">Assign to Booking</h3>
      <div class="mb-3">
        <label for="booking" class="form-label">Select Booking</label>
        <select class="form-select" id="booking" v-model="selectedBooking">
          <option value="">Select a booking</option>
          <option v-for="booking in availableBookings" :key="booking.id" :value="booking.id">
            {{ booking.customerName }} - {{ booking.date }} - {{ booking.service }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Register Cleaner</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const cleaner = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  skills: '',
  availability: ''
});

const selectedBooking = ref('');

// Mock data for available bookings
const availableBookings = ref([
  { id: 1, customerName: 'John Doe', date: '2025-06-10', service: 'House Cleaning' },
  { id: 2, customerName: 'Jane Smith', date: '2025-06-11', service: 'Office Cleaning' },
  // Add more bookings as needed
]);

const registerCleaner = async () => {
  try {
    // Here you would typically make an API call to register the cleaner
    console.log('Registering cleaner:', cleaner.value);
    
    if (selectedBooking.value) {
      console.log('Assigning cleaner to booking:', selectedBooking.value);
      // Here you would make another API call to assign the cleaner to the booking
    }

    // Show success message

    // Reset form
    cleaner.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      skills: '',
      availability: ''
    };
    selectedBooking.value = '';
  } catch (error) {
    console.error('Error registering cleaner:', error);
  }
};
</script>

<style scoped>
.register-cleaner-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  color: #333;
}

.form-label {
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>