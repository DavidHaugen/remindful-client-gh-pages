import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import Goal from '../components/Goal'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer'
import GoalsContext from '../context/GoalsContext';

describe('<Goal />', () => {
  it('Renders without crashing', () => {
      shallow(<MemoryRouter><Goal/></MemoryRouter>);
  })
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Goal goal={{complete: false, id: 1, name: 'test'}}/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});