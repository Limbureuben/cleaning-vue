<template>
    <UserHeader />
  <div class="container mt-4">
    <div class="row">
      <div
        v-for="room in paginatedRooms"
        :key="room.id"
        class="col-md-4 mb-2"
      >
        <div class="card shadow">
          <div class="card-body text-start">
            <h5 class="card-title text-uppercase">{{ room.name }}</h5>
            <p class="card-text">
              <strong>Location:</strong> {{ room.location }}
            </p>
            <p class="card-text">
              <strong>Price:</strong> Tsh {{ room.price }}
            </p>
            <p class="card-text">
              <strong>Available Date:</strong> {{ formatDate(room.available_date) }}
            </p>
            <div class="d-flex justify-content-start mt-2">
              <button
                class="btn btn-outline-secondary btn-sm me-2"
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
import UserHeader from './UserHeader.vue'
import Background from '@/sharing/Background.vue'

// Static rooms data (replace with your actual data)
const rooms = ref([
  {
    id: 1,
    name: 'COMPANY 1',
    location: 'Dar es Salaam',
    price: 100000,
    available_date: '2025-06-01',
    is_available: true,
    image: '/images/room-a.jpg',
  },
  {
    id: 2,
    name: 'COMPANY 2',
    location: 'Arusha',
    price: 120000,
    available_date: '2025-06-05',
    is_available: false,
    image: '/images/room-b.jpg',
  },
  {
    id: 3,
    name: 'COMPANY 3',
    location: 'Dodoma',
    price: 90000,
    available_date: '2025-06-10',
    is_available: true,
    image: '/images/room-c.jpg',
  },
  {
    id: 4,
    name: 'COMPANY 4',
    location: 'Mwanza',
    price: 110000,
    available_date: '2025-06-15',
    is_available: true,
    image: '/images/room-d.jpg',
  },
  {
    id: 5,
    name: 'COMPANY 5',
    location: 'Mbeya',
    price: 95000,
    available_date: '2025-06-20',
    is_available: false,
    image: '/images/room-e.jpg',
  },
  {
    id: 6,
    name: 'COMPANY 6',
    location: 'Morogoro',
    price: 105000,
    available_date: '2025-06-25',
    is_available: true,
    image: '/images/room-f.jpg',
  }
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
.container {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 0.5rem;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  border-radius: 0.5rem;
  overflow: hidden;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1rem;
  text-align: start;
  background-color: #ffffff;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: #343a40;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #6c757d;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}
.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #ffffff;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}

.pagination {
  margin-top: 2rem;
}

.page-link {
  color: #007bff;
}
.page-link:hover {
  color: #0056b3;
}

.page-item.disabled .page-link {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.bg-image-container {
  background-image: url('../../assets/images/wonaclean.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>