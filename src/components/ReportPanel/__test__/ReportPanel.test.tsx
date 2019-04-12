import React from 'react';
import ReportPanel from '../ReportPanel'
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

interface Props {
  results:string
}

describe('ReportPanel', ()=>{
  let reportPanel:any;
  let props: Props;

  beforeEach(()=>{
    props = {
      results:''
    };

    reportPanel = () =>shallow(<ReportPanel {...props} />, { lifecycleExperimental: true })
  });

  describe('initialize with an empty string results props', ()=>{
    it('should render a title span and an empty textarea', () => {
      expect(reportPanel().html()).toContain('Results:');
      expect(reportPanel().find('#report-panel-results').length).toBe(1);
      expect(reportPanel().find('#report-panel-results').text()).toBe('');
    });
  });
  
  describe('initialize with a result string props', ()=>{
    it('should render a title span and the textarea with the value of the string', () => {
      const resultString = '3,3,NORTH';
      props.results = resultString;

      expect(reportPanel().html()).toContain('Results:');
      expect(reportPanel().find('#report-panel-results').length).toBe(1);
      expect(reportPanel().find('#report-panel-results').text()).toBe(resultString);      
    });
  });
  
});