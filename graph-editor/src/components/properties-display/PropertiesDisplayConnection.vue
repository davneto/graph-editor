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
              v-model.number="graphStore.getSelectedConnection.weight"
            />
          </td>
        </tr>

        <!-- direct -->
        <tr>
          <th>Directionality:</th>
          <td>
            <select
              v-if="graphStore.getSelectedConnection"
              v-model.number="graphStore.getSelectedConnection.directionality"
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
              v-model="graphStore.getSelectedConnection.color"
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
  </PropertiesDisplay>
</template>

<style scoped></style>

<script setup lang="ts">
import { useGraphStore } from '@/stores/graph'
import { useBoardStore } from '@/stores/board'
import PropertiesDisplay from '../PropertiesDisplay.vue'
import { GraphConnectionDirectionality, type GraphNode } from '@/models/graph'

const graphStore = useGraphStore()
const boardStore = useBoardStore()

function selectNode(node: GraphNode) {
  graphStore.setSelectedNode(node)
  boardStore.draw()
}

function handleClose() {
  graphStore.setSelectedConnection(null)
  boardStore.draw()
}
</script>
