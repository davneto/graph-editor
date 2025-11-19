import type { Line } from '@/models/cartesian-geometry'
import { Graph, GraphConnection, GraphNode } from '@/models/graph'
import { defineStore } from 'pinia'
import { useHistoryStore } from './history'

// Define the state type
export interface GraphState {
  graph: Graph
  selectedNode: GraphNode | null
  selectedConnection: GraphConnection | null
  temporaryConnectionLine: Line | null
}

// Define the store
export const useGraphStore = defineStore('graphStore', {
  state: (): GraphState => ({
    graph: new Graph([], []),
    selectedNode: null,
    selectedConnection: null,
    temporaryConnectionLine: null,
  }),
  actions: {
    setGraph(graph: Graph) {
      this.graph = graph
    },
    addNode(node: GraphNode) {
      this.graph.nodes.push(node)
    },
    addConnection(connection: GraphConnection) {
      this.graph.connections.push(connection)
    },
    setSelectedNode(node: GraphNode | null) {
      this.selectedNode = node
    },
    setSelectedConnection(connection: GraphConnection | null) {
      this.selectedConnection = connection
    },
    setTemporaryConnectionLine(line: Line | null) {
      this.temporaryConnectionLine = line
    },
    clearTemporaryConnectionLine() {
      this.temporaryConnectionLine = null
    },
  },
  getters: {
    getGraph: (state) => state.graph,
    getNodes: (state) => state.graph.nodes,
    getConnections: (state) => state.graph.connections,
    getNumberOfNodes: (state) => state.graph.nodes.length,
    getNumberOfConnections: (state) => state.graph.connections.length,

    getSelectedNode: (state) => state.selectedNode,
    getSelectedConnection: (state) => state.selectedConnection,

    getTemporaryConnectionLine: (state) => state.temporaryConnectionLine,
  },
})
