import { CartesianCoordinates, Circle, Line } from '@/models/cartesian-geometry'
import { GraphConnection, GraphNode } from '@/models/graph'
import { Tools } from '@/models/tools'
import { useGraphStore } from '@/stores/graph'
import { useToolsStore } from '@/stores/tools'
import type { Ref } from 'vue'
import { getBoardClickPosition } from '@/composables/board-navigation/board-get-click-position'
import { useHistoryStore } from '@/stores/history'

let initialNode: GraphNode | null = null

export function useGraphToolAddConnection(
  canvas: Ref<HTMLCanvasElement | null>,
  canvasContext: CanvasRenderingContext2D | null,
  draw: () => void,
) {
  if (!canvas.value || !canvasContext) return

  const toolsStore = useToolsStore()
  const graphStore = useGraphStore()

  // Update last mouse position on mouse move
  canvas.value.addEventListener('mousemove', (event: MouseEvent) => {
    if (!canvas.value) return
    if (!initialNode) return

    const clientCurrentPosition: CartesianCoordinates = new CartesianCoordinates(
      event.clientX,
      event.clientY,
    )
    const boardCurrentPosition: CartesianCoordinates = getBoardClickPosition(clientCurrentPosition)

    switch (toolsStore.getSelectedTool) {
      case Tools.ADD_CONNECTION:
        // Draw temporary line from initial node to current mouse position
        const lineStart: CartesianCoordinates = new CartesianCoordinates(
          initialNode.x,
          initialNode.y,
        )
        const lineEnd: CartesianCoordinates = boardCurrentPosition
        const temporaryLine = new Line(lineStart, lineEnd)
        graphStore.setTemporaryConnectionLine(temporaryLine)

        draw()
        break
    }
  })

  canvas.value.addEventListener('mousedown', (event: MouseEvent) => {
    if (!canvas.value) return

    const clientClickPosition: CartesianCoordinates = new CartesianCoordinates(
      event.clientX,
      event.clientY,
    )
    const boardClickPosition: CartesianCoordinates = getBoardClickPosition(clientClickPosition)

    switch (toolsStore.getSelectedTool) {
      case Tools.ADD_CONNECTION:
        // Only apply if it was a pure click without movement
        detectNodeAndInitiateConnection(boardClickPosition)
        break
    }
  })

  canvas.value.addEventListener('mouseup', (event: MouseEvent) => {
    if (!canvas.value) return

    const clientClickPosition: CartesianCoordinates = new CartesianCoordinates(
      event.clientX,
      event.clientY,
    )
    const boardClickPosition: CartesianCoordinates = getBoardClickPosition(clientClickPosition)
    switch (toolsStore.getSelectedTool) {
      case Tools.ADD_CONNECTION:
        // Only apply if it was a pure click without movement
        detectNodeAndFinishConnection(boardClickPosition)

        graphStore.clearTemporaryConnectionLine()
        initialNode = null
        draw()
        break
    }

    draw()
  })
}

function detectNodeAndInitiateConnection(boardClickPosition: CartesianCoordinates) {
  const graphStore = useGraphStore()

  // If we don't have an initial node, try to set it
  initialNode = null

  // Select initial node if clicked on it
  graphStore.getNodes.forEach((node: GraphNode) => {
    const nodeCircle: Circle = node.getCircle()
    if (nodeCircle.isCollidingWithPoint(boardClickPosition)) {
      initialNode = node
      console.log('initiating connection')
      return
    }
  })
}

function detectNodeAndFinishConnection(boardClickPosition: CartesianCoordinates) {
  const graphStore = useGraphStore()
  const historyStore = useHistoryStore()

  // Select initial node if clicked on it
  graphStore.getNodes.forEach((node: GraphNode) => {
    const nodeCircle: Circle = node.getCircle()
    if (nodeCircle.isCollidingWithPoint(boardClickPosition)) {
      // if no initial node defined or same as initial, ignore
      if (!initialNode || node === initialNode) return

      // if already connected, ignore
      if (initialNode.isConnectedTo(node)) return

      //create connection
      const graphConnection: GraphConnection = new GraphConnection(1, '#000000', initialNode, node)

      console.log(graphConnection)

      // add it to graph list of connections
      graphStore.addConnection(graphConnection)
      historyStore.record_addConnection(graphConnection)

      // add it to both nodes' list of connections
      initialNode.connections.push(graphConnection)
      node.connections.push(graphConnection)

      // reset initial node
      initialNode = null
    }
  })
}
