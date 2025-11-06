import rootReducer from '../../store/reducers'; // adjust
import { createStore } from 'redux';

describe('redux reducers', () => {
  it('returns initial state', () => {
    const store = createStore(rootReducer);
    const state = store.getState();
    expect(state).toBeDefined();
  });

  // Example: dispatch a login success action
  it('handles LOGIN_SUCCESS', () => {
    const store = createStore(rootReducer);
    store.dispatch({ type: 'LOGIN_SUCCESS', payload: { id: '1', name: 'A' }});
    const state = store.getState();
    expect(state.auth.user).toBeDefined();
  });
});
