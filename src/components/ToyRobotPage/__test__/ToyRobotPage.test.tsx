import React from 'react';
import ToyRobotPage from '../ToyRobotPage';
import InputCommandsPanel from '../../InputCommandsPanel/InputCommandsPanel';
import ReportPanel from '../../ReportPanel/ReportPanel';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {reducer,inputCommandsConverter} from '../../../businessdomain/robotCenter';
import deepFreeze from 'deep-freeze';

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
  
  
  const checkReport = (testCase:Array<any>) => {
    props = {reducer,inputCommandsConverter};
    const page = toyRobotPage();
    page.setState({inputCommands: testCase[0]});
    
    page.find('#apply-button').simulate('click');
    expect(page.find('ReportPanel').at(0).props().results).toEqual(testCase[1]);
  }

  describe('input commands and click apply button', () => {
    const testCases = [['PLACE 0,0,NORTH\nMOVE',[]],
                       ['PLACE 0,0,NORTH\nMOVEFORWARD\nREPORT',['0,0,NORTH']],
                       ['PLACE 0,0,NORTH\nMOVE\nREPORT',['0,1,NORTH']],
                       ['PLACE 0,0,NORTH\nLEFT\nREPORT',['0,0,WEST']],
                       ['PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT',['3,3,NORTH']],
                       ['PLACE 0,0,NORTH\nREPORT\nLEFT\nREPORT\nMOVE\nREPORT\nRIGHT\nREPORT\nMOVE\nREPORT\nRIGHT\nREPORT\nMOVE\nREPORT'
                        ,['0,0,NORTH','0,0,WEST','0,0,WEST','0,0,NORTH','0,1,NORTH','0,1,EAST','1,1,EAST',]],
                       ['PLACE 1,2,EAST\nREPORT\nMOVE\nREPORT\nMOVE\nREPORT\nLEFT\nREPORT\nMOVE\nREPORT'
                        ,['1,2,EAST','2,2,EAST','3,2,EAST','3,2,NORTH','3,3,NORTH']],
                       ['PLACE 0,0,NORTH\nLEFT\nMOVE\nREPORT\nRIGHT\nMOVEFORWARD\nREPORT\nMOVE\nREPORT\nRIGHT\nBACKWARD\nMOVE\nBACKWARD\nMOVE\nREPORT'
                        ,['0,0,WEST','0,0,NORTH','0,1,NORTH','2,1,EAST']]
                      ];
    deepFreeze(testCases);
    
    describe('start from a place, no report', () => {
      it('should return an empty array',()=>{
        checkReport(testCases[0]);
      });
    });

    describe('start from a place, report in the end', () => {
      describe('case0:invalid commands',()=>{
        it('should stay in the same place with same face direction',()=>{
          checkReport(testCases[1]);
        });
      });
      
      describe('case1:a move command',()=>{
        it('should move to the next position with the same face direction',()=>{
          checkReport(testCases[2]);
        });
      });
      
      describe('case2:on the map edge and facing outside',()=>{
        it('should not move, stay in the same place before move',()=>{
          checkReport(testCases[3]);
        });
      });
      
      describe('case3:multiple move and rotation comands',()=>{
        it('should move to the expected place and face to expected direction',()=>{
          checkReport(testCases[4]);
        });
      });
    });

    describe('start from a place, multiple reports', () => {
      describe('case4:include some move commands should not move',()=>{
        it('should move to the expected place and face to expected direction',()=>{
          checkReport(testCases[5]);
        });
      });

      describe('case5:has report command after every other commands',()=>{
        it('should report expected location and face direction after each commands',()=>{
          checkReport(testCases[6]);
        });
      });
    });

    describe('case6:multiple invalid commands, multiple place commands, multiple report commands, some move commands should not move', () => {
      it('should pass and your Jedi training is complete ==|----',()=>{
        checkReport(testCases[7]);
      });
    });
  });

});