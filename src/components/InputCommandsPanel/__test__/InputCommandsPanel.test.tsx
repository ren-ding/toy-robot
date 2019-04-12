import React from 'react';
import InputCommandsPanel from '../InputCommandsPanel'
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('InputPanel', ()=>{
  let inputCommandsPanel:any;
  let props:any;

  beforeEach(()=>{
    props = {
      onInputCommands: () => {}
    };
    inputCommandsPanel = () => mount(<InputCommandsPanel {...props} />)
  });

  describe('When initialized the component', ()=>{
    it('should render a span and an inputcommand textarea', () => {
      const panel = inputCommandsPanel();
      expect(panel.html()).toContain('Please input commands');
      expect(panel.find('InputCommands').length).toBe(1);
    })
  });
  
  describe('User typed in command textarea', ()=>{
    it('should call onInputCommands callback', () => {
      const mockCallback = jest.fn();
      props.onInputCommands = mockCallback;
      
      inputCommandsPanel().find('InputCommands').at(0).simulate('change');

      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledTimes(1);
    })
  });
  
});