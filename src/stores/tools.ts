import { defineStore } from 'pinia'
import { Tools } from '@/models/tools'

// Define the state type
export interface ToolsState {
  selectedTool: Tools
  isOnline: boolean
  isSyncing: boolean
}

// Define the store
export const useToolsStore = defineStore('toolsStore', {
  state: (): ToolsState => ({
    selectedTool: Tools.POINTER,
    isOnline: navigator.onLine,
    isSyncing: false,
  }),
  actions: {
    selectTool(tool: Tools) {
      this.selectedTool = tool
    },
  },
  getters: {
    getSelectedTool: (state) => state.selectedTool as string,
  },
})
