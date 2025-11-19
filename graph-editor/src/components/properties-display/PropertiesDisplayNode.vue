<template>
  <PropertiesDisplay title="Node Details" @close="handleClose()">
    <table class="properties-table">
      <tbody>
        <!-- ID -->
        <tr>
          <th>ID:</th>
          <td>{{ graphStore.getSelectedNode?.id ?? '-' }}</td>
        </tr>

        <!-- coordinates -->
        <tr>
          <th>Coordinates:</th>
          <td>
            x: {{ graphStore.getSelectedNode!.x.toFixed(1) ?? '-' }}, y:
            {{ graphStore.getSelectedNode!.y.toFixed(1) ?? '-' }}
          </td>
        </tr>

        <!-- label -->
        <tr>
          <th>Label:</th>
          <td>
            <input
              type="text"
              v-if="graphStore.getSelectedNode"
              :value="graphStore.getSelectedNode.label"
              @input="handleLabelInput"
            />
          </td>
        </tr>

        <!-- color -->
        <tr>
          <th>Color:</th>
          <td>
            <input
              type="color"
              v-if="graphStore.getSelectedNode"
              :value="graphStore.getSelectedNode.color"
              @input="debouncedColorInput"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="list">
      <div
        v-for="connection in graphStore.getSelectedNode?.connections"
        :key="connection.id"
        @click="selectConnection(connection)"
      >
        <span class="clickable">connection{{ connection?.id ?? '-' }}</span>
      </div>
    </div>
    <hr />
    <div><button @click="handleDeleteNode(graphStore.getSelectedNode)">Delete Node</button></div>
  </PropertiesDisplay>
</template>

<style scoped>
.list {
  max-height: 4rem;
  overflow-y: auto;
}
</style>

<script setup lang="ts">
import { useGraphStore } from '@/stores/graph'
import { useBoardStore } from '@/stores/board'
import type { GraphConnection, GraphNode } from '@/models/graph'
import PropertiesDisplay from '../PropertiesDisplay.vue'
import { useHistoryStore } from '@/stores/history'
import { debounce } from '@/models/utils'

const graphStore = useGraphStore()
const boardStore = useBoardStore()
const historyStore = useHistoryStore()

function selectConnection(connection: GraphConnection) {
  graphStore.setSelectedConnection(connection)
  boardStore.draw()
}

function handleClose() {
  graphStore.setSelectedNode(null)
  boardStore.draw()
}

function handleLabelInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (graphStore.getSelectedNode) {
    graphStore.getSelectedNode.label = target.value
    boardStore.draw()

    historyStore.record_editNode(graphStore.getSelectedNode)
  }
}

const debouncedColorInput = debounce((event: Event) => {
  handleColorInput(event)
}, 300)

function handleColorInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (graphStore.getSelectedNode) {
    graphStore.getSelectedNode.color = target.value
    boardStore.draw()

    historyStore.record_editNode(graphStore.getSelectedNode)
  }
}

function handleDeleteNode(node: GraphNode | null) {
  if (node) {
    node.delete(graphStore.graph)
    graphStore.setSelectedNode(null)
    boardStore.draw()

    historyStore.record_deleteNode(node.id)
  }
}
</script>
