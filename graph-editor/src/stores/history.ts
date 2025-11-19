import { Graph, type GraphConnection, type GraphNode } from '@/models/graph'
import { History } from '@/models/history'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useGraphStore } from './graph'
import { useBoardStore } from './board'

// Define the state type
export interface HistoryState {
  history: History
}

// Define the store
export const useHistoryStore = defineStore('historyStore', {
  state: (): HistoryState => ({
    history: new History(uuidv4(), 0, 0, 0, []),
  }),
  actions: {
    record_addNode(node: GraphNode) {
      const nodeData = node.getAsData()
      this.history.record_addNode(nodeData)
      this.save_historyToLocalStorage()

      console.log(this.history)
    },
    record_editNode(node: GraphNode) {
      const nodeData = node.getAsData() // could be done partially, but doing completely for simplicity
      this.history.record_editNode(nodeData)
      this.save_historyToLocalStorage()

      console.log(this.history)
    },
    record_deleteNode(nodeId: number) {
      const nodeData = { id: nodeId }
      this.history.record_deleteNode(nodeData)
      this.save_historyToLocalStorage()

      console.log(this.history)
    },
    record_addConnection(connection: GraphConnection) {
      const connectionData = connection.getAsData()
      this.history.record_addConnection(connectionData)
      this.save_historyToLocalStorage()

      console.log(this.history)
    },
    record_editConnection(connection: GraphConnection) {
      const connectionData = connection.getAsData() // could be done partially, but doing completely for simplicity
      this.history.record_editConnection(connectionData)
      this.save_historyToLocalStorage()

      console.log(this.history)
    },
    record_deleteConnection(connection: GraphConnection) {
      const connectionData = { id: connection.id }
      this.history.record_deleteConnection(connectionData)
      this.save_historyToLocalStorage()

      console.log(this.history)
    },

    save_historyToLocalStorage() {
      const historyJSON = JSON.stringify(this.history)
      localStorage.setItem('graphEditorHistory', historyJSON)
    },

    restoreAppStateFromHistory() {
      const boardStore = useBoardStore()
      const historyJSON = localStorage.getItem('graphEditorHistory')

      // if something is saved on localstorage, load it
      if (historyJSON) {
        const historyObj = JSON.parse(historyJSON)

        // reconstruct History instance
        this.history = new History(
          historyObj.uuid,
          historyObj.nextActionSequenceNumber,
          historyObj.nextNodeId,
          historyObj.nextConnectionId,
          historyObj.actions,
        )

        console.log('Restored history:', this.history)

        // reconstruct graph from history
        const graphStore = useGraphStore()
        const newGraph = Graph.generateFromHistory(this.history)
        graphStore.setGraph(newGraph)

        console.info('Restored app state from history in localStorage')
      } else {
        console.info('No history found in localStorage to restore')
      }

      this.history.updateHistoryState()

      boardStore.draw()
    },
  },
  getters: {
    getHistory: (state) => state.history,
  },
})
