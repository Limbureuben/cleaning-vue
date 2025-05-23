<template>
  <footer class="footer py-4 mt-5 text-center text-white">
    <div class="container">
      <small>&copy; {{ currentYear }} Powered by Aridhi University</small>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: #222; /* dark background */
  color: #ddd;
  font-size: 0.9rem;
}
</style>
