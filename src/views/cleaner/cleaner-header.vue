<template>
  <header class="header">
    <nav>
      <router-link to="/cleaner-dashboard">Dashboard</router-link>
      <router-link to="/available-house">Jobs</router-link>
      <router-link to="/cleaner-request">Request</router-link>
      <router-link to="#">Profile</router-link>
    </nav>
    <button @click="logout" class="logout-btn">Logout</button>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HeaderComponent',
  setup() {
    const router = useRouter()

    const logout = () => {
      // Implement logout logic here
      // For example:
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      router.push('/login')
    }

    return { logout }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #6A80B9;
  color: white;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

.logout-btn {
  background-color: #FE4F2D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #e63e1c;
}
</style>