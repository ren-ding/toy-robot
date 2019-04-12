import React from 'react';
import ReportPanel from '../ReportPanel'
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

interface Props {
  results:Array<string>
}

describe('ReportPanel', ()=>{
  let reportPanel:any;
  let props: Props;

  beforeEach(()=>{
    props = {
      results:[]
    };

    reportPanel = () =>shallow(<ReportPanel {...props} />, { lifecycleExperimental: true })
  });

  describe('initialize with an empty string results props', ()=>{
    it('should render a title span and an empty textarea', () => {
      const panel = reportPanel();
      expect(panel.html()).toContain('Results:');
      expect(panel.find('#report-panel-results').length).toBe(1);
      expect(panel.find('#report-panel-results').text()).toBe('');
    });
  });
  
  describe('initialize with results', ()=>{
    it('should render a title span and the textarea with results', () => {
      const results = ['3,3,NORTH','3,4,NORTH','3,4,WEST'];
      const textResults = results.reduce((accumulator,currentValue)=> accumulator + currentValue);
      props.results = results;
      const panel = reportPanel();
      expect(panel.html()).toContain('Results:');
      expect(panel.find('#report-panel-results').length).toBe(1);
      expect(reportPanel().find('#report-panel-results').text()).toBe(textResults);      
    });
  });
  
});