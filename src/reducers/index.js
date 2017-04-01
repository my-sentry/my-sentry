import {combineReducers} from 'redux';
import { Reducer } from 'react-native-router-flux';

// needs to fake params to pass sanity checks
const routerReducer = Reducer({initialState: {key: true}, scenes: true});

function router(state = null, action) {
  if (action.type === 'RootContainerInitialAction') {
    return action.initialState;
  } else {
    return routerReducer(state, action);
  }
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const MyReducer = createReducer([], {
  // some reduced func
});

export default combineReducers({
  MyReducer,
  router,
});