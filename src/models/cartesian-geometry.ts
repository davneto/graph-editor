// Todo: Add unit testing for these methods

export class CartesianCoordinates {
  constructor(
    public x: number,
    public y: number,
  ) {}

  isCollidingWithCircle(circle: Circle): boolean {
    const dx = this.x - circle.center.x
    const dy = this.y - circle.center.y
    const distanceSquared = dx * dx + dy * dy
    return distanceSquared <= circle.radius * circle.radius
  }
}

export class Circle {
  constructor(
    public center: CartesianCoordinates,
    public radius: number,
  ) {}

  isCollidingWithPoint(point: CartesianCoordinates): boolean {
    const dx = point.x - this.center.x
    const dy = point.y - this.center.y
    const distanceSquared = dx * dx + dy * dy
    return distanceSquared <= this.radius * this.radius
  }
}

export class Line {
  constructor(
    public start: CartesianCoordinates,
    public end: CartesianCoordinates,
  ) {}

  // Todo: unit test this method
  isCollidingWithPoint(point: CartesianCoordinates): boolean {
    const A = point.x - this.start.x
    const B = point.y - this.start.y
    const C = this.end.x - this.start.x
    const D = this.end.y - this.start.y
    const dot = A * C + B * D
    const lenSq = C * C + D * D
    let param = -1
    if (lenSq !== 0) param = dot / lenSq

    let nearestX,
      nearestY = 0
    if (param < 0) {
      nearestX = this.start.x
      nearestY = this.start.y
    } else if (param > 1) {
      nearestX = this.end.x
      nearestY = this.end.y
    } else {
      nearestX = this.start.x + param * C
      nearestY = this.start.y + param * D
    }
    const dx = point.x - nearestX
    const dy = point.y - nearestY
    const distanceSquared = dx * dx + dy * dy
    const tolerance = 5 // pixels
    return distanceSquared <= tolerance * tolerance
  }
}
