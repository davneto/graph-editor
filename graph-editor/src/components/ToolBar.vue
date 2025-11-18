<template>
  <div id="tool-bar" class="pointer-events">
    <button
      :class="{ selected: toolsStore.selectedTool === Tools.POINTER }"
      @click="toolsStore.selectTool(Tools.POINTER)"
    >
      Pointer
    </button>
    <button
      :class="{ selected: toolsStore.selectedTool === Tools.ADD_NODE }"
      @click="toolsStore.selectTool(Tools.ADD_NODE)"
    >
      Add Node
    </button>
    <button
      :class="{ selected: toolsStore.selectedTool === Tools.ADD_CONNECTION }"
      @click="toolsStore.selectTool(Tools.ADD_CONNECTION)"
    >
      Add connection
    </button>
  </div>
</template>

<style scoped>
#tool-bar {
  display: flex;

  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
}

.selected {
  border: 4px solid orange;
}
</style>

<script setup lang="ts">
import { useToolsStore } from '@/stores/tools'
import { Tools } from '@/models/tools'

const toolsStore = useToolsStore()
</script>
