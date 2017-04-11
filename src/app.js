import React from 'react';
import MasterReducer from './reducers/index';
import PushController from './containers/PushController';

import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

// let middleware = [thunk, logger];
const store = compose(
  applyMiddleware(logger)
)(createStore)(MasterReducer);

export default function MySentry () {
  return (
    <Provider store = {store} >
      <PushController />
    </Provider>
  );
}
