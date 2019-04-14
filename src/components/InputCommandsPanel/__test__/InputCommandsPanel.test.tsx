import React from 'react';
import InputCommandsPanel from '../InputCommandsPanel'
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
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

  describe('render', ()=>{
    it('should render to match with snapshot', () => {
      const tree = renderer.create(<InputCommandsPanel {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
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