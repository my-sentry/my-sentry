import 'react-native';
import React from 'react';
import Header from '../../src/components/Header';
import { createStore, applyMiddleware, compose } from 'redux';
import MasterReducer from '../../src/reducers/index.js';
import { Provider } from 'react-redux';
import {shallow} from 'enzyme';

const store = compose(
  applyMiddleware()
)(createStore)(MasterReducer);

describe('Header', function() {
  let _wrapper;
  beforeEach(() => {
    _wrapper = shallow( <Provider store={store}><Header /></Provider>);
  });
  it('renders correctly', () => {
  });
  it('renders scene name', () => {
  });
  it('', () => {
  });
  it('', () => {
  });

});



