import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ToyRobotPage', () => {
  let app:any;

  beforeEach(()=>{
    app = () =>shallow(<App />)
  });

  it('should render header title', () => {
    expect(app().html()).toContain('Toy-Robot Simulator');
  });

});