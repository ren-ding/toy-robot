Toy Robot Simulator
===================

Description
-----------
- This is a React single page application created by create-react-app --typescript

- The application is a simulation of a toy robot moving on a square tabletop,
  of dimensions 5 units x 5 units.

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
|--public<br>
|   |---index.html<br>
|--src<br>
|   |---components<br>
|   |        |---App<br>
|   |             |---App.tsx<br>
|   |             |---__test__<br>
|   |             |      |---App.test.tsx<br>
|   |             |---styles<br>
|   |             |      |---App.css<br>
|   |             |---index.tsx<br>
|   |---index.tsx<br>
|--package.json<br>
|--...<br>

public folder include html views<br>
src folder include components folder which contains all components<br>
    each component has it's own folder with __test__ folder, styles folder inside and React component file as well, it also contains a index.tsx to for exporting components if only this component need to be used.<br>
