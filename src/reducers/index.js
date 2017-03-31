import { combineReducers } from 'redux';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const Reducer = createReducer([], {
  // some reduced func
});

import {combineReducers} from 'redux';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const Reducer = createReducer([], {
  // some reduced func
});

export default Reducer;