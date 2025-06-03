<script setup>
import { ref } from 'vue'

const mobileNav = ref(false)
const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}
</script>

<template>
  <!-- Navbar Start -->
  <div class="container">
    <header class="d-flex justify-content-end align-items-center py-3">
      <!-- Empty div to replace logo space -->
      <div class="me-auto"></div>

      <!-- Mobile Menu Toggle Button -->
      <button
        @click="toggleMobileNav"
        class="btn d-md-none"
        type="button"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Desktop Menu -->
      <nav class="d-none d-md-flex align-items-center">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link text-uppercase fw-semibold" href="#features">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-uppercase fw-semibold" href="#faq">About</a>
          </li>
          <li class="nav-item">
            <a
            class="btn btn-primary text-uppercase fw-semibold custom-signup-btn"
            href="#download-section"
            role="button"
            >
            Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Mobile Menu -->
    <div
      v-if="mobileNav"
      class="position-fixed top-0 start-0 vw-100 vh-100 bg-primary text-white p-4"
      style="z-index: 1050;"
    >
      <div class="d-flex justify-content-end mb-4">
        <button @click="toggleMobileNav" class="btn btn-close btn-close-white" aria-label="Close menu"></button>
      </div>

      <ul class="nav flex-column gap-3 text-uppercase fw-semibold">
        <li class="nav-item border-top border-bottom py-3 text-center">
          <a @click="toggleMobileNav" class="nav-link text-white" href="#features"
            >Features</a
          >
        </li>
        <li class="nav-item border-bottom py-3 text-center">
          <a @click="toggleMobileNav" class="nav-link text-white" href="#faq">FAQ</a>
        </li>
        <li class="nav-item border-bottom py-3 text-center">
          <a @click="toggleMobileNav" class="nav-link text-white" href="#subscribe"
            >Subscribe</a
          >
        </li>
        <li class="nav-item text-center mt-4">
          <a
            @click="toggleMobileNav"
            class="btn btn-outline-light text-uppercase px-4"
            href="#download-section"
            role="button"
            >Sign In</a
          >
        </li>
      </ul>

      <div
        class="d-flex justify-content-center align-items-end position-absolute bottom-0 w-100 p-3"
      >
        <a href="#" class="text-white mx-3 fs-4">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="#" class="text-white mx-3 fs-4">
          <i class="bi bi-twitter"></i>
        </a>
      </div>
    </div>
  </div>
  <!-- Navbar End -->
</template>

<style scoped>
/* Override Bootstrap navbar-toggler-icon with hamburger icon */
.btn .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.9%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}


.custom-signup-btn {
  background-color: #6A80B9 !important; /* override Bootstrap's btn-primary */
  border-radius: 4px !important;
  border: none !important;
  color: white !important;
}

/* Optional: on hover slightly darker */
.custom-signup-btn:hover {
  background-color: #6A80B9 !important;
  color: white !important;
}

</style>
