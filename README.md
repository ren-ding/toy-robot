Toy Robot Simulator
===================

Description
-----------
- This is a React single page application created by create-react-app --typescript

- The application is a simulation of a toy robot moving on a square tabletop of dimensions 5 units x 5 units.

## Installation

### `npm install`
Install node_modules

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Excution

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

### `npm test`
Launches the test runner in the interactive watch mode.<br>

## Project structure
.<br>
<pre>
|--public<br>
|   |---index.html<br>
|--src<br>
|   |---businessdomain<br>
|            |---__test__<br>
|            |      |---robotCenter.test.tsx<br>
|            |---robotCenter.tsx<br>
|   |---components<br>
|   |        |---ToyRobotPage<br>
|   |        |    |---ToyRobotPage.tsx<br>
|   |        |    |---__test__<br>
|   |        |    |      |---ToyRobotPage.test.tsx<br>
|   |        |    |---styles<br>
|   |        |    |      |---ToyRobotPage.css<br>
|   |        |    |---index.tsx<br>
|   |        |    |---integration-tests.test.tsx<br>
|   |        |---InputCommandsPanel<br>
|   |        |    |---InputCommandsPanel.tsx<br>
|   |        |    |---__test__<br>
|   |        |    |      |---InputCommandsPanel.test.tsx<br>
|   |        |    |---styles<br>
|   |        |    |      |---InputCommandsPanel.css<br>
|   |        |    |---index.tsx<br>
|   |        |---ReportPanel<br>
|   |             |---ReportPanel.tsx<br>
|   |             |---__test__<br>
|   |             |      |---ReportPanel.test.tsx<br>
|   |             |---styles<br>
|   |             |      |---ReportPanel.css<br>
|   |             |---index.tsx<br>
|   |---index.tsx<br>
|--index.tsx<br>
|--package.json<br>
|--...<br>
</pre>

| First Level   | Second level        |  Description                        |
| ------------- | ------------------- | ------------------------------------|
| public        | index.html          |  html view                          |
| src           | businessdomain      |  business domain logic              |
|               | components          |  React components                   |
|               | index.tsx           |  ReactDom render root component     |


### components folder include three components

| Component         |                   |  Description                                           |
| ----------------- | ----------------- | -------------------------------------------------------|
| ToyRobotPage      | Parent component  |  contains the other two components and an apply button |
| InputCommandsPanel| Child  component  |  a stateless component                                 |
| ReportPanel       | Child  component  |  a stateless component                                 |

Each component has it's unit test folder __test__ , styles folders, it also contains a index.tsx to for exporting components if only this component need to be used.<br>
ToyRobotPage has an integration-tests.test.tsx contains all integration tests<br>

### businessdomain include a robotCenter.tsx
robotCenter has two functions<br>
| robotCenter           |  Description                                           |
| --------------------- | -------------------------------------------------------|
| reducer               |  take a state and an action return a new state         |
| inputCommandsConverter|  convert commands string into an array of actions      |

### state
| variable name     |  type                                                           |
| ----------------- | --------------------------------------------------------------- |
| position          |  an array of two number stand for xcoordinate and y coordinate  |
| faceDirection     |  'NORTH' or 'EAST' or 'SOUTH' or'WEST'                          |
| reportHistory     |  nullable string array record the report history                |

### action
{type:'PLACE', position:Array<number>, faceDirection:string }<br>
{type:'MOVE'}<br>
{type:'LEFT'}<br>
{type:'RIGHT'}<br>
{type:'REPORT'}<br>