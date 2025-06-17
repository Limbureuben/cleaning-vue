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
            <p class="mb-1"><strong>Price:</strong> {{ org.price }} 2 days</p>
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
    ? `<ul style="padding-left: 20px; margin: 0; list-style-type: disc; color: #4a90e2;">${org.services_list.map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}</ul>`
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
        <p><strong style="color: #2c3e50;">Location:</strong> <span style="color: #555;">${org.location}</span></p>
        <p><strong style="color: #2c3e50;">Price:</strong> <span style="color: #555;">${org.price}</span></p>
        <p><strong style="color: #2c3e50;">Phone:</strong> <span style="color: #555;">${org.phone}</span></p>
        <p><strong style="color: #2c3e50;">Address:</strong> <span style="color: #555;">${org.address}</span></p>
      </div>
      <div style="flex: 1 1 48%; padding: 10px 15px;">
        <p><strong style="color: #2c3e50;">Bedrooms:</strong> <span style="color: #555;">${org.bedrooms}</span></p>
        <p><strong style="color: #2c3e50;">Guests:</strong> <span style="color: #555;">${org.guests}</span></p>
        <p><strong style="color: #2c3e50;">Bathrooms:</strong> <span style="color: #555;">${org.bathrooms}</span></p>
        <p><strong style="color: #2c3e50;">Services:</strong> ${services}</p>
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
    html: `
      <style>
        .swal-form-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: space-between;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .swal-form-container input {
          width: 48%;
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
        <input id="swal-username" placeholder="Your Username" value="${userInfo.value.username}" readonly>
        <input id="swal-email" type="email" placeholder="Your Email" value="${userInfo.value.email}" readonly>
        <input id="swal-phone" type="tel" placeholder="Your Phone Number">
        <input id="swal-start-date" type="date" placeholder="Start Date">
        <input id="swal-end-date" type="date" placeholder="End Date">
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit Request",
    preConfirm: () => {
      const phone = document.getElementById('swal-phone').value;
      const start_date = document.getElementById('swal-start-date').value;
      const end_date = document.getElementById('swal-end-date').value;

      if (!phone) {
        swal.showValidationMessage('Phone number is required');
        return false;
      }
      if (!start_date || !end_date) {
        swal.showValidationMessage('Please provide both start and end dates');
        return false;
      }

      return {
        username: userInfo.value.username,
        email: userInfo.value.email,
        phone,
        start_date,
        end_date
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
          ...formValues
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


</style>
