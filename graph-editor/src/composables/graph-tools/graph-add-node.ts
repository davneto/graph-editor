import { CartesianCoordinates } from '@/models/cartesian-geometry'
import { GraphNode } from '@/models/graph'
import { Tools } from '@/models/tools'
import { useGraphStore } from '@/stores/graph'
import { useToolsStore } from '@/stores/tools'
import type { Ref } from 'vue'
import { getBoardClickPosition } from '@/composables/board-navigation/board-get-click-position'
import { useHistoryStore } from '@/stores/history'

export function useGraphToolAddNode(
  canvas: Ref<HTMLCanvasElement | null>,
  canvasContext: CanvasRenderingContext2D | null,
  draw: () => void,
) {
  if (!canvas.value || !canvasContext) return

  const toolsStore = useToolsStore()

  canvas.value.addEventListener('click', (event: MouseEvent) => {
    if (!canvas.value) return

    const clientClickPosition: CartesianCoordinates = new CartesianCoordinates(
      event.clientX,
      event.clientY,
    )
    const boardClickPosition: CartesianCoordinates = getBoardClickPosition(clientClickPosition)

    switch (toolsStore.getSelectedTool) {
      case Tools.ADD_NODE:
        addNode(boardClickPosition)
        break
      default:
        return
    }

    draw()
  })
}

function addNode(boardClickPosition: CartesianCoordinates) {
  const graphStore = useGraphStore()
  const historyStore = useHistoryStore()

  const graphNode: GraphNode = new GraphNode(
    'New Node',
    '#000000',
    boardClickPosition.x,
    boardClickPosition.y,
  )
  graphStore.addNode(graphNode)
  historyStore.record_addNode(graphNode)

  // Revert to pointer tool after adding the node
  // toolsStore.selectTool(Tools.POINTER)
}
