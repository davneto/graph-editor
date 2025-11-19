import { v4 as uuidv4 } from 'uuid'
import { GraphConnection, GraphNode } from './graph'

export enum ActionType {
  ADD_NODE = 'ADD_NODE',
  EDIT_NODE = 'EDIT_NODE',
  DELETE_NODE = 'DELETE_NODE',
  ADD_CONNECTION = 'ADD_CONNECTION',
  EDIT_CONNECTION = 'EDIT_CONNECTION',
  DELETE_CONNECTION = 'DELETE_CONNECTION',
}

export class History {
  constructor(
    public uuid: string, // stores reference of this history version to make it easy to compare versions
    public nextActionSequenceNumber: number = 0,
    public nextNodeId: number = 0,
    public nextConnectionId: number = 0,
    public actions: Action[],
  ) {}

  public updateHistoryState() {
    this.uuid = uuidv4() // update UUID to represent new state
    this.nextNodeId = GraphNode.getNextId()
    this.nextConnectionId = GraphConnection.getNextId()
  }

  public record_addNode(nodeData: AddNodeData) {
    const action: Action = {
      uuid: uuidv4(),
      sequenceNumber: this.nextActionSequenceNumber++,
      type: ActionType.ADD_NODE,
      data: nodeData,
    }
    this.actions.push(action)
    this.updateHistoryState()
  }
  public record_editNode(nodeData: EditNodeData) {
    const action: Action = {
      uuid: uuidv4(),
      sequenceNumber: this.nextActionSequenceNumber++,
      type: ActionType.EDIT_NODE,
      data: nodeData,
    }
    this.actions.push(action)
    this.updateHistoryState()
  }
  public record_deleteNode(nodeData: DeleteNodeData) {
    const action: Action = {
      uuid: uuidv4(),
      sequenceNumber: this.nextActionSequenceNumber++,
      type: ActionType.DELETE_NODE,
      data: nodeData,
    }
    this.actions.push(action)
    this.updateHistoryState()
  }
  public record_addConnection(connectionData: AddConnectionData) {
    const action: Action = {
      uuid: uuidv4(),
      sequenceNumber: this.nextActionSequenceNumber++,
      type: ActionType.ADD_CONNECTION,
      data: connectionData,
    }
    this.actions.push(action)
    this.updateHistoryState()
  }
  public record_editConnection(connectionData: EditConnectionData) {
    const action: Action = {
      uuid: uuidv4(),
      sequenceNumber: this.nextActionSequenceNumber++,
      type: ActionType.EDIT_CONNECTION,
      data: connectionData,
    }
    this.actions.push(action)
    this.updateHistoryState()
  }
  public record_deleteConnection(connectionData: DeleteConnectionData) {
    const action: Action = {
      uuid: uuidv4(),
      sequenceNumber: this.nextActionSequenceNumber++,
      type: ActionType.DELETE_CONNECTION,
      data: connectionData,
    }
    this.actions.push(action)
    this.updateHistoryState()
  }
}

export interface Action {
  uuid: string
  sequenceNumber: number
  type: ActionType
  data:
    | AddNodeData
    | EditNodeData
    | DeleteNodeData
    | AddConnectionData
    | EditConnectionData
    | DeleteConnectionData
}

export interface AddNodeData {
  id: number
  label: string
  color: string
  x: number
  y: number
}

export interface EditNodeData {
  id: number
  label: string
  color: string
  x: number
  y: number
}

export interface DeleteNodeData {
  id: number
}

export interface AddConnectionData {
  id: number
  weight: number
  color: string
  node1Id: number
  node2Id: number
  directionality: string
}

export interface EditConnectionData {
  id: number
  weight?: number
  color?: string
  directionality: string
}

export interface DeleteConnectionData {
  id: number
}
