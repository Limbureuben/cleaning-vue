<template>
  <div>
    <header class="organization-header">
      <h1>{{ organizationName }}</h1>
      <nav>
        <ul>
          <li><router-link to="/user-dashboard">Dashboard</router-link></li>
          <li>
            <span class="notification-icon" @click="toggleNotificationPopup">
              <i class="fas fa-bell"></i>
              <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
            </span>
          </li>
          <li><button @click="logout" class="logout-button">Logout</button></li>
        </ul>
      </nav>
    </header>

    <div v-if="showNotifications" class="notification-popup">
      <div class="notification-header">
        <strong>Notifications</strong>
        <button class="close-btn" @click="showNotifications = false">×</button>
      </div>
      <ul class="notification-list">
        <li v-if="notifications.length === 0">No notifications.</li>
        <li v-for="n in notifications" :key="n.id">
          <p><strong>{{ n.title }}</strong></p>
          <p style="font-size: 13px;">{{ n.message }}</p>
          <hr />
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import Swal from 'sweetalert2';
export default {
  name: 'OrganizationHeader',
  data() {
  return {
    organizationName: 'AIR BNB',
    unreadCount: 0,
    notifications: [],
    showNotifications: false
  }
},
mounted() {
  this.fetchNotificationCount();
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
  },

  async fetchNotificationCount() {
    try {
      const res = await fetch('http://localhost:8000/api/notifications/unread-count/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        this.unreadCount = data.unread_count;
      }
    } catch (error) {
      console.error('Notification count error:', error);
    }
  },

  async toggleNotificationPopup() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      try {
        const res = await fetch('http://localhost:8000/api/notifications/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          this.notifications = await res.json();
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }
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

.notification-icon {
  position: relative;
  color: white;
  font-size: 20px;
  text-decoration: none;
}

.notification-icon i {
  font-size: 20px;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 10px;
  border-radius: 50%;
  padding: 2px 6px;
}

.notification-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.notification-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notification-list li {
  padding: 10px 15px;
  border-bottom: 1px solid #e0e0e0;
}

.notification-list li:last-child {
  border-bottom: none;
}

</style>
