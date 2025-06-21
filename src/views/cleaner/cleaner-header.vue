<template>
  <header class="header">
    <nav>
      <router-link to="/cleaner-dashboard">Dashboard</router-link>
      <router-link to="/available-house">Jobs</router-link>
      <router-link to="/cleaner-request">Request</router-link>
      <router-link to="#">Profile</router-link>
    </nav>

    <div class="actions">
      <router-link to="/notifications" class="notification-icon">
        <i class="fas fa-bell"></i>
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
      </router-link>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </header>
</template>


<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HeaderComponent',
  setup() {
    const router = useRouter()
    const unreadCount = ref(0)

    const fetchUnreadNotifications = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/notifications/unread-count/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          unreadCount.value = data.unread_count
        }
      } catch (err) {
        console.error('Error fetching notifications', err)
      }
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      router.push('/login')
    }

    onMounted(() => {
      fetchUnreadNotifications()
    })

    return {
      logout,
      unreadCount
    }
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

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.notification-icon {
  position: relative;
  color: white;
  font-size: 22px;
  text-decoration: none;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 11px;
  border-radius: 50%;
  padding: 2px 6px;
}

</style>