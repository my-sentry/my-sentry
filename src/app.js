import React, {Component} from 'react';

import MasterReducer, {routerReducer} from './reducers/index.js';
import Dashboard from './containers/Dashboard';
import NavigationDrawer from './components/NavigationDrawer';
import Feed from './containers/Feed';
import Groups from './containers/Groups';
import GroupForm from './components/GroupForm';
import GroupView from './components/GroupView';
import EventForm from './components/EventForm';
import EventView from './components/EventView';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Loading from './components/Loading';
import Datepicker from './components/Datepicker';

import { logger } from './reducers/middleware';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

import { Text, View, AsyncStorage } from 'react-native';
import {Router, Modal, Scene, Actions, ActionConst, Switch, } from 'react-native-router-flux';


// let middleware = [thunk, logger];
const store = compose(
  applyMiddleware(logger)
)(createStore)(MasterReducer);

const RouterWithRedux = connect()(Router);
var auth;
AsyncStorage.getItem('AUTHENTICATION').then(res=> {console.log("RES", res === 'null')});

console.log(auth);
//this could get moved to its own file. 
const scenes = Actions.create(
  <Scene key='modal' component={Modal} >
  <Scene key='root' tabs={true} hideNavBar >
    <Scene key='menu' hideNavBar component={NavigationDrawer} open={false}>
      <Scene key='dashboard' hideNavBar tabs={true} component={Dashboard} />
      <Scene key='groups' tabs={true} component={Groups} />
      <Scene key='feed' tabs={true} component={Feed}/>
      <Scene key='groupForm' tabs={true} component={GroupForm} />
      <Scene key='eventForm' tabs={true} component={EventForm} />
      <Scene key='eventView' tabs={true} component={EventView} />
      <Scene key='groupView' tabs={true} component={GroupView} />
      <Scene key='signup' component={Signup} />
      <Scene key="loading" initial={true} component={Loading} />
      <Scene key='login' tabs={true} component={Login} />
    </Scene>
  </Scene>
  </Scene>
);

export default function MySentry () {
  return (
    <Provider store = {store} >
      <RouterWithRedux createReducer={routerReducer} scenes={scenes} />
    </Provider>
  );
}