import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import Account from '../components/Account'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Account />', () => {
  it('Renders without crashing', () => {
      mount(<MemoryRouter><Account/></MemoryRouter>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><Account/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
});

