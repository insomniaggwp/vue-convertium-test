<template>
  <transition enter-active-class="fade-in" leave-active-class="fade-out">
    <div v-if="visible" :class="['notif-tooltip', typeClass]">
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.notif-tooltip {
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 8px 12px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
  font-style: italic;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.notif-success {
  background-color: #2ecc71;
}
.notif-success::after {
  border-color: transparent transparent #2ecc71 transparent;
}

.notif-error {
  background-color: #e74c3c;
}
.notif-error::after {
  border-color: transparent transparent #e74c3c transparent;
}

.notif-tooltip::after {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
}

/* Animation */
.fade-in {
  animation: slide-up-fade 0.5s ease forwards;
}
.fade-out {
  animation: slide-down-fade 0.5s ease forwards;
}

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
import { computed } from 'vue';

const props = defineProps({
  message: String,
  visible: Boolean,
  type: {
    type: String,
    default: 'success'
  }
})

const typeClass = computed(() => {
  return {
    success: 'notif-success',
    error: 'notif-error'
  }[props.type] || 'notif-success'
})
</script>
