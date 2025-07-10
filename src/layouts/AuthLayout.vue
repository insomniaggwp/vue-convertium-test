<template>
  <div class="auth-layout">
    <div class="auth-container">
      <h1 class="title">Welcome to <strong>myApp</strong></h1>
      <div class="underline"></div>
      <div class="form-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
}

.auth-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.underline {
  width: 60px;
  height: 3px;
  background-color: black;
  margin: 0 auto 2rem auto;
}

</style>
