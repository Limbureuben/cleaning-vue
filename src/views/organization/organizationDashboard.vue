<template>
  <OrganizationHeader />
  <div class="dashboard-wrapper">
    <div class="container py-5">
      <transition-group name="card-fade-slide" tag="div" class="row">
        <div
          class="col-md-6 mb-4"
          v-for="(card, index) in cards"
          :key="card.title"
        >
          <div class="card shadow border-0 hover-effect">
            <div class="card-body text-center d-flex flex-column justify-content-between">
              <div>
                <i :class="card.icon" class="card-icon mb-3"></i>
                <h5 class="card-title fw-bold">{{ card.title }}</h5>
                <p class="card-text text-muted">{{ card.description }}</p>
              </div>
              <button class="btn mt-3 animated-btn">View Details</button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import OrganizationHeader from './OrganizationHeader.vue';

const cards = [
  { title: "TOTAL CLEANER", description: "Manage all Accounts of Registered users in this platform.", icon: "fas fa-users" },
  { title: "AVAILABLE BOOKING", description: "These are the Registered Companies that ", icon: "fas fa-building" },
  { title: "BOOKING SERVICES", description: "Check and Manage bookings available in different companies", icon: "fas fa-calendar-check" },
  { title: "MESSAGES", description: "Check Messages sent by the users", icon: "fas fa-envelope" }
];
</script>

<style scoped>
.dashboard-wrapper {
  /* background-image: url('../assets/images/wonaclean.jpg'); */
  background-image: url('../../assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
}


.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  color: #6A80B9;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 3rem;
  color: #6A80B9;
}

.btn {
  background-color: #6A80B9;
  border-radius: 2px;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  background-color: #5A70A9;
  transform: translateY(-2px);
}

.card-fade-slide-enter-active,
.card-fade-slide-leave-active {
  transition: all 0.5s ease;
}

.card-fade-slide-enter-from,
.card-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.animated-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.animated-btn:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}

.card {
  border-radius: 4px;
  transition: all 0.3s ease;
  overflow: hidden;
  animation: cardAppear 0.5s ease-out;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hover-effect:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}



</style>