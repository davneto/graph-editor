import { CartesianCoordinates, Circle } from '@/models/cartesian-geometry'
import { GraphNode } from '@/models/graph'
import { Tools } from '@/models/tools'
import { useGraphStore } from '@/stores/graph'
import { useToolsStore } from '@/stores/tools'
import type { Ref } from 'vue'
import { getBoardClickPosition } from '@/composables/board-navigation/board-get-click-position'

export function useGraphToolSelectNode(
  canvas: Ref<HTMLCanvasElement | null>,
  canvasContext: CanvasRenderingContext2D | null,
  draw: () => void,
) {
  if (!canvas.value || !canvasContext) return

  let isMoved = false // used to detect pure clicks without dragging
  let lastX: number, lastY: number

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

    // if (graphStore.getSelectedNode) {
    //   setTimeout(() => {
    //     // small hack to provide precedence to node selection over connection selection
    //     graphStore.setSelectedConnection(null)
    //     draw()
    //   }, 0)
    // } else {
    draw()
    // }
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

function detectAndSelectNode(boardClickPosition: CartesianCoordinates) {
  // Placeholder for pointer tool click handling
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
