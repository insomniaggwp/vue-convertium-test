<template>
  <div class="profile-container">
    <!-- Sidebar Tabs -->
    <aside class="profile-tabs">
      <ul>
        <li></li>
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab }}
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="profile-body">
      <div class="profile-title">
        <h1>Edit <strong>Profile</strong></h1>
        <div class="line"></div>
      </div>

      <div class="profile-content-wrapper">
        <div class="avatar-wrapper">
          <img :src="avatarPreview" alt="Avatar" class="avatar-img" />
          <label class="custom-file-upload">
            Upload image
            <input
              type="file"
              accept="image/png, image/jpeg"
              @change="handleAvatarUpload"
              hidden
            />
          </label>
        </div>
        <div class="profile-content-card">
          <form @submit.prevent="handleSubmit">
            
            <div
              class="field"
              v-for="(field, idx) in tabContents[activeTab]"
              :key="idx"
            >
              <label :for="field.key">{{ `${field.label}${field.isMandatory ? '*' : ''}` }}</label>
              <div class="input-wrapper">
                <input
                  v-if="field.inputType === 'text' || field.inputType === 'email'"
                  :id="field.key"
                  :type="field.inputType"
                  :required="field.isMandatory"
                  v-model="form[field.key]"
                  @blur="validateField(field)"
                  :class="{ 'input-error': errors[field.key] }"
                />

                <input
                  v-if="field.inputType === 'date'"
                  :id="field.key"
                  type="date"
                  v-model="form[field.key]"
                  required
                  :max="maxAllowedDate"
                />

                <div v-if="field.inputType === 'radio'" class="radio-group">
                  <div class="radio-options">
                    <label
                      class="radio-option"
                      v-for="(option, idxOpt) in field.options"
                      :key="idxOpt"
                    >
                      <input
                        type="radio"
                        :value="option"
                        :name="field.key"
                        v-model="form[field.key]"
                        :required="field.isMandatory"
                      />
                      {{ option }}
                    </label>
                  </div>
                </div>

                <select
                  v-if="field.inputType === 'select'"
                  v-model="form[field.key]"
                  :id="field.key"
                  :required="field.isMandatory"
                  @blur="validateField(field)"
                  :class="{ 'input-error': errors[field.key] }"
                >
                  <option disabled value="">-- Select --</option>
                  <option v-for="(option, idx) in field.options" :key="idx" :value="option">
                    {{ option }}
                  </option>
                </select>

                <span v-if="errors[field.key]" class="error-text">
                  {{ errors[field.key] }}
                </span>

              </div>
            </div>

            <div class="button-wrapper">
              <button :disabled="!isFormValid" type="submit" class="save-button">SAVE & UPDATE</button>
              <button type="button" @click="handleCancel" class="cancel-button">CANCEL</button>
            </div>

            <p>* Mandatory field</p>
          </form>
        </div>
      </div>
    </main>

    <!-- Edit Button -->
     <div class="profile-right">
      <div class="edit-button">
        <RouterLink to="/profile">←Go back to My Profile</RouterLink>
      </div>
    </div>

    <NotifTooltip :message="notifMsg" :visible="notifMsg !== ''" :type="notifType" />

  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 2rem;
  padding-top: 70px;
  box-sizing: border-box;
  gap: 2rem;
}

.profile-tabs {
  flex: 0.4;
  padding-right: 1rem;
  padding-top: 60px;
}

.profile-tabs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-tabs li {
  padding: 0.75rem 0;
  font-weight: 500;
  border-bottom: 1px dashed #999;
  cursor: pointer;
}

.profile-tabs .active {
  font-weight: bold;
  border-bottom: 3px solid black;
}

.profile-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-title h1 {
  font-size: 3rem;
  font-weight: normal;
  margin: 0;
  white-space: nowrap;
}

.profile-title strong {
  font-weight: bold;
}

