import 'react-native';
import React from 'react';
import Groups from '../../src/components/Groups';
import { createStore, applyMiddleware, compose } from 'redux';
import MasterReducer from '../../src/reducers/index.js';
import { Provider } from 'react-redux';
import {shallow} from 'enzyme';

const store = compose(
  applyMiddleware()
)(createStore)(MasterReducer);

describe('users', function() {
  let _wrapper;
  beforeEach(() => {
    _wrapper = shallow( <Provider store={store}><Groups /></Provider>);
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



