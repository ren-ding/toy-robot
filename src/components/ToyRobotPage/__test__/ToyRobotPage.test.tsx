import React from 'react';
import ToyRobotPage from '../ToyRobotPage';
import InputCommandsPanel from '../../InputCommandsPanel/InputCommandsPanel';
import ReportPanel from '../../ReportPanel/ReportPanel';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('ToyRobotPage', () => {
  let props:any;

  describe('render ', () => {
    it('should render to match snapshot', () => {
      const tree = renderer.create(<ToyRobotPage {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render body container include InputPanel, ReportPanel and an apply button', () => {
      const page = mount(<ToyRobotPage {...props}/>);
      expect(page.find(InputCommandsPanel).length).toBe(1);
      expect(page.find('ApplyButton').length).toBe(1);
      expect(page.find(ReportPanel).length).toBe(1);
    });
  });
});