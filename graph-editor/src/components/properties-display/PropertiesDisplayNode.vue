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
              v-model="graphStore.getSelectedNode.label"
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
              v-model="graphStore.getSelectedNode.color"
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

const graphStore = useGraphStore()
const boardStore = useBoardStore()

function selectConnection(connection: GraphConnection) {
  graphStore.setSelectedConnection(connection)
  boardStore.draw()
}

function handleClose() {
  graphStore.setSelectedNode(null)
  boardStore.draw()
}

function handleDeleteNode(node: GraphNode | null) {
  if (node) {
    node.delete(graphStore.graph)
    graphStore.setSelectedNode(null)
    boardStore.draw()
  }
}
</script>
