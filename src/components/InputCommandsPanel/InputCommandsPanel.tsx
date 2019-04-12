import React, { Component } from 'react';
import './styles/InputCommandsPanel.css'

interface Props{
  onInputCommands:(event: {target: { value: string }}) => void
}

const InputCommands = ({
  onInputCommands
}:Props)=>(
  <textarea rows={20} className='input-commands-textarea' onChange={onInputCommands}/>
);

export default class InputCommandsPanel extends Component<Props> {
  constructor(props:Props) {
    super(props);
  }

  render() {
    return (
      <div id='input-commands-panel-wrapper' className='input-commands-panel-wrapper'>
        <span id='input-label' className='input-label'>Please input commands</span>
        <InputCommands 
          onInputCommands={this.props.onInputCommands}
        />
      </div>
    );
  }
}
