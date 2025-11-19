import { CartesianCoordinates, Circle, Line } from '@/models/cartesian-geometry'
import { GraphConnection, GraphNode } from '@/models/graph'
import { Tools } from '@/models/tools'
import { useGraphStore } from '@/stores/graph'
import { useToolsStore } from '@/stores/tools'
import type { Ref } from 'vue'
import { getBoardClickPosition } from '@/composables/board-navigation/board-get-click-position'

export function useGraphToolSelectConnection(
  canvas: Ref<HTMLCanvasElement | null>,
  canvasContext: CanvasRenderingContext2D | null,
  draw: () => void,
) {
  if (!canvas.value || !canvasContext) return

  let isMoved = false // used to detect pure clicks without dragging
  let lastX: number, lastY: number

  const toolsStore = useToolsStore()

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
          detectAndSelectConnection(boardClickPosition)
        }
        break
      default:
        return
    }

    draw()
  })

  // Detect movement to distinguish between click and drag
  canvas.value.addEventListener('mousedown', (event: MouseEvent) => {
    isMoved = false
    lastX = event.clientX
    lastY = event.clientY
  })

  // Update last mouse position on mouse move
  canvas.value.addEventListener('mousemove', (event: MouseEvent) => {
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10)
      // tolerance to consider as movement
      isMoved = true
  })
}

function detectAndSelectConnection(boardClickPosition: CartesianCoordinates) {
  // Placeholder for pointer tool click handling
  console.log('Pointer tool clicked at:', boardClickPosition.x, boardClickPosition.y)
  const graphStore = useGraphStore()

  // Deselect all nodes if didn't click on any
  graphStore.setSelectedConnection(null)

  // Select a node if clicked on it
  graphStore.getConnections.forEach((connection: GraphConnection) => {
    const connectionLine: Line = connection.getLine()
    if (connectionLine.isCollidingWithPoint(boardClickPosition)) {
      graphStore.setSelectedConnection(connection)

      console.log('Selected connection:', connection.getId())
      return
    }
  })
}
