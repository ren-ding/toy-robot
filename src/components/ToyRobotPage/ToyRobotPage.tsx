import React, { Component } from 'react';
import InputCommandsPanel from '../InputCommandsPanel/InputCommandsPanel'
import ReportPanel from '../ReportPanel/ReportPanel'
import './styles/ToyRobotPage.css'

interface Props {
  reducer:(state:any, action:any) => any
}

interface State {
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


export default class ToyRobotPage extends Component<Props,State> {
  constructor(props:Props) {
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


  //TODO: add logic to handle with REPORT command
  onApplyButtonClick = () => {
    const commands = this.inputCommandsConverter(this.state.inputCommands);

    const reducer = (accumulator:any, currentValue:any) => {
      //construct state and action
      let action;
      
      if(currentValue.startsWith('PLACE')){
        const info = currentValue.split(' ')[1].split(',');
        action = {type:'PLACE', position:[parseInt(info[0]),parseInt(info[1])], faceDirection:info[2]};
      }

      if(currentValue === 'MOVE') action = {type:'MOVE'}
      if(currentValue === 'LEFT') action = {type:'LEFT'}
      if(currentValue === 'RIGHT') action = {type:'RIGHT'}
      
      return this.props.reducer((accumulator.position&&accumulator.faceDirection)?accumulator:{}, action);
    };

    const result = commands.reduce(reducer, {});
    
    this.setState({results:[result.position[0] +','+ result.position[1] +','+ result.faceDirection]});
  };
  
  inputCommandsConverter = (commandsString:string) => commandsString.split('\n');
}
