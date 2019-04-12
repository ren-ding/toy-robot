import React from 'react';
import ToyRobotPage from '../ToyRobotPage';
import InputCommandsPanel from '../../InputCommandsPanel/InputCommandsPanel';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ToyRobotPage', () => {
  let toyRobotPage:any;

  beforeEach(()=>{
    toyRobotPage = () => mount(<ToyRobotPage />)
  });

  describe('open the page ', () => {
    it('should render header title', () => {
      expect(toyRobotPage().html()).toContain('Toy-Robot Simulator');
      expect(toyRobotPage().find('Header').length).toBe(1);
    });

    it('should render body container include an InputPanel', () => {
      expect(toyRobotPage().find('Container').length).toBe(1);
      expect(toyRobotPage().find(InputCommandsPanel).length).toBe(1);
    });
  });  
});