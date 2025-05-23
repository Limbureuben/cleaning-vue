<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow" style="background-color: #FE4F2D">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link to="/" class="navbar-brand fw-bold">Admin Dashboard</router-link>

      <!-- Toggler for small devices -->
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
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

        <!-- Logout button -->
        <button class="btn btn-outline-light ms-auto" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i> Logout
        </button>
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
.navbar-brand {
  font-size: 1.3rem;
}

.navbar-nav .nav-link {
  font-weight: 500;
}

.btn-outline-light:hover {
  background-color: white;
  color: #FE4F2D;
}
</style>