<template>
  <UserHeader />
  <div class="container mt-4 dashboard-background">
    <div class="row">
      <div v-for="(service, index) in cleaningServices" :key="index" class="col-md-3">
        <div class="card mb-4 shadow-sm">
          <img :src="service.image" class="card-img-top" alt="Cleaning Service Image" />
          <div class="card-body">
            <h5 class="card-title">{{ service.name }}</h5>
            <p class="card-text">{{ service.description }}</p>
            <p class="card-text"><strong>Price:</strong> {{ service.price }}</p>
            <button class="btn btn-primary w-100" @click="bookService(service)">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import UserHeader from './UserHeader.vue'
export default {
    components: {
        UserHeader,
    },
  data() {
    return {
      cleaningServices: [
        {
          name: "Home Cleaning",
          description: "Professional home cleaning service.",
          price: "$50/hour",
          image: "https://via.placeholder.com/300x200?text=Home+Cleaning",
        },
        {
          name: "Office Cleaning",
          description: "Keep your office spotless and fresh!",
          price: "$70/hour",
          image: "https://via.placeholder.com/300x200?text=Office+Cleaning",
        },
        {
          name: "Carpet Cleaning",
          description: "Deep clean your carpets.",
          price: "$30/hour",
          image: "https://via.placeholder.com/300x200?text=Carpet+Cleaning",
        },
        {
          name: "Window Cleaning",
          description: "Get your windows sparkling clean!",
          price: "$40/hour",
          image: "https://via.placeholder.com/300x200?text=Window+Cleaning",
        },
      ],
    };
  },
  methods: {
    bookService(service) {
      alert(`Booking: ${service.name}`);
    },
  },
};
</script>
<style scoped>
.card-img-top {
  height: 120px;
  object-fit: cover;
}

.dashboard-background {
  position: relative;
  padding: 2rem;
  overflow: hidden; /* Ensure pseudo-element stays inside */
}

/* Use ::before for the background image */
.dashboard-background::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url('../../assets/images/woman.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.3;
  z-index: 1;
}


.dashboard-background::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.dashboard-background > .row {
  position: relative;
  z-index: 3;
}


</style>
