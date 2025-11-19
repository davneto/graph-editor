<template>
  <div id="board-layer">
    <Board />
  </div>
  <div id="tools-layer" class="pointer-events-none">
    <div id="tools-top">
      <h1>Graph Editor</h1>
      <span class="online-status-text" :class="{ offline: !toolsStore.isOnline }">{{
        toolsStore.isOnline ? 'Online' : 'Offline'
      }}</span>
      <div v-if="toolsStore.isSyncing">
        <span class="syncing-text">Syncing </span>
        <div class="syncing-spinner"></div>
      </div>
    </div>
    <div id="tools-middle-section">
      <div id="tools-middle-left-section"><ToolBar></ToolBar></div>
      <div id="tools-middle-center-section"></div>
      <div id="tools-middle-right-section">
        <PropertiesDisplayNode v-if="graphStore.getSelectedNode"></PropertiesDisplayNode>
        <PropertiesDisplayConnection
          v-if="graphStore.getSelectedConnection"
        ></PropertiesDisplayConnection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolBar from '@/components/ToolBar.vue'
import Board from '../components/Board.vue'
import PropertiesDisplayNode from '@/components/properties-display/PropertiesDisplayNode.vue'
import PropertiesDisplayConnection from '@/components/properties-display/PropertiesDisplayConnection.vue'

import { useGraphStore } from '@/stores/graph'
import { useToolsStore } from '@/stores/tools'

const graphStore = useGraphStore()
const toolsStore = useToolsStore()
</script>

<style scoped>
#board-layer {
  overflow: hidden;
  max-height: 100vh;
}

#tools-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

#tools-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#tools-middle-section {
  display: flex;
  min-height: 80vh;
}
#tools-middle-left-section {
  /* background-color: red; */
}
#tools-middle-center-section {
  flex-grow: 1;
  /* background-color: green; */
}
#tools-middle-right-section {
  /* background-color: blue; */
  gap: 1rem;
}

.online-status-text {
  color: green;
}
.online-status-text.offline {
  color: red;
}
.syncing-text {
  color: blue;
}
.syncing-spinner {
  color: blue;
  display: inline-block;
  animation: spin 1s linear infinite;
  border: 1px solid;
  min-height: 8px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
