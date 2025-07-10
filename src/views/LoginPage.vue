<template>
  <AuthLayout>
    <form ref="loginFormRef" class="login-form" @submit.prevent="handleLogin">
      <label for="userId">User ID*</label>
      <input class="login-input-userid" id="userId" v-model="userId" type="text" required />

      <label for="password">Password*</label>
      <div class="password-wrapper">
        <input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          required
        />
        <span class="toggle-password" @click="showPassword = !showPassword">👁️</span>
      </div>

      <div class="checkbox-container">
        <input type="checkbox" id="keepLoggedIn" v-model="keepLoggedIn" />
        <label for="keepLoggedIn">Keep me logged in</label>
      </div>

      <button :disabled="!isFormValid" type="submit" class="login-button">LOGIN</button>

      <p class="register-text">
        No account? <RouterLink to="/register">Register here.</RouterLink>
      </p>
    </form>

    <NotifTooltip :message="notifMsg" :visible="notifMsg !== ''" :type="notifType" />
  </AuthLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { RouterLink } from 'vue-router'
import NotifTooltip from '@/components/NotifTooltip.vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth'
const baseURL = import.meta.env.VITE_API_BASE_URL;

const { updateLoginState } = useAuth()
const router = useRouter()

const loginFormRef = ref(null)
const userId = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)
const isFormValid = ref(false)
const notifMsg = ref('')
const notifType = ref('')

const validateForm = () => {
  if (loginFormRef.value) {
    isFormValid.value = loginFormRef.value.checkValidity()
  }
}

// Re-validate on input changes
watch([userId, password], validateForm)

// Auto-clear error after 3 seconds
watch(notifMsg, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      notifMsg.value = ''
      notifType.value = ''
    }, 5000)
  }
})

// Initial check (if needed)
onMounted(() => {
  validateForm()
})

async function handleLogin() {
  notifMsg.value = '';
  notifType.value = '';

  const res = await fetch(`${baseURL}/users?id=${userId.value}`);
  const users = await res.json();

  if (users.length === 0) {
    notifMsg.value = 'Your user ID and/or password does not match.';
    notifType.value = "error"
    return;
  }

  const user = users[0];
  if (user.password !== password.value) {
    notifMsg.value = 'Your user ID and/or password does not match.';
    notifType.value = "error"
    return;
  }

  // ✅ Login success
  localStorage.setItem('user', JSON.stringify(user));
  Cookies.set('user_id', user.id, keepLoggedIn.value? { expires: 365 } : undefined);
  updateLoginState();
  notifMsg.value = "Login Success"
  notifType.value = "success"

  router.push('/profile');
}

</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.login-form label {
  font-weight: bold;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.login-form input {
  border: 1px solid black;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 100%;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.login-button {
  background-color: black;
  color: white;
  padding: 0.6rem;
  border: none;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  transition: background 0.3s;
}

.login-button:hover {
  background-color: #333;
}

.register-text {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
}

.register-text a {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
