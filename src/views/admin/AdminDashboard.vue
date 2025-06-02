<template>
  <AdminHeader />
  <div class="dashboard-wrapper">
    <div class="container py-5">
      <transition-group name="fade-slide" tag="div" class="row">
        <div class="col-md-6 mb-4" v-for="(card, index) in cards" :key="index">
          <div class="card shadow border-0 h-100 hover-effect">
            <div class="card-body text-center d-flex flex-column justify-content-between">
              <div>
                <i :class="card.icon" class="card-icon mb-3"></i>
                <h5 class="card-title fw-bold">{{ card.title }}</h5>
                <p class="card-text text-muted">{{ card.description }}</p>
              </div>
              <button class="btn mt-3">View Details</button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>


<script setup>
import AdminHeader from './AdminHeader.vue'

const cards = [
  { title: "TOTAL USERS", description: "Manage all Accounts of Registered users in this platform.", icon: "fas fa-users" },
  { title: "REGISTERED COMPANIES", description: "These are the Registered Companies that deal with cleaning services in different Regions of Tanzania", icon: "fas fa-building" },
  { title: "BOOKING SERVICES", description: "Check and Manage bookings available in different companies", icon: "fas fa-calendar-check" },
  { title: "MESSAGES", description: "Check Messages sent by the users", icon: "fas fa-envelope" }
];
</script>

<style scoped>
.dashboard-wrapper {
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-image: url('../../assets/images/tools.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.dashboard-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4); /* white overlay, 0.4 opacity */
  z-index: 1;
}

.dashboard-wrapper > * {
  position: relative;
  z-index: 2; /* ensures content is above the overlay */
}


.card {
  top: 20px;
  border-radius: 2px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  color: #1C70E6FF;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 3rem;
  color: #1C70E6FF;
}

.btn {
  background-color: #1C70E6FF;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #1C70E6FF;
  transform: scale(1.05);
}

h2 {
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Animation for fade-slide-in */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

</style>
