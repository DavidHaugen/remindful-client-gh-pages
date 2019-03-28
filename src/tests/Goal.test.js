import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import Goal from '../components/Goal'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer'

describe('<Goal />', () => {
  it('Renders without crashing', () => {
      mount(<MemoryRouter><Goal goal={{complete: false, id: 1, name: 'test'}}/></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Goal goal={{complete: false, id: 1, name: 'test'}}/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});