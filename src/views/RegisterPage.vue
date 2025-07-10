<template>
  <AuthLayout>
    <form ref="registerFormRef" class="register-form" @submit.prevent="handleRegister">
      <label for="userId">User ID*</label>
      <input id="userId" v-model="userId" type="text" required />

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

      <label for="confirpassword">Confirm Password*</label>
      <div class="password-wrapper">
        <input
          id="confirm-password"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          required
        />
        <span class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">👁️</span>
      </div>

      <button :disabled="!isFormValid" type="submit" class="register-button">REGISTER</button>

      <p class="login-text">
        Already have an account? <RouterLink to="/">Login here.</RouterLink>
      </p>
    </form>

    <ErrorTooltip :visible="error !== ''" :message="error" />
  </AuthLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ErrorTooltip from '@/components/ErrorTooltip.vue'

const registerFormRef = ref(null)
const userId = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isFormValid = ref(false)
const error = ref('')

const validateForm = () => {
  if (registerFormRef.value) {
    isFormValid.value = registerFormRef.value.checkValidity()
  }
}

// Re-validate on input changes
watch([userId, password, confirmPassword], validateForm)

// Auto-clear error after 3 seconds
watch(error, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      error.value = ''
    }, 3000)
  }
})

// Initial check (if needed)
onMounted(() => {
  validateForm()
})


async function handleRegister() {
  error.value = '';

  if (password.value !== confirmPassword.value) {
    error.value = 'Your passwords do not match.';
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/users?id=${userId.value}`);
    const existingUsers = await res.json();

    if (existingUsers.length > 0) {
      error.value = 'User ID already exists.';
      return;
    }

    const newUser = {
      id: userId.value,
      password: password.value,
    };

    const createRes = await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    if (!createRes.ok) {
      error.value = 'Failed to register user.';
      return;
    }

    alert('Registration successful!');
    // router.push('/');
  } catch (err) {
    console.error(err);
    error.value = 'Something went wrong. Please try again.';
  }
}

</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.register-form label {
  font-weight: bold;
}

.register-form input[type="text"],
.register-form input[type="password"] {
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.register-form input {
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

.register-button {
  background-color: black;
  color: white;
  padding: 0.6rem;
  border: none;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  transition: background 0.3s;
  margin-top: 20px;
}

.register-button:hover {
  background-color: #333;
}

.login-text {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
}

.login-text a {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
