import { ref } from 'vue'

// The board's horizontal offset
export const offsetX = ref(0)

// The board's vertical offset
export const offsetY = ref(0)

// The board's current scale/zoom level
export const scale = ref(1.0)

// True while a node is being dragged — used to suppress panning
export const isDraggingNode = ref(false)
