<template>
  <UserHeader />
  <div class="container mt-5">
    <div class="row">
      <div v-for="org in organizations" :key="org.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <img
            v-if="org.file && org.file.match(/\.(jpeg|jpg|png|gif)$/i)"
            :src="org.file"
            alt="Organization Logo"
            class="card-img-top rounded-top"
            style="max-height: 180px; object-fit: cover;"
          />

          <div class="card-body">
            <h5 class="fw-bold">{{ org.organization_name }}</h5>
            <p class="mb-1"><strong>Location:</strong> {{ org.location }}</p>
            <p class="mb-1"><strong>Price:</strong> {{ org.price }}</p>
            <p class="mb-1"><strong>Phone:</strong> {{ org.phone }}</p>
            <p class="mb-1"><strong>Address:</strong> {{ org.address }}</p>

            <!-- File link if not image -->
            <p v-if="org.file && !org.file.match(/\.(jpeg|jpg|png|gif)$/i)">
              <strong>File:</strong>
              <a :href="org.file" target="_blank" class="text-primary">Download</a>
            </p>

            <!-- Services -->
            <div class="mt-2">
              <strong>Services:</strong>
              <ul class="ps-3">
                <li v-for="service in org.services_list || []" :key="service">{{ service }}</li>
              </ul>
            </div>
          </div>

          <div class="card-footer bg-transparent border-0">
            <button class="btn btn-primary w-100" @click="requestService(org)">
              Request Cleaning Service
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import swal from 'sweetalert2'
import UserHeader from './UserHeader.vue'

const organizations = ref([])

const fetchApprovedOrganizations = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/fetch-approved/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    organizations.value = data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
  }
}

const userInfo = ref({
  username: '',
  email: '',
  phone: '',
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
    userInfo.value.phone = '';
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}

const requestService = async (org) => {
  const { value: formValues } = await swal.fire({
    title: `Request Cleaning Service from ${org.organization_name}`,
    html:
      `<input id="swal-username" class="swal2-input" placeholder="Your Username" value="${userInfo.value.username}" readonly>` +
      `<input id="swal-email" type="email" class="swal2-input" placeholder="Your Email" value="${userInfo.value.email}" readonly>` +
      `<input id="swal-phone" type="tel" class="swal2-input" placeholder="Your Phone Number">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit Request",
    preConfirm: () => {
      const phone = document.getElementById('swal-phone').value;
      if (!phone) {
        swal.showValidationMessage('Phone number is required');
        return false;
      }

      return {
        username: userInfo.value.username,
        email: userInfo.value.email,
        phone: phone
      };
    }
  });

  if (formValues) {
    try {
      const response = await fetch('http://localhost:8000/api/send-service-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          organization: org.id,
          username: formValues.username,
          email: formValues.email,
          phone: formValues.phone
        })
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
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
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
