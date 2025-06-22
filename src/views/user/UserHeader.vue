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
          <button class="delete-btn" @click="deleteNotification(n.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
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
  },

  async deleteNotification(id) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this notification.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06923E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8000/api/notifications/${id}/delete/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.status === 204) {
          this.notifications = this.notifications.filter(n => n.id !== id);
          this.unreadCount--;

          Swal.fire({
            title: 'Deleted!',
            text: 'The notification has been deleted.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error('Failed to delete notification:', error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong while deleting.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
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
  background-color: #06923E;
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
  cursor: pointer;
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
  top: 55%;
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
  background-color: #06923E;
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


.delete-btn {
  background: none;
  border: none;
  color: #FE4F2D;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
  transition: color 0.2s ease;
}

.delete-btn:hover {
  color: #FE4F2D;
}
</style>
