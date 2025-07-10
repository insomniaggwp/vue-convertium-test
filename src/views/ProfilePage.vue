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
            <p>{{ field.value || '-' }}</p>
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
import { ref } from 'vue'

const tabs = [
  'Basic Details',
  'Additional Details',
  'Spouse Details',
  'Personal Preferences'
]

const activeTab = ref(0)

const tabContents = [
  // Basic Details
  [
    { label: 'Salutation', value: 'Mr.', isMandatory: true },
    { label: 'First name', value: 'John', isMandatory: true },
    { label: 'Last name', value: 'Doe Jr.', isMandatory: true },
    { label: 'Email address', value: 'johndoe@anyemail.com', isMandatory: true }
  ],
  // Additional Details
  [
    { label: 'Home Address', value: 'Jl Adhiyaksa', isMandatory: true },
    { label: 'Country', value: 'Indonesia', isMandatory: true },
    { label: 'Postal Code', value: '45192', isMandatory: true },
    { label: 'Date of Birth', value: '16/05/1994', },
    { label: 'Gender', value: 'male' },
    { label: 'Martial Status', value: 'single' }
  ],
  // Spouse Details
  [
    { label: 'Spouse First Name', value: '' },
    { label: 'Spouse Last Name', value: '' },
    { label: 'Spouse Solution', value: '' }
  ],
  // Personal Preferences
  [
    { label: 'Hobbies and Interests', value: '' },
    { label: 'Favorite Sport(s)', value: '' },
    { label: 'Preferred Music(s)', value: '' },
    { label: 'Preferred Movie(S)', value: '' }
  ]
]

</script>