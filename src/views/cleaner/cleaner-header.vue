<template>
  <header class="header">
    <nav>
      <router-link to="/cleaner-dashboard">Dashboard</router-link>
      <router-link to="/available-house">Jobs</router-link>
      <router-link to="/cleaner-request">Request</router-link>
    </nav>

    <div class="actions">
      <span class="notification-icon" @click="toggleNotificationPopup">
        <i class="fas fa-bell"></i>
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
      </span>
      <span class="profile-icon" @click="toggleProfileCard" title="View Profile">
        <i class="fas fa-user-circle"></i>
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
          <button class="delete-btn" @click="deleteNotification(n.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li>
      </ul>
    </div>

    <div v-if="showProfileCard" class="overlay" @click="closePopups"></div>
    <div v-if="showProfileCard" class="profile-card-popup">
    <div class="profile-header">
      <strong>Your Profile</strong>
      <button class="close-btn" @click="showProfileCard = false">&times;</button>
    </div>
    <div class="profile-content">
      <p><strong>Name:</strong> {{ profile.username }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <!-- Add more profile fields as needed -->
    </div>
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

    const showNotifications = ref(false)
    const notifications = ref([])

    const showProfileCard = ref(false)
    const profile = ref({
      name: '',
      email: '',
      role: ''
    })

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
    if (showNotifications.value) showProfileCard.value = false;
  }

  const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user-profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          profile.value = data
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    const deleteNotification = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this notification.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
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
            notifications.value = notifications.value.filter(n => n.id !== id);
            unreadCount.value--;

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
    };



    const toggleProfileCard = () => {
      showProfileCard.value = !showProfileCard.value
      if (showProfileCard.value) {
        fetchProfile()
        showNotifications.value = false
      }
    }

    const closePopups = () => {
      showNotifications.value = false
      showProfileCard.value = false
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
      toggleNotificationPopup,
      unreadCount,
      showProfileCard,
      profile,
      toggleProfileCard,
      closePopups,
      deleteNotification
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
  background-color: rgb(10, 173, 72);
  color: white;
  font-size: 11px;
  border-radius: 50%;
  padding: 2px 6px;
}

.profile-icon {
  color: white;
  font-size: 22px;
  cursor: pointer;
  margin-left: 15px;
  vertical-align: middle;
}

.profile-icon:hover {
  color: #ccc;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.notification-popup,
.profile-card-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-family: Arial, sans-serif;
}

.notification-header,
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #6A80B9;
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
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

.notification-list,
.profile-content {
  padding: 15px 20px;
}

.notification-list {
  list-style-type: none;
  margin: 0;
}

.notification-list li {
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.notification-list li:hover {
  background-color: #f5f5f5;
}

.notification-list li:last-child {
  border-bottom: none;
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

.profile-content p {
  font-size: 1rem;
  color: #333;
  margin: 8px 0;
}

.delete-btn {
  background: none;
  border: none;
  color: #fe4f2d;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
  transition: color 0.2s ease;
}

.delete-btn:hover {
  color: darkred;
}
.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notification-content {
  flex-grow: 1;
}

</style>