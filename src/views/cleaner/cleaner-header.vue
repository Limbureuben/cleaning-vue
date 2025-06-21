<template>
  <header class="header">
    <nav>
      <router-link to="/cleaner-dashboard">Dashboard</router-link>
      <router-link to="/available-house">Jobs</router-link>
      <router-link to="/cleaner-request">Request</router-link>
      <router-link to="#">Profile</router-link>
    </nav>

    <div class="actions">
      <span class="notification-icon" @click="toggleNotificationPopup">
        <i class="fas fa-bell"></i>
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
      </span>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </header>

   <div v-if="showNotifications" class="overlay" @click="showNotifications = false"></div>

    <!-- Notification Popup -->
    <div v-if="showNotifications" class="notification-popup">
      <div class="notification-header">
        <strong>Notifications</strong>
        <button class="close-btn" @click="showNotifications = false">&times;</button>
      </div>
      <ul class="notification-list">
        <li v-if="notifications.length === 0">No notifications.</li>
        <li v-for="n in notifications" :key="n.id">
          <p><strong>{{ n.title }}</strong></p>
          <p>{{ n.message }}</p>
        </li>
      </ul>
    </div>
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

  const showNotifications = ref(false)
  const notifications = ref([])

  const toggleNotificationPopup = async () => {
    showNotifications.value = !showNotifications.value;
    if (showNotifications.value) {
      try {
        const res = await fetch('http://localhost:8000/api/notifications/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          notifications.value = await res.json();
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }
  }
    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      router.push('/login')
    }

    onMounted(() => {
      fetchUnreadNotifications();
    });

    return {
      logout,
      unreadCount,
      showNotifications,
      notifications,
      toggleNotificationPopup
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
  cursor: pointer;
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


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* semi-transparent black */
  z-index: 999; /* below popup */
}

.notification-popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000; /* above overlay */
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #6A80B9;
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.notification-header strong {
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.notification-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notification-list li {
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.notification-list li:hover {
  background-color: #f5f5f5;
}

.notification-list li:last-child {
  border-bottom: none;
}

.notification-list li p {
  margin: 0;
  line-height: 1.4;
}

.notification-list li p:first-child {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
}

.notification-list li p:last-child {
  font-size: 0.9rem;
  color: #666;
}

.notification-list hr {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

</style>