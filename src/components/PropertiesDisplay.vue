<template>
  <div class="properties-display pointer-events">
    <div class="header">
      <div class="title">{{ title }}</div>
      <button class="close-button" @click="$emit('close')">X</button>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.properties-display {
  background-color: #ffffff96;
  padding: 1rem;
  margin: 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
}
.close-button {
  cursor: pointer;
}
</style>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Details',
  },
})
defineEmits(['close'])
</script>
