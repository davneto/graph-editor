import { defineStore } from 'pinia'

// Define the state type
export interface BoardState {
  isPanActive: boolean
  isZoomActive: boolean
  boardDraw: (() => void) | null
}

// Define the store
export const useBoardStore = defineStore('boardStore', {
  state: (): BoardState => ({
    isPanActive: false,
    isZoomActive: false,
    boardDraw: null,
  }),
  actions: {
    /**
     * Sets the active state for both panning and zooming.
     */
    setPanZoomActive(isActive: boolean) {
      this.isPanActive = isActive
      this.isZoomActive = isActive
    },
    setBoardDraw(drawFunction: (() => void) | null) {
      this.boardDraw = drawFunction
    },
    draw() {
      if (this.boardDraw) {
        this.boardDraw()
      }
    },
  },
})
