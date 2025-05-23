<template>
  <button @click="goBack" class="back-button">
    ← Back
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
</script>

<style scoped>
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease-in-out;
}

.back-button:hover {
  background-color: #f0f0f0;
}
</style>
