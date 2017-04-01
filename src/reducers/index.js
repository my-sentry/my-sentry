import {combineReducers} from 'redux';
import routes from './routes';

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
  routes,
});