<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Dashboard from './pages/Dashboard.vue'
import { useHistoryStore } from './stores/history'
import { useToolsStore } from './stores/tools'

const historyStore = useHistoryStore()
historyStore.restoreAppStateFromHistory()

const toolsStore = useToolsStore()

let hasBeenOffline = false

onMounted(() => {
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})

function handleOnline() {
  console.log('App is online')
  // Handle online status (e.g., sync data)
  toolsStore.isOnline = true
  if (hasBeenOffline) historyStore.syncPendingChanges()
}
function handleOffline() {
  console.log('App is offline')
  // Handle offline status (e.g., notify user)
  toolsStore.isOnline = false
  hasBeenOffline = true
}
</script>

<template>
  <Dashboard />
</template>

<style scoped></style>
