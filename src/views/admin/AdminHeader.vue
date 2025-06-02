<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow" style="background-color: #1C70E6FF;">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link to="/" class="navbar-brand fw-bold">Admin Dashboard</router-link>

      <!-- Toggler for small screens -->
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible content -->
      <div :class="['collapse navbar-collapse', { show: isMenuOpen }]">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin-dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/users" class="nav-link">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register-staff" class="nav-link">RegisterStaff</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/settings" class="nav-link">Settings</router-link>
          </li>
        </ul>

        <!-- Right Side Buttons -->
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-outline-light" @click="logout">
            <i class="bi bi-box-arrow-right me-1"></i> Logout
          </button>

          <!-- Profile Dropdown -->
          <div class="dropdown">
            <a
              class="nav-link dropdown-toggle text-white"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle fs-4"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><router-link class="dropdown-item">Profile</router-link></li>
              <li><router-link class="dropdown-item">Register Company</router-link></li>
              <li><router-link class="dropdown-item">Users</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  z-index: 1050; /* ensure it stays on top */
}

.navbar-brand {
  font-size: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.nav-link {
  font-weight: 500;
  color: white;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffcccb;
}

.btn-outline-light {
  border: 2px solid white;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-light:hover {
  color: #EC3D3DFF;
}

.dropdown-menu {
  background-color: #287FD5FF;
  border: none;
}

.dropdown-item {
  color: white;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #1C70E6FF;
}

.dropdown-divider {
  border-color: white;
}
</style>