.profile-title .line {
  flex-grow: 1;
  height: 4px;
  background-color: #333;
  margin-top: 30px;
}

.profile-body {
  flex: 1;
}

.profile-content-wrapper {
  padding: 0 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.underline {
  width: 100%;
  height: 3px;
  background-color: black;
}

.profile-content-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 20PX;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.avatar-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.field {
  font-size: 20px;
  margin-bottom: 20px;
}

.field label {
  font-weight: bold;
}

.field p {
  margin: 0.25rem 0 0 0;
}

.profile-right {
  flex: 0.4;
  padding-top: 15px;
}

.edit-button {
  display: flex;
  padding-top: 1rem;
  background: none;
  border: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.button-wrapper {
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
}

.button-wrapper button {
  flex: 1;
  height: 40px;
  padding: 5px;
}

.button-wrapper button:hover {
  cursor: pointer;
}

.save-button {
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

.cancel-button {
  border: 1px solid black;
  background-color: transparent;
}

.radio-group {
  margin-bottom: 20px;
}

.radio-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
}

.input-error {
  border: 1px solid red;
  background-color: #ffeaea;
}

.error-text {
  color: red;
  font-size: 13px;
  margin-top: 4px;
  display: block;
}

.custom-file-upload {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  width: fit-content;
  text-decoration: underline;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .profile-content-wrapper {
    flex-direction: column;
  }

  .profile-container {
    flex-direction: column;
  }

  .profile-tabs {
    width: 100%;
    border: none;
    padding: 0;
    margin-bottom: 1rem;
  }

  .edit-button {
    display: none;
  }

  .custom-file-upload {
    color: white;
  }

  /* Floating button for mobile */
  .profile-container::after {
    content: '✎';
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background: #000;
    color: #fff;
    font-size: 1.5rem;
    padding: 0.6rem 1rem;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    z-index: 999;
    cursor: pointer;
  }
}
</style>

<script setup>
import { ref, onMounted, computed, reactive, watch, toRaw } from 'vue'
import NotifTooltip from '@/components/NotifTooltip.vue'
import defaultAvatar from '@/assets/avatar.png'

const user = ref(null)
const avatarPreview = ref('')
const activeTab = ref(0)
const notifMsg = ref('')
const notifType = ref('')
const errors = reactive({})
const form = reactive({
  salutation: '',
  avatar: '',
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  country: '',
  postalCode: '',
  dob: '',
  gender: '',
  martialStatus: '',
  spouseFirtsName: '',
  spouseLastName: '',
  spouseSolution: '',
  hobbies: '',
  favoriteSport: '',
  preferedMusic: '',
  preferedMovie: ''
})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    avatarPreview.value = user.value.avatar || defaultAvatar
    Object.keys(user.value).forEach(key => {
      form[key] = user.value[key] || ''
    })
  }
})

function handleAvatarUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  const isValid = file.type === 'image/png' || file.type === 'image/jpeg'
  if (!isValid) {
    notifMsg.value = 'Please upload a PNG or JPG image.'
    notifType.value = 'error'
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    avatarPreview.value = reader.result
    user.value.avatar = reader.result
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  reader.readAsDataURL(file)
}

// Auto-clear error after 3 seconds
watch(notifMsg, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      notifMsg.value = ''
      notifType.value = ''
    }, 5000)
  }
})

const today = new Date()
const seventeenYearsAgo = new Date(
  today.getFullYear() - 17,
  today.getMonth(),
  today.getDate()
)

const maxAllowedDate = computed(() =>
  seventeenYearsAgo.toISOString().split('T')[0]
)

