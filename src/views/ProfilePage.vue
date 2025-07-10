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
        <h1>My <strong>Profile</strong></h1>
        <div class="line"></div>
      </div>

      <div class="profile-content-wrapper">
        <div class="avatar"></div>
        <div class="profile-content-card">
          <div
            class="field"
            v-for="(field, idx) in tabContents[activeTab]"
            :key="idx"
          >
            <label>{{ `${field.label}${field.isMandatory ? '*' : ''}` }}</label>
            <p>{{ field.value() || '-' }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Edit Button -->
     <div class="profile-right">
      <div class="edit-button">
        <button>Edit profile ✎</button>
      </div>
    </div>
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
  backdrop-filter: blur(10px); /* Optional: bikin efek "frosted glass" */
  -webkit-backdrop-filter: blur(10px);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('@/assets/avatar.png');
  background-size: cover;
  background-position: center;
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
}

.edit-button button {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .profile-content-wrapper {
    flex-direction: column;
  }

  .avatar {
    width: 200px;
    height: 200px;
    align-self: center;
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
import { ref, onMounted, computed } from 'vue'

const user = ref(null)
const activeTab = ref(0)

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

const allTabContents = computed(() => [
  // Basic Details
  [
    { label: 'Salutation', value: () => user.value?.salutation, isMandatory: true },
    { label: 'First name', value: () => user.value?.firstName, isMandatory: true },
    { label: 'Last name', value: () => user.value?.lastName, isMandatory: true },
    { label: 'Email address', value: () => user.value?.email, isMandatory: true }
  ],
  // Additional Details
  [
    { label: 'Home Address', value: () => user.value?.address, isMandatory: true },
    { label: 'Country', value: () => user.value?.country, isMandatory: true },
    { label: 'Postal Code', value: () => user.value?.postalCode, isMandatory: true },
    { label: 'Date of Birth', value: () => user.value?.dob },
    { label: 'Gender', value: () => user.value?.gender },
    { label: 'Martial Status', value: () => user.value?.martialStatus }
  ],
  // Spouse Details
  [
    { label: 'Spouse First Name', value: () => user.value?.spouseFirtsName },
    { label: 'Spouse Last Name', value: () => user.value?.spouseLastName },
    { label: 'Spouse Solution', value: () => user.value?.spouseSolution }
  ],
  // Personal Preferences
  [
    { label: 'Hobbies and Interests', value: () => user.value?.hobbies },
    { label: 'Favorite Sport(s)', value: () => user.value?.favoriteSport },
    { label: 'Preferred Music(s)', value: () => user.value?.preferedMusic },
    { label: 'Preferred Movie(S)', value: () => user.value?.preferedMovie }
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
</script>