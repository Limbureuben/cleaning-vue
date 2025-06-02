<template>
  <AdminHeader />
  <div class="dashboard-wrapper">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-6 mb-4" v-for="(card, index) in cards" :key="index">
          <div class="card shadow border-0 h-100">
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">{{ card.title }}</h5>
              <p class="card-text text-muted">{{ card.description }}</p>
              <button class="btn">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'

const cards = [
  { title: "TOTAL USERS", description: "Manage all Accounts of Registred users in this platform ." },
  { title: "REGISTERED COMPANIES", description: "These are the Registered Companies that deal with cleaning services in different Regions at Tanzania" },
  { title: "BOOKING SERVICES", description: "Check and Manage booking available in different companies" },
  { title: "MESSAGES", description: "Check Message sends by the users" }
];
</script>

<style scoped>
.dashboard-wrapper {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
.card-title {
  font-size: 1.25rem;
  color: #FE4F2D;
}

.btn {
    background-color: #FE4F2D;
    border-radius: 2px;
}

.btn:hover {
    background-color: #FE4F2D;
}
</style>
