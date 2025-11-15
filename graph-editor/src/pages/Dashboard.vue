<script setup lang="ts">
import Board from '../components/Board.vue'
</script>

<template>
  <div id="board-layer">
    <Board />
  </div>
  <div id="tools-layer">
    <div id="tools-top">
      <h1>Graph Editor</h1>
    </div>
  </div>
</template>

<style scoped>
#board-layer {
  overflow: hidden;
  max-height: 100vh;
}

#tools-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

#tools-top {
  display: flex;
  justify-content: center;
}
</style>
