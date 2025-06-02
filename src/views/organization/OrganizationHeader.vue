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
      organizationName: 'My Organization'
    }
  }
}
</script>

<style scoped>
.organization-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
}

nav ul {
  display: flex;
  list-style-type: none;
}

nav ul li {
  margin-left: 1rem;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}
</style>