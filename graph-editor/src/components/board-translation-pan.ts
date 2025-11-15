import type { Ref } from 'vue'
import { offsetX, offsetY, scale } from './board-state'

let isDragging = false
let lastX: number, lastY: number
const TRANSLATION_LIMIT = 5000

export function useBoardTranslationPan(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  if (!canvas.value) return

  canvas.value?.addEventListener('mousedown', (event: MouseEvent) => {
    isDragging = true
    lastX = event.clientX
    lastY = event.clientY
  })

  canvas.value?.addEventListener('mousemove', (event: MouseEvent) => {
    if (!canvas.value) return
    if (isDragging) {
      const dx = event.clientX - lastX
      const dy = event.clientY - lastY

      const canvasWidth = canvas.value.width
      const canvasHeight = canvas.value.height

      offsetX.value += dx
      offsetY.value += dy

      // Limit translation to within -5000 to 5000
      if (offsetX.value > TRANSLATION_LIMIT * scale.value)
        offsetX.value = TRANSLATION_LIMIT * scale.value

      if (offsetX.value < -TRANSLATION_LIMIT * scale.value + canvasWidth)
        offsetX.value = -TRANSLATION_LIMIT * scale.value + canvasWidth

      if (offsetY.value > TRANSLATION_LIMIT * scale.value)
        offsetY.value = TRANSLATION_LIMIT * scale.value

      if (offsetY.value < -TRANSLATION_LIMIT * scale.value + canvasHeight)
        offsetY.value = -TRANSLATION_LIMIT * scale.value + canvasHeight

      lastX = event.clientX
      lastY = event.clientY
      draw()
    }
  })

  canvas.value?.addEventListener('mouseup', () => {
    isDragging = false
    draw()
  })
  canvas.value?.addEventListener('mouseleave', () => {
    isDragging = false
    draw()
  })
}

export function resetBoardTranslationPan(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  isDragging = false
  offsetX.value = 0
  offsetY.value = 0
  lastX = 0
  lastY = 0
  if (!canvas.value) return
  draw()
}

export function removeBoardTranslationPan(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  resetBoardTranslationPan(canvas, draw)
  if (!canvas.value) return
  canvas.value?.removeEventListener('mousedown', () => {})
  canvas.value?.removeEventListener('mousemove', () => {})
  canvas.value?.removeEventListener('mouseup', () => {})
  canvas.value?.removeEventListener('mouseleave', () => {})
}

export function initBoardCentered(canvas: Ref<HTMLCanvasElement | null>, draw: () => void) {
  if (!canvas.value) return
  const canvasWidth = canvas.value.width
  const canvasHeight = canvas.value.height
  offsetX.value = canvasWidth / 2
  offsetY.value = canvasHeight / 2
  draw()
}

export function useResizeBoardMaintainCenter(
  canvas: Ref<HTMLCanvasElement | null>,
  draw: () => void,
) {
  if (!canvas.value) return

  let lastWidth = canvas.value!.width
  let lastHeight = canvas.value!.height

  window.addEventListener('resize', () => {
    if (!canvas.value) return
    const newWidth = canvas.value!.width
    const newHeight = canvas.value!.height

    const diffX = newWidth - lastWidth
    const diffY = newHeight - lastHeight

    // Adjust offsets to maintain centering
    offsetX.value += diffX / 2
    offsetY.value += diffY / 2

    draw()

    // Update stored values
    lastWidth = newWidth
    lastHeight = newHeight
  })
}

export function removeResizeBoardMaintainCenter(canvas: Ref<HTMLCanvasElement | null>) {
  if (!canvas.value) return
  window.removeEventListener('resize', () => {})
}
