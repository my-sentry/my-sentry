import 'react-native';
import React from 'react';
import MySentry from '../../src/app.js';
import { createStore, applyMiddleware, compose } from 'redux';
import MasterReducer from '../../src/reducers/index.js';
import { Provider } from 'react-redux';
import {shallow} from 'enzyme';

const store = compose(
  applyMiddleware()
)(createStore)(MasterReducer);

describe('app.js', function() {
  let _wrapper;
  beforeEach(() => {
    _wrapper = shallow( <Provider store={store}><MySentry /></Provider>);
  });
  it('renders correctly', () => {
  });
  it('', () => {
  });
  it('', () => {
  });
  it('', () => {
  });

});



