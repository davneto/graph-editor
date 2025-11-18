export function drawBoardGrid(
  canvasContext: CanvasRenderingContext2D | null,
  width: number,
  height: number,
  spacing = 100,
) {
  if (!canvasContext) return
  canvasContext.strokeStyle = '#a5a5a5ff'
  canvasContext.lineWidth = 1

  for (let x = -width; x < width; x += spacing) {
    canvasContext.beginPath()
    canvasContext.moveTo(x, -height)
    canvasContext.lineTo(x, height)
    canvasContext.stroke()
  }

  for (let y = -height; y < height; y += spacing) {
    canvasContext.beginPath()
    canvasContext.moveTo(-width, y)
    canvasContext.lineTo(width, y)
    canvasContext.stroke()
  }
}
