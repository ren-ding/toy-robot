import React, { Component } from 'react';
import InputCommandsPanel from '../InputCommandsPanel/InputCommandsPanel';
import ReportPanel from '../ReportPanel/ReportPanel';
import {State, Action} from '../../businessdomain/robotCenter';
import './styles/ToyRobotPage.css';

interface ToyRobotPageProps {
  reducer:(state:State, action:Action) => State
  inputCommandsConverter: (commandsString:string) => Array<Action>
}

interface ToyRobotPageState {
  inputCommands:string
  results:Array<string>
}

interface ApplyButtonProps {
  onClick:() => void
}

interface ContainerProps {
  results:Array<string>,
  onInputCommands:(event: {target: { value: string }}) => void,
  onApplyButtonClick:() => void
}

const Header = () => (
  <div id='toy-robot-page-header' className='toy-robot-page-header'>Toy-Robot Simulator</div>
);

const ApplyButton = ({
  onClick
}:ApplyButtonProps) => (
  <button type="button" id='apply-button' className='apply-button' onClick={onClick}>apply</button>
);

const Container = ({
  results,
  onInputCommands,
  onApplyButtonClick
}:ContainerProps) =>(
  <div id='toy-robot-page-container' className='toy-robot-page-container'>
  <InputCommandsPanel 
    onInputCommands = {onInputCommands}
  />
  <ApplyButton
    onClick={onApplyButtonClick}
  />
  <ReportPanel results={results}/>
  </div>
);


export default class ToyRobotPage extends Component<ToyRobotPageProps,ToyRobotPageState> {
  constructor(props:ToyRobotPageProps) {
    super(props);
    this.state = {
      inputCommands: '',
      results:[]
    };
  }

  render() {
    return (
      <div id='toy-robot-page-wrapper' className='toy-robot-page-wrapper'>
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

  onApplyButtonClick = () => {
    const commands = this.props.inputCommandsConverter(this.state.inputCommands); 
    const finalState = commands.reduce(this.props.reducer,{robot:{ position: {x:0,y:0},faceDirection:'NORTH'}, map:{width:5, height:5},reportHistory:[]});
    this.setState({results:finalState.reportHistory});
  };
}
