<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { useAuth } from '@/composables/auth'

const router = useRouter()
const showMenu = ref(false)
const { isLoggedIn, updateLoginState } = useAuth()

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function handleLogout() {
  showMenu.value = false;
  Cookies.remove('user_id')
  updateLoginState()
  router.push('/')
}
</script>


<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header">
      <div class="logo-box">
        <h1 class="logo-text"><strong>LOGO</strong></h1>
      </div>
      <button v-if="isLoggedIn" class="hamburger" @click="toggleMenu">☰</button>
    </header>

    <transition name="slide-fade">
      <div v-if="showMenu" class="navigation-menu">
        <button class="close-button" @click="toggleMenu">X</button>
        <RouterLink to="/home" @click="toggleMenu">Home</RouterLink>
        <RouterLink to="/profile" @click="toggleMenu">My Profile</RouterLink>
        <RouterLink to="/profile" @click="toggleMenu">Edit Profile</RouterLink>
        <button class="logout-button" @click="handleLogout">Logout</button>
      </div>
    </transition>

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
  display: block;
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.navigation-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: #bee3f8;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.navigation-menu > *:hover {
  text-decoration: underline;
  transform: scale(1.05);
  transition: all 0.2s;
}

/* Animasi */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.close-button {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.close-button:hover {
  color: red;
  transform: scale(1.2);
  transition: all 0.2s;
}

.main-content {
  flex-grow: 1;
  background-image: url('../assets/background1.png');
  background-size: cover;
  background-position: center;
}

</style>