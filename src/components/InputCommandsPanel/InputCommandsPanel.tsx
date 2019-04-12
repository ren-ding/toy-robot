import React, { Component } from 'react';

interface Props{
  onInputCommands:(event: {target: { value: string }}) => void
}

const InputCommands = ({
  onInputCommands
}:Props)=>(
  <textarea rows={20} onChange={onInputCommands}/>
);

export default class InputCommandsPanel extends Component<Props> {
  constructor(props:Props) {
    super(props);
  }

  render() {
    return (
      <div id='input-commands-panel-wrapper'>
        <span>Please input commands</span>
        <InputCommands 
          onInputCommands={this.props.onInputCommands}
        />
      </div>
    );
  }
}
