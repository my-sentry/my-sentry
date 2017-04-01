import React, {Component} from 'react';

import MyReducer from './reducers/index.js';
import Dashboard from './components/Dashboard';
import Feed from './components/Feed';
import Groups from './components/Groups';

import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {Router, Scene, Actions, NavBar, Modal, Reducer } from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);
let store = createStore(
  MyReducer,
  applyMiddleware(logger)
);

// const createReducer = (params) => {
//   // initial state
//   const { initialState , scenes} = params;
//   const routerInitialState = {...initialState, scenes};
//   return (state, action) => {
//     if(action.type === 'RootContainerInitialAction') {
//       action.initialState = routerInitialState;
//     }
//     store.dispatch(action);
//     return store.getState().router;
//   };
// };



const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
      <Scene key="root" hideNavBar={true}>
          <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
          <Scene key="feed" component={Feed} title="feed" />
          <Scene key="groups" component={Groups} title="groups"/>
      </Scene>
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