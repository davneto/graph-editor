import { CartesianCoordinates, Circle } from '@/models/cartesian-geometry'
import { GraphNode } from '@/models/graph'
import { Tools } from '@/models/tools'
import { useGraphStore } from '@/stores/graph'
import { useToolsStore } from '@/stores/tools'
import type { Ref } from 'vue'
import { getBoardClickPosition } from '@/composables/board-navigation/board-get-click-position'
import { scale, isDraggingNode } from '@/composables/board-navigation/board-state'

export function useGraphToolSelectNode(
  canvas: Ref<HTMLCanvasElement | null>,
  canvasContext: CanvasRenderingContext2D | null,
  draw: () => void,
) {
  if (!canvas.value || !canvasContext) return

  let isMoved = false // used to detect pure clicks without dragging
  let lastX: number, lastY: number
  let draggingNode: GraphNode | null = null

  const toolsStore = useToolsStore()
  const graphStore = useGraphStore()

  canvas.value.addEventListener('click', (event: MouseEvent) => {
    if (!canvas.value) return

    const clientClickPosition: CartesianCoordinates = new CartesianCoordinates(
      event.clientX,
      event.clientY,
    )
    const boardClickPosition: CartesianCoordinates = getBoardClickPosition(clientClickPosition)

    switch (toolsStore.getSelectedTool) {
      case Tools.POINTER:
        if (!isMoved) {
          // Only apply if it was a pure click without movement
          detectAndSelectNode(boardClickPosition)
        }
        break
      default:
        return
    }

    draw()
  })

  canvas.value.addEventListener('mousedown', (event: MouseEvent) => {
    if (toolsStore.getSelectedTool !== Tools.POINTER) return

    isMoved = false
    lastX = event.clientX
    lastY = event.clientY

    // Check if mousedown landed on a node — if so, start dragging it
    const boardPos = getBoardClickPosition(new CartesianCoordinates(event.clientX, event.clientY))
    const hit = graphStore.getNodes.find((node: GraphNode) =>
      node.getCircle().isCollidingWithPoint(boardPos),
    )
    draggingNode = hit ?? null
    isDraggingNode.value = draggingNode !== null
  })

  canvas.value.addEventListener('mousemove', (event: MouseEvent) => {
    if (toolsStore.getSelectedTool !== Tools.POINTER) return

    const dx = event.clientX - lastX
    const dy = event.clientY - lastY

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) isMoved = true

    if (draggingNode) {
      // Convert the mouse delta from screen pixels to board coordinates.
      // We can't use getBoardClickPosition here because that gives an absolute position —
      // we need a delta, so we divide the pixel movement by the current scale.
      draggingNode.x += dx / scale.value
      draggingNode.y += dy / scale.value
      lastX = event.clientX
      lastY = event.clientY
      draw()
    }
  })

  canvas.value.addEventListener('mouseup', () => {
    draggingNode = null
    isDraggingNode.value = false
  })

  // Cancel drag if mouse leaves the canvas
  canvas.value.addEventListener('mouseleave', () => {
    draggingNode = null
    isDraggingNode.value = false
  })
}

function detectAndSelectNode(boardClickPosition: CartesianCoordinates) {
  console.log('Pointer tool clicked at:', boardClickPosition.x, boardClickPosition.y)
  const graphStore = useGraphStore()

  // Deselect all nodes if didn't click on any
  graphStore.setSelectedNode(null)

  // Select a node if clicked on it
  graphStore.getNodes.forEach((node: GraphNode) => {
    const nodeCircle: Circle = node.getCircle()
    if (nodeCircle.isCollidingWithPoint(boardClickPosition)) {
      graphStore.setSelectedNode(node)
      console.log('Selected node:', node.label)
      return
    }
  })
}
