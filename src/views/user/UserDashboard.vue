<!-- ApprovedOrganizations.vue -->
<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4" style="color: #6A80B9;">Approved Cleaning Organizations</h3>
    <div class="row">
      <div v-for="org in organizations" :key="org.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card shadow rounded p-3">
          <h5 class="fw-bold">{{ org.organization_name }}</h5>
          <p><strong>Location:</strong> {{ org.location }}</p>
          <p><strong>Email:</strong> {{ org.email }}</p>
          <p><strong>Services:</strong> {{ org.services }}</p>
          <button class="btn btn-primary w-100" @click="requestService(org)">
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

  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};



const requestService = async (org) => {
  const { value: formValues } = await swal.fire({
    title: `Request Cleaning Service from ${org.organization_name}`,
    html:
      `<input id="swal-username" class="swal2-input" placeholder="Your Username">` +
      `<input id="swal-email" type="email" class="swal2-input" placeholder="Your Email">` +
      `<input id="swal-phone" type="tel" class="swal2-input" placeholder="Your Phone Number">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit Request",
    preConfirm: () => {
      const username = document.getElementById('swal-username').value;
      const email = document.getElementById('swal-email').value;
      const phone = document.getElementById('swal-phone').value;

      if (!username || !email || !phone) {
        swal.showValidationMessage('All fields are required');
        return false;
      }

      return { username, email, phone };
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
          organization_id: org.id,
          username: formValues.username,
          email: formValues.email,
          phone: formValues.phone,
          message: `User ${formValues.username} is requesting services from ${org.organization_name}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        swal.fire({
          icon: 'success',
          title: 'Request Submitted',
          text: 'The organization will contact you soon.',
        });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Failed to Submit',
          text: data.error || 'Please try again later.',
        });
      }
    } catch (err) {
      swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to send request. Check your connection.',
      });
    }
  }
};


onMounted(() => {
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
</style>
