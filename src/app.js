import React, {Component} from 'react';

import Reducer from './reducers/index.js';
import Dashboard from './components/Dashboard.js';

import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Router, Scene, Actions } from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

let store = createStore(
  Reducer,
  applyMiddleware(logger)
);

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="dashboard" component={Dashboard} hideNavBar={true} />
    </Scene>
);

export default class MySentry extends Component {
  render() {
    return (
      <Provider store = {store} >
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}