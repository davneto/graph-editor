import { CartesianCoordinates, Circle, Line } from './cartesian-geometry'

export class Graph {
  constructor(
    public nodes: Array<GraphNode>,
    public connections: Array<GraphConnection>,
  ) {}
}

export class GraphNode {
  private static idCounter = 0
  public id: number

  constructor(
    public label: string,
    public color: string = '#000000',
    public x: number,
    public y: number,
    public connections: Array<GraphConnection> = [],
  ) {
    this.id = GraphNode.idCounter++
  }

  public getCircle(): Circle {
    return new Circle(new CartesianCoordinates(this.x, this.y), 30) // Assuming a fixed radius of 20 for node representation
  }

  public getId(): number {
    return this.id
  }

  public static setIdCounter(value: number) {
    GraphNode.idCounter = value
  }

  public isConnectedTo(node: GraphNode): boolean {
    return this.connections.some(
      (connection) => connection.node1 === node || connection.node2 === node,
    )
  }
}

export enum GraphConnectionDirectionality {
  UNDIRECTED = 'UNDIRECTED',
  DIRECT = 'DIRECT', // from node1 to node2
  DIRECT_REVERSE = 'DIRECT_REVERSE', // from node2 to node1
}

export class GraphConnection {
  private static idCounter = 0
  public id: number

  constructor(
    public weight: number = 1,
    public color: string = '#000000',
    public node1: GraphNode,
    public node2: GraphNode,
    public directionality: GraphConnectionDirectionality = GraphConnectionDirectionality.UNDIRECTED,
  ) {
    this.id = GraphConnection.idCounter++
  }

  public getLine(): Line {
    return new Line(
      new CartesianCoordinates(this.node1.x, this.node1.y),
      new CartesianCoordinates(this.node2.x, this.node2.y),
    )
  }

  public getId(): number {
    return this.id
  }

  public static setIdCounter(value: number) {
    GraphConnection.idCounter = value
  }
}
