<template>
  <header class="organization-header">
    <h1>{{ organizationName }}</h1>
    <nav>
      <ul>
        <li><router-link to="/organization">Dashboard</router-link></li>
        <li><router-link to="/register-organization">RegisterHouse</router-link></li>
        <li><router-link to="/availablebooking">Booking</router-link></li>
        <li><router-link to="/registercleaner">AddCleaner</router-link></li>
        <li><a href="#settings">Settings</a></li>
        <li><button @click="logout" class="logout-button">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: 'OrganizationHeader',
  data() {
    return {
      organizationName: 'AIR BNB',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');

        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout successful",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        this.$router.push('/');
      }, 1500);
    }

    
  }
}
</script>

<style scoped>
.organization-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #6A80B9;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.organization-header h1 {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-left: 1.5rem;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #ffcccb;
}

.logout-button {
  background-color: #FE4F2D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #e63e1c;
}
</style>
