<template>
  <PropertiesDisplay title="Connection Details" @close="handleClose()">
    <table class="properties-table">
      <tbody>
        <!-- ID -->
        <tr>
          <th>ID:</th>
          <td>{{ graphStore.getSelectedConnection!.getId() ?? '-' }}</td>
        </tr>

        <!-- label -->
        <tr>
          <th>Weight:</th>
          <td>
            <input
              type="number"
              v-if="graphStore.getSelectedConnection"
              :value="graphStore.getSelectedConnection.weight"
              @input="handleWeightInput"
            />
          </td>
        </tr>

        <!-- direct -->
        <tr>
          <th>Directionality:</th>
          <td>
            <select
              v-if="graphStore.getSelectedConnection"
              :value="graphStore.getSelectedConnection.directionality"
              @input="handleDirectionalityInput"
            >
              <option
                :key="GraphConnectionDirectionality.UNDIRECTED"
                :value="GraphConnectionDirectionality.UNDIRECTED"
              >
                {{ GraphConnectionDirectionality.UNDIRECTED }}
              </option>
              <option
                :key="GraphConnectionDirectionality.DIRECT"
                :value="GraphConnectionDirectionality.DIRECT"
              >
                {{ GraphConnectionDirectionality.DIRECT }}
              </option>
              <option
                :key="GraphConnectionDirectionality.DIRECT_REVERSE"
                :value="GraphConnectionDirectionality.DIRECT_REVERSE"
              >
                {{ GraphConnectionDirectionality.DIRECT_REVERSE }}
              </option>
            </select>
          </td>
        </tr>

        <!-- color -->
        <tr>
          <th>Color:</th>
          <td>
            <input
              type="color"
              v-if="graphStore.getSelectedConnection"
              :value="graphStore.getSelectedConnection.color"
              @input="debouncedColorInput"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table class="connections-table list-table">
      <tbody>
        <!-- nodes -->
        <tr>
          <th>Nodes:</th>
          <td></td>
        </tr>

        <tr @click="selectNode(graphStore.getSelectedConnection!.node1)">
          <td class="clickable">
            node{{ graphStore.getSelectedConnection!.node1.getId() ?? '-' }}
          </td>
          <td></td>
        </tr>

        <tr @click="selectNode(graphStore.getSelectedConnection!.node2)">
          <td class="clickable">
            node{{ graphStore.getSelectedConnection!.node2.getId() ?? '-' }}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div>
      <button @click="handleDeleteConnection(graphStore.getSelectedConnection)">
        Delete Connection
      </button>
    </div>
  </PropertiesDisplay>
</template>

<style scoped></style>

<script setup lang="ts">
import { useGraphStore } from '@/stores/graph'
import { useBoardStore } from '@/stores/board'
import PropertiesDisplay from '../PropertiesDisplay.vue'
import { GraphConnection, GraphConnectionDirectionality, type GraphNode } from '@/models/graph'
import { useHistoryStore } from '@/stores/history'
import { debounce } from '@/models/utils'

const graphStore = useGraphStore()
const boardStore = useBoardStore()
const historyStore = useHistoryStore()

function selectNode(node: GraphNode) {
  graphStore.setSelectedNode(node)
  boardStore.draw()
}

function handleClose() {
  graphStore.setSelectedConnection(null)
  boardStore.draw()
}

function handleWeightInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (graphStore.getSelectedConnection) {
    graphStore.getSelectedConnection.weight = parseFloat(target.value)
    boardStore.draw()
  }
}

const debouncedColorInput = debounce((event: Event) => {
  handleColorInput(event)
}, 300)

function handleDirectionalityInput(event: Event) {
  const target = event.target as HTMLSelectElement
  if (graphStore.getSelectedConnection) {
    graphStore.getSelectedConnection.directionality = target.value as GraphConnectionDirectionality
    boardStore.draw()

    historyStore.record_editConnection(graphStore.getSelectedConnection)
  }
}

function handleColorInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (graphStore.getSelectedConnection) {
    graphStore.getSelectedConnection.color = target.value
    boardStore.draw()

    historyStore.record_editConnection(graphStore.getSelectedConnection)
  }
}

function handleDeleteConnection(connection: GraphConnection | null) {
  if (connection) {
    connection.delete(graphStore.graph)
    graphStore.setSelectedConnection(null)
    boardStore.draw()

    historyStore.record_deleteConnection(connection)
  }
}
</script>
