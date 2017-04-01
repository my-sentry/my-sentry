import React, {Component} from 'react';

import routes from './reducers/routes.js';
import Dashboard from './components/Dashboard';
import Feed from './components/Feed';
import Groups from './components/Groups';
import EventForm from './components/EventForm';
import EventView from './components/EventView';


import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {Router, Scene, Actions, NavBar, Modal, Reducer, ActionConst} from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);
const store = compose(
  applyMiddleware(logger)
)(createStore)(routes);


const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
//    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
      <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
      <Scene key="feed" component={Feed} title="feed"/>
        <Scene key="eventForm" component={EventForm} title="eventForm" type={ActionConst.REPLACE}/>
        <Scene key="eventView" component={EventView} title="eventView"/>


      <Scene key="groups" component={Groups} title="groups" type={ActionConst.RESET} />
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