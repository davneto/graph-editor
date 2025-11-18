import { CartesianCoordinates } from '@/models/cartesian-geometry'
import { offsetX, scale, offsetY } from './board-state'

export function getBoardClickPosition(
  clientClickPosition: CartesianCoordinates,
): CartesianCoordinates {
  const boardX = (clientClickPosition.x - offsetX.value) / scale.value
  const boardY = (clientClickPosition.y - offsetY.value) / scale.value
  return new CartesianCoordinates(boardX, boardY)
}
