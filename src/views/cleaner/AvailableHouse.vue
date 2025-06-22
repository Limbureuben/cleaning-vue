<template>
  <cleanerHeader />
  <div class="container mt-5">
    <div class="row">
      <div v-for="sr in paginatedOrganizations" :key="sr.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <!-- Clickable image -->
          <img
            v-if="sr.organization_image && sr.organization_image.match(/\.(jpeg|jpg|png|gif)$/i)"
            :src="sr.organization_image"
            alt="Organization Logo"
            class="card-img-top rounded-top"
            style="max-height: 130px; object-fit: cover; cursor: pointer"
            @click="showOrganizationDetails(sr)"
          />
          <div class="card-body">
            <p class="mb-1"><strong>Location:</strong> {{ sr.organization_location }}</p>
            <p class="mb-1"><strong>start Date:</strong> {{ sr.start_date }}</p>

          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center mt-2gap-2">
        <button
          class="btn btn-outline-primary"
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span class="align-self-center">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="btn btn-outline-primary"
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import swal from 'sweetalert2'

import cleanerHeader from './cleaner-header.vue'

const serviceRequests = ref([])
const currentPage = ref(1)
const perPage = 6

const fetchApprovedOrganizations = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/fetch-to-cleaner/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    serviceRequests.value = data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
  }
}


const paginatedOrganizations = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return serviceRequests.value.slice(start, start + perPage)
})

const totalPages = computed(() => {
  return Math.ceil(serviceRequests.value.length / perPage)
})


const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}


const showOrganizationDetails = (sr) => {
  const services = sr.services_list?.length
    ? `<ul style="padding-left: 20px; margin: 0; list-style-type: disc; color: #4a90e2;">${sr.services_list.map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}</ul>`
    : '<em style="color: #999;">No services listed</em>';

  const content = `
    <div style="
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 16px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 15px 20px;
      color: #444;
      line-height: 1.6;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    ">
      <div style="flex: 1 1 48%; padding: 10px 15px; border-right: 1px solid #ddd;">
        <p><strong style="color: #2c3e50;">Start Date:</strong> <span style="color: #555;">${sr.start_date}</span></p>
        <p><strong style="color: #2c3e50;">End Date:</strong> <span style="color: #555;">${sr.end_date}</span></p>
        <p><strong style="color: #2c3e50;">Location:</strong> <span style="color: #555;">${sr.organization_location}</span></p>
      </div>
    </div>
  `;

  swal.fire({
    html: content,
    width: 650,
    background: '#ffffff',
    showCancelButton: true,
    confirmButtonText: 'Request Service',
    cancelButtonText: 'Close',
    customClass: {
      popup: 'custom-popup',
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button'
    },
  }).then((result) => {
    if (result.isConfirmed) {
      requestService(sr);
    }
  });
}

const userInfo = ref({
  username: '',
  email: '',
  cleaner_location: '',
});

const fetchUserInfo = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/user-profile/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch user info');
    const data = await response.json();
    userInfo.value.username = data.username;
    userInfo.value.email = data.email;
    userInfo.value.cleaner_location = '';
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}

const requestService = async (sr) => {
  const { value: formValues } = await swal.fire({
    html: `
      <style>
        .swal-form-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: space-between;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .swal-form-group {
          width: 48%;
          display: flex;
          flex-direction: column;
        }
        .swal-form-group label {
          margin-bottom: 4px;
          font-size: 13px;
          color: #333;
        }
        .swal-form-container input {
          padding: 10px 12px;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }
        .swal-form-container input:focus {
          border-color: #4a90e2;
          outline: none;
          box-shadow: 0 0 8px rgba(74, 144, 226, 0.6);
        }
        .swal-form-container input[readonly] {
          background-color: #f5f5f5;
          color: #666;
          cursor: not-allowed;
        }
      </style>
      <div class="swal-form-container">
        <div class="swal-form-group">
          <label for="swal-username">Username</label>
          <input id="swal-username" value="${userInfo.value.username}" readonly>
        </div>
        <div class="swal-form-group">
          <label for="swal-email">Email</label>
          <input id="swal-email" type="email" value="${userInfo.value.email}" readonly>
        </div>
        <div class="swal-form-group">
          <label for="swal-phone">Clener Location</label>
          <input id="swal-cleaner_location" type="tel" placeholder="Your location">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit Request",
    preConfirm: () => {
      const cleaner_location = document.getElementById('swal-cleaner_location').value;
      if (!cleaner_location) {
        swal.showValidationMessage('Location name is required');
        return false;
      }

      return {
        username: userInfo.value.username,
        email: userInfo.value.email,
        cleaner_location
      };
    }
  });

  if (formValues) {
    try {
      const response = await fetch('http://localhost:8000/api/client-send-service-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          service_request: sr.id,
          ...formValues
        })
      });

      console.log('Request payload:', {
        service_request: sr.id,
        username: userInfo.value.username,
        email: userInfo.value.email,
        cleaner_location: formValues.cleaner_location
      });


      if (response.ok) {
        swal.fire({
          icon: 'success',
          title: 'Request Sent!',
          text: `${formValues.username}, your request has been submitted.`
        });
      } else {
        const data = await response.json();
        swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: data.detail || 'Something went wrong.'
        });
      }
    } catch (err) {
      swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Could not send request.'
      });
    }
  }
};

onMounted(() => {
  fetchUserInfo();
  fetchApprovedOrganizations();
});

const getFullImageUrl = (path) => {
  return path.startsWith('http') ? path : `http://localhost:8000${path}`;
};

</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 0px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.btn {
  background-color: #6A80B9;
  border: none;
}

.btn:hover {
  background-color: #5c72aa;
}


</style>
