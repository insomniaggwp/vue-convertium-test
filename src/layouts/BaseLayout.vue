<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function handleLogout() {
  console.log('Logout clicked')
  router.push('/')
}

function goToDashboard() {
  router.push('/')
}
</script>


<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header">
      <div class="logo-box" @click="goToDashboard">
        <h1 class="logo-text"><strong>LOGO</strong></h1>
      </div>
      <button class="hamburger" @click="toggleMenu">☰</button>
      <nav class="nav-menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">My Profile</RouterLink>
        <RouterLink to="/profile">Edit Profile</RouterLink>
        <button @click="handleLogout">Logout</button>
      </nav>
    </header>

    <!-- Mobile Menu -->
    <div v-if="showMenu" class="mobile-menu">
      <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
      <RouterLink to="/profile" @click="toggleMenu">My Profile</RouterLink>
      <RouterLink to="/profile" @click="toggleMenu">Edit Profile</RouterLink>
      <button @click="handleLogout">Logout</button>
    </div>

    <!-- Body -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

button {
  all: unset;
  cursor: pointer;
  font: inherit;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 10;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.logo-box {
  padding: 0.5rem;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  cursor: pointer;
}

.logo-text {
  font-weight: bold;
  font-size: 1.125rem;
  margin: 0;
}

.hamburger {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.mobile-menu {
  display: none;
  background-color: #bee3f8;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-menu > * {
  display: block;
  margin-bottom: 0.5rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .hamburger {
    display: block;
  }
  .mobile-menu {
    display: flex;
  }
}

.main-content {
  flex-grow: 1;
  background-image: url('../assets/background1.png');
  background-size: cover;
  background-position: center;
}

</style>