const allTabContents = computed(() => [
  // Basic Details
  [
    { label: 'Salutation', key: 'salutation', value: () => user.value?.salutation, isMandatory: true, inputType: 'select', options: ['mr', 'ms', 'mrs'] },
    { label: 'First name', key: 'firstName', value: () => user.value?.firstName, isMandatory: true, inputType: 'text' },
    { label: 'Last name', key: 'lastName', value: () => user.value?.lastName, isMandatory: true, inputType: 'text' },
    { label: 'Email address', key: 'email', value: () => user.value?.email, isMandatory: true, inputType: 'email' }
  ],
  // Additional Details
  [
    { label: 'Home Address', key: 'address', value: () => user.value?.address, isMandatory: true, inputType: 'text' },
    { label: 'Country', key: 'country', value: () => user.value?.country, isMandatory: true, inputType: 'text' },
    { label: 'Postal Code', key: 'postalCode', value: () => user.value?.postalCode, isMandatory: true, inputType: 'text' },
    { label: 'Date of Birth', key: 'dob', value: () => user.value?.dob, inputType: 'date' },
    { label: 'Gender', key: 'gender', value: () => user.value?.gender, inputType: 'radio', options: ['male', 'female'] },
    { label: 'Martial Status', key: 'martialStatus', value: () => user.value?.martialStatus, inputType: 'radio', options: ['single', 'married'] }
  ],
  // Spouse Details
  [
    { label: 'Spouse First Name', key: 'spouseFirtsName', value: () => user.value?.spouseFirtsName, inputType: 'text' },
    { label: 'Spouse Last Name', key: 'spouseLastName', value: () => user.value?.spouseLastName, inputType: 'text' },
    { label: 'Spouse Solution', key: 'spouseSolution', value: () => user.value?.spouseSolution, inputType: 'select', options: ['mr', 'ms', 'mrs'] }
  ],
  // Personal Preferences
  [
    { label: 'Hobbies and Interests', key: 'hobbies', value: () => user.value?.hobbies, inputType: 'text' },
    { label: 'Favorite Sport(s)', key: 'favoriteSport', value: () => user.value?.favoriteSport, inputType: 'text' },
    { label: 'Preferred Music(s)', key: 'preferedMusic', value: () => user.value?.preferedMusic, inputType: 'text' },
    { label: 'Preferred Movie(s)', key: 'preferedMovie', value: () => user.value?.preferedMovie, inputType: 'text' }
  ]
])

const allTabs = [
  'Basic Details',
  'Additional Details',
  'Spouse Details',
  'Personal Preferences'
]

const tabs = computed(() => {
  return allTabs.filter(tab => {
    if (tab === 'Spouse Details') {
      return user.value?.martialStatus === 'married'
    }
    return true
  })
})

const tabContents = computed(() => {
  if (user.value?.martialStatus === 'married') {
    return allTabContents.value
  } else {
    return [...allTabContents.value.slice(0, 2), ...allTabContents.value.slice(3)]
  }
})

const isFormValid = computed(() => {
  return tabContents.value[activeTab.value].every(field => {
    if (field.isMandatory) {
      return !!form[field.key]?.toString().trim()
    }
    return true
  })
})

async function handleSubmit() {
  const updatedUser = {
    ...toRaw(user.value),
    ...form,
    avatar: avatarPreview.value || user.value.avatar
  }

  try {
    const response = await fetch(`http://localhost:3000/users/${user.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })

    if (!response.ok) throw new Error('Gagal update user')

    const result = await response.json()

    localStorage.setItem('user', JSON.stringify(result))
    user.value = result

    notifMsg.value = 'Success update profile info'
    notifType.value = 'success'

  } catch (err) {
    console.log("err update", err);
    notifMsg.value = `'Error saat update user:', ${err}`
    notifType.value = 'error'
  }
}

function handleCancel() {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    Object.keys(user.value).forEach(key => {
      form[key] = user.value[key] || ''
    })
  }
  notifMsg.value = 'Success reset form'
  notifType.value = 'success'
}

function validateField(field) {
  if (field.isMandatory && !form[field.key]?.trim()) {
    errors[field.key] = `Please enter your ${field.label.toLowerCase()}`
  } else {
    delete errors[field.key]
  }
}


</script>