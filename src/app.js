import React, {Component} from 'react';

import MasterReducer, {routerReducer} from './reducers/index.js';
import Dashboard from './components/Dashboard';
import NavigationDrawer from './components/NavigationDrawer';
import Feed from './components/Feed';
import Groups from './components/Groups';
import EventForm from './components/EventForm';
import EventView from './components/EventView';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {Router, Scene, Actions, ActionConst} from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

const store = compose(
  applyMiddleware(logger)
)(createStore)(MasterReducer);

//this could get moved to its own file. 
const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key='menu' component={NavigationDrawer} open={false}>
      <Scene key="dashboard" tabs={true} direction={'vertical'} component={Dashboard} title="Dashboard"/>
      <Scene key="groups" tabs={true} component={Groups} title="groups" />
      <Scene key="login" component={Login} />
      <Scene key="signup" component={Signup} />
      <Scene key="feed" tabs={true} component={Feed} title="feed"/>
        <Scene key="eventForm" tabs={true} component={EventForm} title="Create Event" />
        <Scene key="eventView" tabs={true} component={EventView} title="SomeEventName" />
    </Scene>
  </Scene>
);

export default class MySentry extends Component {
  render() {
    return (
      <Provider store = {store} >
        <RouterWithRedux createReducer={routerReducer} scenes={scenes} />
      </Provider>
    );
  }
}