import type { Action, ActionType } from '@/models/history'
import { v4 as uuidv4 } from 'uuid'
import type { HistoryData } from '@/models/history'

// Get remote history ID
// export const getRemoteStateId = async (historyId: string): Promise<string> => {
//   // TODO: implement API call to get remote history ID so we can compare versions
//   return uuidv4()
// }

// Post partial actions data to server and get back final decision history data
// export const postPartialActions = async (actionsData: Action[]): Promise<HistoryData> => {
//   //   const response = await axios.post<User>('/users', user)
//   return {}
// }

// Post local history data to server and get back final decision history data
export const postState = async (historyData: HistoryData): Promise<HistoryData> => {
  //   const response = await axios.post<User>('/users', user)

  const actionsMockData: Action[] = [
    {
      uuid: '9a69ae7d-867d-48ff-8590-ae378b8cf30b',
      sequenceNumber: 0,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 0,
        label: 'New Node',
        color: '#000000',
        x: -203,
        y: -141.5,
      },
    },
    {
      uuid: '27fedbf9-3c83-4392-9e5c-9e0b862d9725',
      sequenceNumber: 1,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 1,
        label: 'New Node',
        color: '#000000',
        x: 233,
        y: -158.5,
      },
    },
    {
      uuid: '98ecd06d-a5a5-4d43-9a4a-79a4c1dc2e1b',
      sequenceNumber: 2,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 2,
        label: 'New Node',
        color: '#000000',
        x: 33,
        y: 72.5,
      },
    },
    {
      uuid: 'b3912f67-cc30-4413-ba5e-85bb7a35ccd2',
      sequenceNumber: 3,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 3,
        label: 'New Node',
        color: '#000000',
        x: -223,
        y: 78.5,
      },
    },
    {
      uuid: 'f8bd9b22-19ad-4269-8615-5587144b2f73',
      sequenceNumber: 4,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 4,
        label: 'New Node',
        color: '#000000',
        x: 41,
        y: -92.5,
      },
    },
    {
      uuid: '3db6023a-db24-4374-b046-699f030344a8',
      sequenceNumber: 5,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 5,
        label: 'New Node',
        color: '#000000',
        x: 254,
        y: 202.5,
      },
    },
    {
      uuid: '306024cd-d4a8-44c2-b487-e9e9eca8d6a4',
      sequenceNumber: 6,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 6,
        label: 'New Node',
        color: '#000000',
        x: -277,
        y: -138.5,
      },
    },
    {
      uuid: '8415cb26-1a5f-49f0-ab19-863b1559e506',
      sequenceNumber: 7,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 7,
        label: 'New Node',
        color: '#000000',
        x: 62,
        y: -259.5,
      },
    },
    {
      uuid: '799b8dae-21e4-42af-82e4-43269b6883e0',
      sequenceNumber: 8,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 8,
        label: 'New Node',
        color: '#000000',
        x: -79,
        y: 6.5,
      },
    },
    {
      uuid: '03e06771-d588-480f-b5cd-16bf65747e5a',
      sequenceNumber: 9,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 0,
        weight: 1,
        color: '#000000',
        node1Id: 6,
        node2Id: 7,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'c2b01989-9870-4ac1-a2c0-cf5f569a4f68',
      sequenceNumber: 10,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 1,
        weight: 1,
        color: '#000000',
        node1Id: 7,
        node2Id: 8,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '29a073dd-c16d-4b1d-9c06-fca75f6931ec',
      sequenceNumber: 11,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 2,
        weight: 1,
        color: '#000000',
        node1Id: 8,
        node2Id: 6,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '132de537-a5fc-4cf3-9912-e6aff33f13e0',
      sequenceNumber: 12,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 3,
        weight: 1,
        color: '#000000',
        node1Id: 0,
        node2Id: 1,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'ba832370-29a2-40bd-8de9-44a27183e398',
      sequenceNumber: 13,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 4,
        weight: 1,
        color: '#000000',
        node1Id: 1,
        node2Id: 2,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '54941b0c-b42e-44f3-bd50-377931c05464',
      sequenceNumber: 14,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 5,
        weight: 1,
        color: '#000000',
        node1Id: 2,
        node2Id: 0,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '2ea7c7a4-49af-4823-9ae1-9a3b47eb9fab',
      sequenceNumber: 15,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 6,
        weight: 1,
        color: '#000000',
        node1Id: 3,
        node2Id: 4,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'b4ff7b38-e4e9-4e3b-a103-2ea77ed3af78',
      sequenceNumber: 16,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 7,
        weight: 1,
        color: '#000000',
        node1Id: 4,
        node2Id: 5,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '62f264be-16bd-4fde-93b5-a1ab283de398',
      sequenceNumber: 17,
      type: 'ADD_CONNECTION' as ActionType,
      data: {
        id: 8,
        weight: 1,
        color: '#000000',
        node1Id: 5,
        node2Id: 3,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'b17a200e-d996-4a52-ba97-3ad7ed0351c5',
      sequenceNumber: 18,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 6,
        label: 'New Node',
        color: '#830202',
        x: -277,
        y: -138.5,
      },
    },
    {
      uuid: '9c969b91-3bc4-426c-81ca-276bc304df70',
      sequenceNumber: 19,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 7,
        label: 'New Node',
        color: '#d31717',
        x: 62,
        y: -259.5,
      },
    },
    {
      uuid: 'd8d122af-8978-43dc-9ad0-2257511459d7',
      sequenceNumber: 20,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 8,
        label: 'New Node',
        color: '#f48a8a',
        x: -79,
        y: 6.5,
      },
    },
    {
      uuid: 'c0d900c3-0695-44e6-bf78-ad9d53d1d676',
      sequenceNumber: 21,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 0,
        weight: 1,
        color: '#ed0707',
        node1Id: 6,
        node2Id: 7,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '424857d7-2c3f-491e-bc7a-d66a3e30685d',
      sequenceNumber: 22,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 1,
        weight: 1,
        color: '#cb4848',
        node1Id: 7,
        node2Id: 8,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '9d6f8ae4-6eaf-4dcc-8289-ba190dec93a7',
      sequenceNumber: 23,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 2,
        weight: 1,
        color: '#d28989',
        node1Id: 8,
        node2Id: 6,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'a3704e19-5788-4c0f-a1c5-1a6f621cd66f',
      sequenceNumber: 24,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 0,
        label: 'New Node',
        color: '#02830b',
        x: -203,
        y: -141.5,
      },
    },
    {
      uuid: '2094d66e-1edb-4084-8703-531a8ea1ad3a',
      sequenceNumber: 25,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 5,
        weight: 1,
        color: '#2b7d07',
        node1Id: 2,
        node2Id: 0,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'db5ca7e9-8bbc-4462-8975-db36f388e90a',
      sequenceNumber: 26,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 5,
        weight: 1,
        color: '#48a720',
        node1Id: 2,
        node2Id: 0,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'ad218539-f19f-46e1-a62c-385c56b6fad6',
      sequenceNumber: 27,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 1,
        label: 'New Node',
        color: '#038240',
        x: 233,
        y: -158.5,
      },
    },
    {
      uuid: 'be107ac6-fb4c-46ea-8a61-d0325cb6f0bf',
      sequenceNumber: 28,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 1,
        label: 'New Node',
        color: '#12ce6d',
        x: 233,
        y: -158.5,
      },
    },
    {
      uuid: 'c9a8154d-f812-473f-a370-3ea90797b5ec',
      sequenceNumber: 29,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 1,
        label: 'New Node',
        color: '#07bb5e',
        x: 233,
        y: -158.5,
      },
    },
    {
      uuid: 'fd85b16c-60f8-4cff-a612-a88ef0226ece',
      sequenceNumber: 30,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 1,
        label: 'New Node',
        color: '#08ba5e',
        x: 233,
        y: -158.5,
      },
    },
    {
      uuid: '36b1e18f-7c7b-4850-a687-13b534dc06fe',
      sequenceNumber: 31,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 3,
        weight: 1,
        color: '#66ff7f',
        node1Id: 0,
        node2Id: 1,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '2716d8dd-474a-4b07-b40a-495868d40419',
      sequenceNumber: 32,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 2,
        label: 'New Node',
        color: '#2eff1f',
        x: 33,
        y: 72.5,
      },
    },
    {
      uuid: '9545232c-9a44-41c2-84bc-71101b462b6f',
      sequenceNumber: 33,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 2,
        label: 'New Node',
        color: '#1a9d10',
        x: 33,
        y: 72.5,
      },
    },
    {
      uuid: '6f6b3649-1928-48c2-b163-98cbb3464c1d',
      sequenceNumber: 34,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 4,
        weight: 1,
        color: '#00c760',
        node1Id: 1,
        node2Id: 2,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'a92e6041-6851-4786-9d14-66bd082ac292',
      sequenceNumber: 35,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 4,
        label: 'New Node',
        color: '#000a57',
        x: 41,
        y: -92.5,
      },
    },
    {
      uuid: '050c70ad-559b-425c-8858-43d8420764be',
      sequenceNumber: 36,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 3,
        label: 'New Node',
        color: '#450099',
        x: -223,
        y: 78.5,
      },
    },
    {
      uuid: '44b68d63-3855-44f1-af29-fc63974f21e6',
      sequenceNumber: 37,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 5,
        label: 'New Node',
        color: '#020d64',
        x: 254,
        y: 202.5,
      },
    },
    {
      uuid: 'e6eb520e-b383-48d8-b465-5eb45cfbb3c9',
      sequenceNumber: 38,
      type: 'EDIT_NODE' as ActionType,
      data: {
        id: 5,
        label: 'New Node',
        color: '#18279a',
        x: 254,
        y: 202.5,
      },
    },
    {
      uuid: '0f80c3a1-2eab-47a1-93e7-3a820a280b83',
      sequenceNumber: 39,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 7,
        weight: 1,
        color: '#294cff',
        node1Id: 4,
        node2Id: 5,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '4e719129-6335-4977-bbde-bfeae4f1253a',
      sequenceNumber: 40,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 8,
        weight: 1,
        color: '#101e65',
        node1Id: 5,
        node2Id: 3,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: 'bd60303e-77d9-4ea0-8a1f-e49a716cf3b4',
      sequenceNumber: 41,
      type: 'EDIT_CONNECTION' as ActionType,
      data: {
        id: 6,
        weight: 1,
        color: '#060b51',
        node1Id: 3,
        node2Id: 4,
        directionality: 'UNDIRECTED',
      },
    },
    {
      uuid: '855d3a1b-2413-414d-8307-0bf994944b1f',
      sequenceNumber: 42,
      type: 'ADD_NODE' as ActionType,
      data: {
        id: 9,
        label: 'New Node',
        color: '#000000',
        x: 145.3877972095125,
        y: -419.3570727850134,
      },
    },
  ]

  const serverHistoryData: HistoryData = {
    uuid: 'cfb1f959-215c-4259-ad49-69de11adc085',
    nextActionSequenceNumber: 43,
    nextNodeId: 10,
    nextConnectionId: 9,
    actions: actionsMockData,
  }

  await new Promise((r) => setTimeout(r, 2000 + Math.random() * 8000))

  return serverHistoryData
}
