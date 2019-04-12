import React, { Component } from 'react';
import InputCommandsPanel from '../InputCommandsPanel/InputCommandsPanel'

interface Props {}

interface State {
  inputCommands:string
}

interface ContainerProps {
  onInputCommands:(event: {target: { value: string }}) => void
}

const Header = () => (
  <div>Toy-Robot Simulator</div>
);

const Container = ({
  onInputCommands,
}:ContainerProps) =>(
  <div>
  <InputCommandsPanel 
    onInputCommands = {onInputCommands}
  />
  </div>
);


export default class ToyRobotPage extends Component<Props,State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      inputCommands: ''
    };
  }

  render() {
    return (
      <div id='toy-robot-page-wrapper'>
        <Header />
        <Container 
          onInputCommands = {this.onInputCommands}
        />
      </div>
    );
  }

  onInputCommands = (event: { target: { value: string } }) => this.setState({inputCommands: event.target.value});
}
