<template>
  <UserHeader />
  <div class="container mt-5">
    <div class="row">
      <div v-for="org in organizations" :key="org.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <!-- Clickable image -->
          <img
            v-if="org.file && org.file.match(/\.(jpeg|jpg|png|gif)$/i)"
            :src="org.file"
            alt="Organization Logo"
            class="card-img-top rounded-top"
            style="max-height: 180px; object-fit: cover; cursor: pointer"
            @click="showOrganizationDetails(org)"
          />
          <div class="card-body">
            <p class="mb-1"><strong>Location:</strong> {{ org.location }}</p>
            <p class="mb-1"><strong>Price:</strong> {{ org.price }}</p>
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

const showOrganizationDetails = (org) => {
  const services = org.services_list?.length
    ? `<ul style="padding-left: 20px; margin: 0;">${org.services_list.map(s => `<li>${s}</li>`).join('')}</ul>`
    : '<em>No services listed</em>';

  const content = `
    <div style="
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 16px;
      font-family: 'Segoe UI', sans-serif;
      padding: 10px 5px;
      color: #333;
      line-height: 1.6;
    ">
      <div style="flex: 1 1 48%; padding: 10px;">
        <p><strong>Location:</strong> ${org.location}</p>
        <p><strong>Price:</strong> ${org.price}</p>
        <p><strong>Phone:</strong> ${org.phone}</p>
        <p><strong>Address:</strong> ${org.address}</p>
      </div>
      <div style="flex: 1 1 48%; padding: 10px;">
        <p><strong>Bedrooms:</strong> ${org.bedrooms}</p>
        <p><strong>Guests:</strong> ${org.guests}</p>
        <p><strong>Bathrooms:</strong> ${org.bathrooms}</p>
        <p><strong>Services:</strong> ${services}</p>
      </div>
    </div>
  `;

  swal.fire({
    title: `<h2 style="margin-bottom: 20px; font-size: 22px;">${org.organization_name}</h2>`,
    html: content,
    width: 650,
    background: '#fefefe',
    showCancelButton: true,
    confirmButtonText: 'Request Service',
    cancelButtonText: 'Close',
    customClass: {
      popup: 'custom-popup',
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      requestService(org);
    }
  });
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
  border-radius: 0px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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






.custom-popup {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.custom-confirm-button,
.custom-cancel-button {
  padding: 12px 26px;
  font-size: 16px;
  font-weight: 500;
  margin: 12px 8px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 160px;
  border: none;
}

.custom-confirm-button {
  background-color: #3085d6;
  color: white;
}

.custom-confirm-button:hover {
  background-color: #2874c6;
}

.custom-cancel-button {
  background-color: #e6e6e6;
  color: #333;
}

.custom-cancel-button:hover {
  background-color: #d6d6d6;
}





</style>
