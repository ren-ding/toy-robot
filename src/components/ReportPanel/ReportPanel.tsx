import React, { Component } from 'react';
import './styles/ReportPanel.css'

interface Props {
  results:Array<string>
}

export default class ReportPanel extends Component<Props> {
  constructor(props:Props) {
    super(props);
  }
  
  render() {
    return (
      <div id='report-panel-wrapper' className='report-panel-wrapper'>
        <span className='report-panel-label'>Results:</span>
        <div id='report-panel-results' className='report-panel-results'>
          {this.props.results.map((value,index)=> (<div key={Date.now()+index}>{value}</div>))}
        </div>
      </div>
    );
  }
}