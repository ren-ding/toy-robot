import React, { Component } from 'react';
import './styles/ReportPanel.css'

interface Props {
  results:string
}

export default class ReportPanel extends Component<Props> {
  constructor(props:Props) {
    super(props);
  }
  
  render() {
    return (
      <div id='report-panel-wrapper' className='report-panel-wrapper'>
        <span className='report-panel-label'>Results:</span>
        <div id='report-panel-results' className='report-panel-results'>{this.props.results}</div>
      </div>
    );
  }
}