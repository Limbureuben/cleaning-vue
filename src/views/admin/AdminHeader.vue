<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow" style="background-color: #FE4F2D;">
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
            <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/users" class="nav-link">Users</router-link>
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
                <li><router-link class="dropdown-item" >Register Company</router-link></li>
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
  font-size: 1.3rem;
}

.nav-link {
  font-weight: 500;
}

.btn-outline-light:hover {
  background-color: white;
  color: #FE4F2D;
}

.navbar {
  z-index: 1050;
}

.navbar .dropdown-menu {
  z-index: 2000;
}

</style>
