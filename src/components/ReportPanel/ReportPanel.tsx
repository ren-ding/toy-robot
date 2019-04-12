import React, { Component } from 'react';

interface Props {
  results:string
}

export default class ReportPanel extends Component<Props> {
  constructor(props:Props) {
    super(props);
  }
  
  render() {
    return (
      <div id='report-panel-wrapper'>
        <span>Results:</span>
        <div id='report-panel-results'>{this.props.results}</div>
      </div>
    );
  }
}