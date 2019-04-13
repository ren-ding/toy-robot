import React from 'react';
import ToyRobotPage from '../ToyRobotPage';
import InputCommandsPanel from '../../InputCommandsPanel/InputCommandsPanel';
import ReportPanel from '../../ReportPanel/ReportPanel';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {reducer} from '../../../businessdomain/robotCenter';


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
  
  describe('input commands and click apply button', () => {
    props = {reducer};
    it('should report 0,1,NORTH', () => {
      
      const page = toyRobotPage();
      const inputCommands = 'PLACE 0,0,NORTH\nMOVE';
      page.setState({inputCommands: inputCommands});
      
      const results = ['0,1,NORTH'];
      page.find('#apply-button').simulate('click');
      expect(page.find('ReportPanel').at(0).props().results).toEqual(results);
    });
    
    it('should report 0,0,WEST', () => {
      const page = toyRobotPage();
      const inputCommands = 'PLACE 0,0,NORTH\nLEFT';
      page.setState({inputCommands: inputCommands});
      
      const results = ['0,0,WEST'];
      page.find('#apply-button').simulate('click');
      expect(page.find('ReportPanel').at(0).props().results).toEqual(results);
    });

    it('should report 3,3,NORTH', () => {
      const page = toyRobotPage();
      const inputCommands = 'PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE';
      page.setState({inputCommands: inputCommands});
      
      const results = ['3,3,NORTH'];
      page.find('#apply-button').simulate('click');
      expect(page.find('ReportPanel').at(0).props().results).toEqual(results);
    });
  })
  
});