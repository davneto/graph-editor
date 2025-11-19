<template>
  <canvas id="board-canvas" ref="canvas"></canvas>
</template>

<style scoped>
#board-canvas {
  background: rgb(210, 210, 210);
  width: 100vw;
  height: 100vh;
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { offsetX, offsetY, scale } from '../composables/board-navigation/board-state'
import {
  removeBoardTranslationPan,
  useBoardTranslationPan,
  initBoardCentered,
  useResizeBoardMaintainCenter,
  removeResizeBoardMaintainCenter,
} from '../composables/board-navigation/board-translation-pan'
import { drawBoardGrid } from '../composables/board-navigation/board-grid'
import {
  removeBoardScaleZoom,
  useBoardScaleZoom,
} from '../composables/board-navigation/board-scale-zoom'
import { useToolsStore } from '@/stores/tools'
import { useBoardStore } from '@/stores/board'
import { Tools } from '@/models/tools'
import { useGraphToolAddNode } from '@/composables/graph-tools/graph-add-node'
import { useGraphStore } from '@/stores/graph'
import { GraphConnection, GraphNode } from '@/models/graph'
import { useGraphToolSelectNode } from '@/composables/graph-tools/graph-select-node'
import { useGraphToolAddConnection } from '@/composables/graph-tools/graph-add-connection'
import { useGraphToolSelectConnection } from '@/composables/graph-tools/graph-select-connection'

// Initialize the stores
const toolsStore = useToolsStore()
const boardStore = useBoardStore()
const graphStore = useGraphStore()

// Canvas reference
const canvas = ref<HTMLCanvasElement | null>(null)
let canvasContext: CanvasRenderingContext2D | null = null

// Mounted hook
onMounted(() => {
  boardStore.setBoardDraw(draw)

  // Get canvas context
  canvasContext = canvas.value?.getContext('2d') || null

  // Initial draw
  draw()

  // Listen for window resize
  window.addEventListener('resize', () => draw())

  // Setup board navigation
  useBoardTranslationPan(canvas, draw)
  initBoardCentered(canvas, draw)
  useResizeBoardMaintainCenter(canvas, draw)
  useBoardScaleZoom(canvas, draw)

  // Setup graph tools
  useGraphToolSelectNode(canvas, canvasContext, draw)
  useGraphToolSelectConnection(canvas, canvasContext, draw)
  useGraphToolAddNode(canvas, canvasContext, draw)
  useGraphToolAddConnection(canvas, canvasContext, draw)
})

onUnmounted(() => {
  // Remove resize listener
  window.removeEventListener('resize', () => draw())

  // Cleanup board navigation
  removeBoardTranslationPan(canvas, draw)
  removeResizeBoardMaintainCenter(canvas)
  removeBoardScaleZoom(canvas, draw)
})

// Draw everything
function draw() {
  if (!canvasContext || !canvas.value) return

  const canvasWidth = (canvas.value.width = window.innerWidth)
  const canvasHeight = (canvas.value.height = window.innerHeight)

  // Clear canvas
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)

  // Draw navigation features
  drawNavigationFeatures(canvasContext)

  // Draw graph nodes
  drawGraphNodes(canvasContext)

  // Draw graph connections
  drawGraphConnections(canvasContext)
}

function drawNavigationFeatures(canvasContext: CanvasRenderingContext2D) {
  // Apply translation
  canvasContext.translate(offsetX.value, offsetY.value)

  // Apply scaling
  canvasContext.scale(scale.value, scale.value)

  // Draw grid
  drawBoardGrid(canvasContext, 5000, 5000, 100)

  // Draw center
  canvasContext.beginPath()
  canvasContext.strokeStyle = 'red'
  canvasContext.lineWidth = 2
  canvasContext.arc(0, 0, 3, 0, 2 * Math.PI)
  canvasContext.stroke()
}

function drawGraphNodes(canvasContext: CanvasRenderingContext2D) {
  graphStore.getNodes.forEach((node: GraphNode) => {
    // Draw node area
    canvasContext.beginPath()
    canvasContext.strokeStyle = node.color
    canvasContext.lineWidth = 2
    canvasContext.arc(node.x, node.y, 30, 0, 2 * Math.PI)
    canvasContext.stroke()

    // Draw node selection highlight
    if (graphStore.getSelectedNode === node) {
      canvasContext.beginPath()
      canvasContext.strokeStyle = 'orange'
      canvasContext.lineWidth = 4
      canvasContext.arc(node.x, node.y, 34, 0, 2 * Math.PI)
      canvasContext.stroke()
    }
  })
}

function drawGraphConnections(canvasContext: CanvasRenderingContext2D) {
  graphStore.getConnections.forEach((connection: GraphConnection) => {
    // Draw connection selection highlight
    // Highlight is drawn "under" the connection line for visibility
    if (graphStore.getSelectedConnection === connection) {
      canvasContext.beginPath()
      canvasContext.strokeStyle = 'orange'
      canvasContext.lineWidth = 6
      canvasContext.moveTo(connection.node1.x, connection.node1.y)
      canvasContext.lineTo(connection.node2.x, connection.node2.y)
      canvasContext.stroke()
    }

    // Draw connection line
    canvasContext.beginPath()
    canvasContext.strokeStyle = connection.color
    canvasContext.lineWidth = 2
    canvasContext.moveTo(connection.node1.x, connection.node1.y)
    canvasContext.lineTo(connection.node2.x, connection.node2.y)
    canvasContext.stroke()
  })

  // Draw temporary connection line
  if (graphStore.getTemporaryConnectionLine) {
    canvasContext.beginPath()
    canvasContext.strokeStyle = '#f000000'
    canvasContext.setLineDash([5, 15])
    canvasContext.lineWidth = 2
    canvasContext.moveTo(
      graphStore.getTemporaryConnectionLine?.start.x,
      graphStore.getTemporaryConnectionLine?.start.y,
    )
    canvasContext.lineTo(
      graphStore.getTemporaryConnectionLine?.end.x,
      graphStore.getTemporaryConnectionLine?.end.y,
    )
    canvasContext.stroke()
  }
}

// Mapping tool selection to pan-zoom activation here in order to keep features decoupled
watch(
  () => toolsStore.selectedTool,
  (newTool) => {
    // Check if the new tool is the Pointer
    const isPointer = newTool === Tools.POINTER
    // Call the action in the other store to update its state
    boardStore.setPanZoomActive(isPointer)
  },
  { immediate: true }, // 'immediate' runs the watcher once on component setup
)
</script>
