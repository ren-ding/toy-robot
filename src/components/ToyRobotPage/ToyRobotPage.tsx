import React, { Component } from 'react';
import InputCommandsPanel from '../InputCommandsPanel/InputCommandsPanel'
import ReportPanel from '../ReportPanel/ReportPanel'

interface Props {}

interface State {
  inputCommands:string
  results:string
}

interface ApplyButtonProps {
  onClick:() => void
}

interface ContainerProps {
  results:string,
  onInputCommands:(event: {target: { value: string }}) => void,
  onApplyButtonClick:() => void
}

const Header = () => (
  <div>Toy-Robot Simulator</div>
);

const ApplyButton = ({
  onClick
}:ApplyButtonProps) => (
  <button type="button" id='apply-button' onClick={onClick}>apply</button>
);

const Container = ({
  results,
  onInputCommands,
  onApplyButtonClick
}:ContainerProps) =>(
  <div>
  <InputCommandsPanel 
    onInputCommands = {onInputCommands}
  />
  <ApplyButton
    onClick={onApplyButtonClick}
  />
  <ReportPanel results={results}/>
  </div>
);


export default class ToyRobotPage extends Component<Props,State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      inputCommands: '',
      results:''
    };
  }

  render() {
    return (
      <div id='toy-robot-page-wrapper'>
        <Header />
        <Container 
          results = {this.state.results}
          onInputCommands = {this.onInputCommands}
          onApplyButtonClick = {this.onApplyButtonClick}
        />
      </div>
    );
  }

  onInputCommands = (event: { target: { value: string } }) => this.setState({inputCommands: event.target.value});

  //TODO:call the core algorithm to generate the report
  onApplyButtonClick = () => this.setState({results: this.state.inputCommands});
  
}
