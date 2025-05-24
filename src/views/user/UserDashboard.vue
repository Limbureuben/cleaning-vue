<template>

  <div class="container mt-4">
    <div class="row">
      <div
        v-for="room in paginatedRooms"
        :key="room.id"
        class="col-md-4 mb-4"
      >
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">{{ room.name }}</h5>
            <p class="card-text">
              <strong>Location:</strong> {{ room.location }}
            </p>
            <p class="card-text">
              <strong>Price:</strong> Tsh {{ room.price }}
            </p>
            <p class="card-text">
              <strong>Available Date:</strong> {{ formatDate(room.available_date) }}
            </p>
            <div class="d-flex justify-content-between mt-3">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="viewImage(room.image)"
              >
                View Image
              </button>
              <button
                class="btn btn-primary btn-sm"
                :disabled="!room.is_available"
                @click="bookRoom(room.id)"
              >
                {{ room.is_available ? 'Book' : 'Unavailable' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)">Prev</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Page {{ currentPage }} of {{ totalPages }}</span>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

// Static rooms data (replace with your actual data)
const rooms = ref([
  {
    id: 1,
    name: 'Room A',
    location: 'Dar es Salaam',
    price: 100000,
    available_date: '2025-06-01',
    is_available: true,
    image: '/images/room-a.jpg',
  },
  {
    id: 2,
    name: 'Room B',
    location: 'Arusha',
    price: 120000,
    available_date: '2025-06-05',
    is_available: false,
    image: '/images/room-b.jpg',
  },
  {
    id: 3,
    name: 'Room C',
    location: 'Dodoma',
    price: 90000,
    available_date: '2025-06-10',
    is_available: true,
    image: '/images/room-c.jpg',
  },
  {
    id: 4,
    name: 'Room D',
    location: 'Mwanza',
    price: 110000,
    available_date: '2025-06-15',
    is_available: true,
    image: '/images/room-d.jpg',
  },
  {
    id: 5,
    name: 'Room E',
    location: 'Mbeya',
    price: 95000,
    available_date: '2025-06-20',
    is_available: false,
    image: '/images/room-e.jpg',
  },
  {
    id: 6,
    name: 'Room F',
    location: 'Morogoro',
    price: 105000,
    available_date: '2025-06-25',
    is_available: true,
    image: '/images/room-f.jpg',
  },
  {
    id: 7,
    name: 'Room G',
    location: 'Tanga',
    price: 98000,
    available_date: '2025-06-30',
    is_available: true,
    image: '/images/room-g.jpg',
  },
  {
    id: 8,
    name: 'Room H',
    location: 'Zanzibar',
    price: 115000,
    available_date: '2025-07-05',
    is_available: false,
    image: '/images/room-h.jpg',
  },
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const bookRoom = (roomId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to start the booking process.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Booked!', 'Your booking has been initiated.', 'success')
    }
  })
}

const viewImage = (imagePath) => {
  Swal.fire({
    title: 'Room Image',
    imageUrl: imagePath,
    imageWidth: 400,
    imageHeight: 250,
    imageAlt: 'Room image',
  })
}

// Pagination
const currentPage = ref(1)
const itemsPerPage = 6

const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return rooms.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(rooms.value.length / itemsPerPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>


<style scoped>
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
}

/* 🟢 Reduced default padding even more */
.card-body {
  padding: 0.5rem;
}

.card-title {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}
.card-text {
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.page-link:disabled {
  background-color: #ccc !important;
  cursor: not-allowed;
}
</style>