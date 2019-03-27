import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import SignUp from '../components/SignUp'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer'

describe('<SignUp />', () => {
  it('Renders without crashing', () => {
      mount(<MemoryRouter><SignUp/></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><SignUp/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});