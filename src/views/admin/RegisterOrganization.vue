<template>
  <AdminHeader />
  <div class="register-organization container">
    <h4 class="text-center mb-4">Register Organization</h4>
    <form>
      <div class="row">
        <!-- First row: Organization Name and Location Dropdown -->
        <div class="col-md-6 mb-3">
          <label for="organizationName" class="form-label">Organization Name</label>
          <input type="text" class="form-control" id="organizationName" required>
        </div>

        <div class="col-md-6 mb-3">
          <label for="location" class="form-label">Organization Location</label>
          <select id="location" class="form-control" required>
            <option value="">Select a location</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
            <!-- Add more options as needed -->
          </select>
        </div>

        <!-- Second row: Phone and Address -->
        <div class="col-md-6 mb-3">
          <label for="phone" class="form-label">Phone</label>
          <input type="tel" class="form-control" id="phone" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" required>
        </div>

        <!-- Services Offered (single row full width) -->
        <div class="col-12 mb-3">
          <label for="services" class="form-label">Services Offered</label>
          <textarea class="form-control" id="services" rows="3" required></textarea>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'

</script>

<style scoped>
.register-organization {
  max-width: 700px;
  background-color: #FFFFFFFF;
  border-radius: 4px;
  position: relative;
  align-items: center;
  top: 100px;
  min-height: 500px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

h4 {
  color: #333;
  font-weight: bold;
  padding-top: 10px;
  text-transform: uppercase;
  color: #1C70E6FF;
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
  background-color: #1C70E6FF;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 4.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
  background-color: #1C70E6FF;
  transform: scale(1.05);
}
</style>