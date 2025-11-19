import { CartesianCoordinates, Circle, Line } from './cartesian-geometry'
import { History } from './history'

export class GraphNode {
  private static nextId = 0
  public id: number

  constructor(
    public label: string,
    public color: string = '#000000',
    public x: number,
    public y: number,
    public connections: Array<GraphConnection> = [],
  ) {
    this.id = GraphNode.nextId++
  }

  public getCircle(): Circle {
    return new Circle(new CartesianCoordinates(this.x, this.y), 30) // Assuming a fixed radius of 20 for node representation
  }

  public getId(): number {
    return this.id
  }

  public static getNextId() {
    return GraphNode.nextId
  }

  public static setNextId(value: number) {
    GraphNode.nextId = value
  }

  public isConnectedTo(node: GraphNode): boolean {
    return this.connections.some(
      (connection) => connection.node1 === node || connection.node2 === node,
    )
  }

  public delete(graph: Graph) {
    // remove all connections associated with this node
    this.connections.forEach((connection) => {
      connection.delete(graph)
    })

    // DELETE FROM GRAPH
    // replace nodes with a filtered array excluding this node
    graph.nodes = graph.nodes.filter((node) => node !== this)
  }

  public getAsData() {
    return {
      id: this.id,
      label: this.label,
      color: this.color,
      x: this.x,
      y: this.y,
    }
  }
}

export enum GraphConnectionDirectionality {
  UNDIRECTED = 'UNDIRECTED',
  DIRECT = 'DIRECT', // from node1 to node2
  DIRECT_REVERSE = 'DIRECT_REVERSE', // from node2 to node1
}

export class GraphConnection {
  private static nextId = 0
  public id: number

  constructor(
    public weight: number = 1,
    public color: string = '#000000',
    public node1: GraphNode,
    public node2: GraphNode,
    public directionality: GraphConnectionDirectionality = GraphConnectionDirectionality.UNDIRECTED,
  ) {
    this.id = GraphConnection.nextId++
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

  public static getNextId() {
    return GraphConnection.nextId
  }

  public static setNextId(value: number) {
    GraphConnection.nextId = value
  }

  public delete(graph: Graph) {
    // DELETE FROM NODE 1
    // replace connections with a filtered array excluding this connection
    this.node1.connections = this.node1.connections.filter((connection) => connection !== this)

    // DELETE FROM NODE 2
    // replace connections with a filtered array excluding this connection
    this.node2.connections = this.node2.connections.filter((connection) => connection !== this)

    // DELETE FROM GRAPH
    // replace connections with a filtered array excluding this connection
    graph.connections = graph.connections.filter((connection) => connection !== this)
  }

  public getAsData() {
    return {
      id: this.id,
      weight: this.weight,
      color: this.color,
      node1Id: this.node1.id,
      node2Id: this.node2.id,
      directionality: this.directionality as string,
    }
  }
}

export class Graph {
  constructor(
    public nodes: Array<GraphNode>,
    public connections: Array<GraphConnection>,
  ) {}

  static generateFromHistory(history: History): Graph {
    const graph = new Graph([], [])

    // Rebuild graph state by applying all actions in history
    history.actions.forEach((action) => {
      switch (action.type) {
        case 'ADD_NODE': {
          const nodeData = action.data as {
            id: number
            label: string
            color: string
            x: number
            y: number
          }
          const newNode = new GraphNode(nodeData.label, nodeData.color, nodeData.x, nodeData.y)

          newNode.id = nodeData.id // set to original ID
          graph.nodes.push(newNode)
          break
        }
        case 'DELETE_NODE': {
          const nodeData = action.data as { id: number }
          const nodeToDelete = graph.nodes.find((node) => node.id === nodeData.id)
          if (nodeToDelete) {
            nodeToDelete.delete(graph)
          }
          break
        }
        case 'ADD_CONNECTION': {
          const connData = action.data as {
            id: number
            weight: number
            color: string
            node1Id: number
            node2Id: number
            directionality: GraphConnectionDirectionality
          }
          const node1 = graph.nodes.find((node) => node.id === connData.node1Id)
          const node2 = graph.nodes.find((node) => node.id === connData.node2Id)
          if (node1 && node2) {
            const newConnection = new GraphConnection(
              connData.weight,
              connData.color,
              node1,
              node2,
              connData.directionality,
            )

            newConnection.id = connData.id // set to original ID
            graph.connections.push(newConnection)
          }
          break
        }
        case 'DELETE_CONNECTION': {
          const connData = action.data as { id: number }
          const connectionToDelete = graph.connections.find((conn) => conn.id === connData.id)
          if (connectionToDelete) {
            connectionToDelete.delete(graph)
          }
          break
        }
        case 'EDIT_NODE': {
          const nodeData = action.data as {
            id: number
            label: string
            color: string
            x: number
            y: number
          }
          const nodeToEdit = graph.nodes.find((node) => node.id === nodeData.id)
          if (nodeToEdit) {
            nodeToEdit.label = nodeData.label
            nodeToEdit.color = nodeData.color
            nodeToEdit.x = nodeData.x
            nodeToEdit.y = nodeData.y
          }
          break
        }
        case 'EDIT_CONNECTION': {
          const connData = action.data as {
            id: number
            weight?: number
            color?: string
            directionality: GraphConnectionDirectionality
          }
          const connectionToEdit = graph.connections.find((conn) => conn.id === connData.id)
          if (connectionToEdit) {
            if (connData.weight !== undefined) {
              connectionToEdit.weight = connData.weight
            }
            if (connData.color !== undefined) {
              connectionToEdit.color = connData.color
            }
            connectionToEdit.directionality = connData.directionality
          }
          break
        }
      }
    })
    return graph
  }
}
