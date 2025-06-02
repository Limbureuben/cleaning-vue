<template>
  <AdminHeader />
  <div class="register-organization container">
    <h2 class="text-center mb-5">Register Organization</h2>
    <form @submit.prevent="registerOrganization">
      <div class="row">
        <!-- First row: Organization Name and Email -->
        <div class="col-md-6 mb-3">
          <label for="organizationName" class="form-label">Organization Name</label>
          <input type="text" class="form-control" id="organizationName" v-model="organizationName" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Organization Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>

        <!-- Second row: Phone and Address -->
        <div class="col-md-6 mb-3">
          <label for="phone" class="form-label">Phone</label>
          <input type="tel" class="form-control" id="phone" v-model="phone" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" v-model="address" required>
        </div>

        <!-- Services Offered (single row full width) -->
        <div class="col-12 mb-3">
          <label for="services" class="form-label">Services Offered</label>
          <textarea class="form-control" id="services" v-model="services" rows="3" required></textarea>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary px-4 py-2">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import AdminHeader from './AdminHeader.vue'
export default {
  name: 'RegisterOrganization',
  data() {
    return {
      organizationName: '',
      email: '',
      phone: '',
      address: '',
      services: ''
    }
  },
  methods: {
    registerOrganization() {
      // Add your registration logic here
      console.log('Organization Registered:', {
        organizationName: this.organizationName,
        email: this.email,
        phone: this.phone,
        address: this.address,
        services: this.services
      });
      // Reset form fields
      this.organizationName = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.services = '';
    }
  }
}
</script>

<style scoped>
.register-organization {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
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
  background-color: #FE4F2D;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
  background-color: #e63e1c;
  transform: scale(1.05);
}
</style>