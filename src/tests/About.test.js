import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import About from '../components/About'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<About />', () => {
  it('Renders without crashing', () => {
      shallow(<About/>);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<About/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
});