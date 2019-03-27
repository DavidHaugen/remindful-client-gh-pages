import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import GoalDetail from '../components/GoalDetail'
import remindfulApiService from '../services/remindful-api-service'
import {shallow} from 'enzyme';
import GoalsContext from '../context/GoalsContext';
import renderer from 'react-test-renderer'

describe('<GoalDetail />', () => {
  it('Renders without crashing', () => {
      shallow(<MemoryRouter><GoalDetail/></MemoryRouter>);
  })
  it('renders the UI as expected', () => {
    const state ={ goals: [{complete: false, id: 1, name: 'test'}, {complete: false, id: 2, name: 'test2'}],
    loadingTrue: () => {},
    loadingFalse: () => {}
  }
    const tree = renderer
      .create(<MemoryRouter><GoalsContext.Provider value={state}><GoalDetail match={
        {params: {goalId: 1}}
      }/></GoalsContext.Provider></MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});