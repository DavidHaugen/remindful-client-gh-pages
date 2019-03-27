import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import AccountDeleted from '../components/AccountDeleted'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer'

describe('<AccountDeleted />', () => {
  it('Renders without crashing', () => {
      mount(<MemoryRouter><AccountDeleted/></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><AccountDeleted/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
});