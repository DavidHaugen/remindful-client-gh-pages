import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import LogIn from '../components/LogIn'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer'

describe('<LogIn />', () => {
  it('Renders without crashing', () => {
      mount(<MemoryRouter><LogIn/></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><LogIn/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});