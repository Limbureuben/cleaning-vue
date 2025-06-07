<!-- ApprovedOrganizations.vue -->
<template>
  <UserHeader />
  <div class="container mt-5">
    <div class="row">
      <div v-for="org in organizations" :key="org.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card shadow rounded p-2">
          <h5 class="fw-bold">{{ org.organization_name }}</h5>
          <p><strong>Location:</strong> {{ org.location }}</p>
          <p><strong>Email:</strong> {{ org.email }}</p>
          <p><strong>Services:</strong> {{ org.services }}</p>
          <button class="btn w-100" @click="requestService(org)">
            Request Cleaning Service
          </button>
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
      method: 'GET', // use GET, not POST
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
    userInfo.value.phone = ''; // Empty - user will enter it
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
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}

.btn {
  background-color: #6A80B9;
}

.btn:hover {
  background-color: #6A80B9;
}
</style>
