import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import AddGoal from '../components/AddGoal'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer'

describe('<AddGoal />', () => {
  it('Renders without crashing', () => {
      mount(<MemoryRouter><AddGoal/></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><AddGoal/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
});