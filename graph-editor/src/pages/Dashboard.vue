<template>
  <div id="board-layer">
    <Board />
  </div>
  <div id="tools-layer" class="pointer-events-none">
    <div id="tools-top">
      <h1>Graph Editor</h1>
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

const graphStore = useGraphStore()
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
</style>
