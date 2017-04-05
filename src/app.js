import React, {Component} from 'react';

import MasterReducer, {routerReducer} from './reducers/index.js';
import Dashboard from './components/Dashboard';
import NavigationDrawer from './components/NavigationDrawer';
import Feed from './containers/Feed';
import Groups from './containers/Groups';
import GroupForm from './components/GroupForm';
import GroupView from './components/GroupView';
import EventForm from './components/EventForm';
import EventView from './components/EventView';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {Router, Scene, Actions, ActionConst, Switch} from 'react-native-router-flux';

// 
// let middleware = [thunk, logger];
const store = compose(
  applyMiddleware(logger)
)(createStore)(MasterReducer);

const RouterWithRedux = connect()(Router);


//this could get moved to its own file. 
const scenes = Actions.create(
  <Scene key='root' tabs={true} hideNavBar>
    <Scene key='menu' hideNavBar component={NavigationDrawer} open={false}>
      <Scene key='dashboard' hideNavBar tabs={true} component={Dashboard} />
      <Scene key='groups' tabs={true} component={Groups} />
      <Scene key='feed' tabs={true} component={Feed}/>
      <Scene key='groupForm' tabs={true} component={GroupForm} />
      <Scene key='eventForm' tabs={true} component={EventForm} />
      <Scene key='eventView' tabs={true} component={EventView} />
      <Scene key='groupView' tabs={true} component={GroupView} />

      <Scene key='signup' component={Signup} />
      <Scene key='login'tabs={true} component={Login} />
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