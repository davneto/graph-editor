# graph-editor

A simple web-based graph editor that allows users to create and manipulate graphs visually

## Project Setup and Run

Clone the project and install the needed packages by running:

```sh
npm install
```

Dev mode won't allow Sync features to work, but for further development and testing other features we can go with:

```sh
npm run dev
```

To test the sync behavior, and running the app in offline mode using service-workers, we need to build, then preview:

```sh
npm run build

// *wait for build*

npm run preview
```

## Instructions

The app is full screen with a canvas board where we can create and edit our graph.

On the top there's an indication whether we're online or offline (more on that later). To the left we have 3 buttons, and to the left
"node" and "connection" properties will show up when one is selected.

### Navigation

Using the pointer button it's possible to navigate the board doing a click and drag motion

### Creating nodes

Using the "Add Node" button, we can click on any location on the board and a node will be created. You can create many nodes in a row by just clicking in more places and until another tool is selected.

### Creating connections

Select the "Add Connection" tool. Press left mouse button on a node and drag. A dashed line representing the connection we're about to create will appear. Drag it and release the mouse button over another node of your choice. A connection is now created. We can keep creating connections in a row until we select a different tool.

### Properties

Using the pointer tool, we can click on nodes and connections to have them selected. Selecting nodes and connections will open two display windows on the right side of the screen where their properties will be shown.

#### Editing properties

To edit properties just use the respective inputs associated with each property, this will automatically update their values for that node/connection.

### Saving changes locally

Each change is saved in the local storage, we can safely refresh the page and our graph will still be there.

### Online and Offline

When we go offline and the app will keep on running and storing modifications to the graph.

We can simulate going offline using the Throttling feature in the network tab, for example.

After going offline, and indication will show below the page title, saying "offline" in red

If we go back online, the indication will turn green again.

#### Sync behavior

When we go offline and back online, the app is configured to simulate a sync with a (not yet existing) remote server. The sync behavior will assume the following strategy:

- send complete sequence of steps to backend, backend decides what will be final information, backend sends remote state.

This strategy is naive and only for demontration purposes. Also, all the endpoint requests are simply being simualted, so in practice we'll receive a mocked graph and app state and it will overwrite our current graph and state.
