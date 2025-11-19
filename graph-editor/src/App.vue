<script setup lang="ts">
import Dashboard from './pages/Dashboard.vue'
import { useHistoryStore } from './stores/history'

const historyStore = useHistoryStore()
historyStore.restoreAppStateFromHistory()
</script>

<template>
  <Dashboard />
</template>

<style scoped></style>
