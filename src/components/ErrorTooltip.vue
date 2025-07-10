<template>
  <transition
    enter-active-class="fade-in"
    leave-active-class="fade-out"
  >
    <div v-if="visible" class="error-tooltip">{{ message }}</div>
  </transition>
</template>

<style scoped>

/* Tooltip Style */
.error-tooltip {
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
  font-style: italic;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* Optional: triangle arrow */
.error-tooltip::after {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #f44336 transparent;
}

.fade-in {
  animation: slide-up-fade 0.5s ease forwards;
}

.fade-out {
  animation: slide-down-fade 0.5s ease forwards;
}

/* Animation */
@keyframes slide-up-fade {
  0% {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes slide-down-fade {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
}

</style>

<script setup>
  defineProps({ message: String, visible: Boolean })
</script>