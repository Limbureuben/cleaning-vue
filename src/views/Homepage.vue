<template>
  <HeaderPage />
  <div class="hero-section position-relative">
    <div class="container overflow-hidden py-5 position-relative">
      <section class="row align-items-center">
        <div :class="['col-lg-6 order-lg-1 order-2', { 'fade-slide-in': animate }]">
          <h1 class="display-8 fw-bold text-center text-lg-start">
            AIR BNB SYSTEM
          </h1>
          <p class="lead mt-4 text-center text-lg-start text-muted">
            A clean and simple interface to organize your favorite websites. Open a new browser tab and see your sites load instantly. Try it for free.
          </p>
          <div class="d-flex justify-content-center justify-content-lg-start mt-0">
            <button class="btn custom-btn btn-lg" @click="goToSignup">
              Get started
            </button>
          </div>
        </div>
      </section>
    </div>
    <div :class="['bg-image', { 'bg-fade-zoom-in': animate }]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderPage from '../sharing/Header.vue'
import { useRouter } from 'vue-router'

const animate = ref(false)
const router = useRouter()

onMounted(() => {
  animate.value = true
})
const goToSignup = () => {
  console.log('Navigating to signup page');
  router.push('/login');
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 89vh;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.bg-image {
  background-image: url('../assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
}

/* Text + Button animation */
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.fade-slide-in {
  animation: fadeSlideIn 1s ease forwards;
}

/* Background image animation */
@keyframes bgFadeZoomIn {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
}
.bg-fade-zoom-in {
  animation: bgFadeZoomIn 2s ease forwards;
}

.custom-btn {
  background-color: #6A80B9;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.custom-btn:hover {
  background-color: #6A80B9;
  transform: scale(1.05);
}

.display-8 {
  font-size: 2.5rem;
  color: #333;
}

.lead {
  font-size: 1.25rem;
  color: #666;
}
</style>