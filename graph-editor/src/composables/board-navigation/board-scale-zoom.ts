import type { Ref } from 'vue'
import { offsetX, offsetY, scale } from './board-state'
import { useBoardStore } from '@/stores/board'

export function useBoardScaleZoom(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  if (!canvas.value) return

  canvas.value?.addEventListener('wheel', (event: WheelEvent) => {
    const boardPanZoomStore = useBoardStore()
    if (!boardPanZoomStore.isZoomActive) return

    event.preventDefault()

    const mouseX = event.offsetX
    const mouseY = event.offsetY
    const oldScale = scale.value // Store the scale before changing it

    const zoomFactor = 1.1
    if (event.deltaY < 0) {
      // Zoom in
      scale.value *= zoomFactor
    } else {
      // Zoom out
      scale.value /= zoomFactor
    }

    // Keep scale within reasonable limits
    if (scale.value < 0.3) {
      scale.value = 0.3
      return
    } else if (scale.value > 2.0) {
      scale.value = 2.0
      return
    }

    // Adjust offset so zoom centers on mouse
    // Formula: new_offset = mouse_pos - (mouse_pos - old_offset) * (new_scale / old_scale)
    offsetX.value = mouseX - (mouseX - offsetX.value) * (scale.value / oldScale)
    offsetY.value = mouseY - (mouseY - offsetY.value) * (scale.value / oldScale)

    draw()
  })
}

export function resetBoardScaleZoom(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  scale.value = 1.0
  if (!canvas.value) return
  draw()
}

export function removeBoardScaleZoom(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  scale.value = 1.0
  if (!canvas.value) return
  draw()
}
