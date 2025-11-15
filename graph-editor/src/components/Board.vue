<template>
  <canvas id="board-canvas" ref="canvas"></canvas>
</template>

<style scoped>
#board-canvas {
  background: rgb(193, 193, 193);
  width: 100vw;
  height: 100vh;
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { offsetX, offsetY, scale } from './board-state'
import {
  removeBoardTranslationPan,
  useBoardTranslationPan,
  initBoardCentered,
  useResizeBoardMaintainCenter,
  removeResizeBoardMaintainCenter,
} from './board-translation-pan'
import { drawBoardGrid } from './board-grid'
import { removeBoardScaleZoom, useBoardScaleZoom } from './board-scale-zoom'

// Canvas reference
const canvas = ref<HTMLCanvasElement | null>(null)
let canvasContext: CanvasRenderingContext2D | null = null

// Draw everything
function draw() {
  if (!canvasContext || !canvas.value) return

  const canvasWidth = (canvas.value.width = window.innerWidth)
  const canvasHeight = (canvas.value.height = window.innerHeight)

  // Clear canvas
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)

  // Apply translation
  canvasContext.translate(offsetX.value, offsetY.value)

  // Apply scaling
  canvasContext.scale(scale.value, scale.value)

  // Draw grid
  drawBoardGrid(canvasContext, 5000, 5000, 100)

  // Draw center
  canvasContext.beginPath()
  canvasContext.strokeStyle = 'red'
  canvasContext.lineWidth = 5
  canvasContext.arc(0, 0, 10, 0, 2 * Math.PI)
  canvasContext.stroke()
}

// Mounted hook
onMounted(() => {
  // Get canvas context
  canvasContext = canvas.value?.getContext('2d') || null

  // Initial draw
  draw()

  // Setup board translation
  useBoardTranslationPan(canvas, draw)
  initBoardCentered(canvas, draw)
  useResizeBoardMaintainCenter(canvas, draw)

  // Setup board scale zoom
  useBoardScaleZoom(canvas, draw)

  // Listen for window resize
  window.addEventListener('resize', () => draw())
})

onUnmounted(() => {
  // Cleanup board translation
  removeBoardTranslationPan(canvas, draw)
  removeResizeBoardMaintainCenter(canvas)

  // Cleanup board scale zoom
  removeBoardScaleZoom(canvas, draw)

  // Remove resize listener
  window.removeEventListener('resize', () => draw())
})
</script>
