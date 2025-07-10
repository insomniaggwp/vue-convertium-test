<template>
  <div class="profile-container">
    <!-- Sidebar Tabs -->
    <aside class="profile-tabs">
      <ul>
        <li></li>
        <li class="active">Basic Details</li>
        <li>Additional Details</li>
        <li>Spouse Details</li>
        <li>Personal Preferences</li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="profile-body">
      <div class="profile-title">
        <h1>My <strong>Profile</strong></h1>
        <div class="line"></div>
      </div>
      <!-- <h1 class="profile-title">My <strong>Profile</strong></h1><div class="underline"></div> -->

      <div class="profile-content-wrapper">
        <div class="avatar"></div>
        <div class="profile-content">
          <div class="profile-content-body">
            <div class="field">
              <label>Salutation*</label>
              <p>Mr.</p>
            </div>
            <div class="field">
              <label>First name*</label>
              <p>John</p>
            </div>
            <div class="field">
              <label>Last name*</label>
              <p>Doe Jr.</p>
            </div>
            <div class="field">
              <label>Email address*</label>
              <p>johndoe@anyemail.com</p>
            </div>
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

.profile-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.avatar {
  width: 100px;
  height: 100px;
  background: #444;
  border-radius: 50%;
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
  .profile-container {
    flex-direction: column;
  }

  .profile-tabs {
    width: 100%;
    border: none;
    padding: 0;
    margin-bottom: 1rem;
  }

  .profile-content {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
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
