import React from 'react';
import ToyRobotPage from '../ToyRobotPage';
import InputCommandsPanel from '../../InputCommandsPanel/InputCommandsPanel';
import ReportPanel from '../../ReportPanel/ReportPanel';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ToyRobotPage', () => {
  let toyRobotPage:any;
  let props:any;

  beforeEach(()=>{
    toyRobotPage = () => mount(<ToyRobotPage {...props}/>)
  });

  describe('open the page ', () => {
    it('should render header title', () => {
      const page = toyRobotPage();
      expect(page.html()).toContain('Toy-Robot Simulator');
      expect(page.find('Header').length).toBe(1);
    });

    it('should render body container include InputPanel, ReportPanel and an apply button', () => {
      const page = toyRobotPage();
      expect(page.find('Container').length).toBe(1);
      expect(page.find(InputCommandsPanel).length).toBe(1);
      expect(page.find('ApplyButton').length).toBe(1);
      expect(page.find(ReportPanel).length).toBe(1);
    });
  });
});