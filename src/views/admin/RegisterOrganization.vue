<template>
  <div class="register-organization">
    <h2 class="text-center mb-5">Register Organization</h2>
    <form @submit.prevent="registerOrganization">
      <div class="mb-3">
        <label for="organizationName" class="form-label">Organization Name</label>
        <input type="text" class="form-control" id="organizationName" v-model="organizationName" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input type="tel" class="form-control" id="phone" v-model="phone" required>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input type="text" class="form-control" id="address" v-model="address" required>
      </div>
      <div class="mb-3">
        <label for="services" class="form-label">Services Offered</label>
        <textarea class="form-control" id="services" v-model="services" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
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
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.btn-primary {
  background-color: #FE4F2D;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #e63e1c;
}
</style>