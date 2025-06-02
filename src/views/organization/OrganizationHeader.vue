<template>
  <header class="organization-header">
    <h1>{{ organizationName }}</h1>
    <nav>
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#members">Members</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'OrganizationHeader',
  data() {
    return {
      organizationName: 'BNB Cleaning Services',
    }
  }
}
</script>

<style scoped>
.organization-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1C70E6FF;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.organization-header h1 {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-left: 1.5rem;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #ffcccb;
}
</style>