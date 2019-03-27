import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import ViewGoals from '../components/ViewGoals'
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import GoalsContext from '../context/GoalsContext';

describe('<ViewGoals />', () => {
  it('Renders without crashing', () => {
    mount(<MemoryRouter><ViewGoals/></MemoryRouter>);
  });
  it('renders the UI as expected when no goals are present', () => {
    const tree = renderer
      .create(<MemoryRouter><ViewGoals/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
  it('renders the UI as expected when no goals are present', () => {
    const tree = renderer
      .create(<MemoryRouter><ViewGoals/></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
  it('renders the UI as expected when there are goals present', () => {
    const state ={ goals: [{complete: false, id: 1, name: 'test'}, {complete: false, id: 2, name: 'test2'}]}
    const tree = renderer
      .create(<MemoryRouter><GoalsContext.Provider value={state}
        ><ViewGoals/></GoalsContext.Provider></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });

  it('Renders a list of goals with the correct number of goals', () => {
    const state ={ goals: [{complete: false, id: 1, name: 'test'}, {complete: false, id: 2, name: 'test2'}]}
    const wrapper = mount(<MemoryRouter><GoalsContext.Provider value={state}
    ><ViewGoals/></GoalsContext.Provider></MemoryRouter>);
    const items = wrapper.find('.goal');
    expect(items.length).toEqual(2);
    });

});