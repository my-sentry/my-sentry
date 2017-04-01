import React, {Component} from 'react';

import routes from './reducers/routes.js';
import Dashboard from './components/Dashboard';
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
import {Router, Scene, Actions, NavBar, Modal, Reducer, ActionConst} from 'react-native-router-flux';


const mapStateToProps = state => { 
  return state;
};
const store = compose(
  applyMiddleware(logger)
)(createStore)(routes);

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
      <Scene key="dashboard" init direction={'horizontal'} component={Dashboard} title="Dashboard" type={ActionConst.REPLACE} />
      <Scene key="login" component={Login} type={ActionConst.REPLACE} />
      <Scene key="signup" component={Signup} type={ActionConst.REPLACE} />
      <Scene key="feed" component={Feed} title="feed"/>
        <Scene key="eventForm" component={EventForm} title="Create Event" type={ActionConst.REPLACE} />
        <Scene key="eventView" component={EventView} title="SomeEventName" type={ActionConst.REPLACE}/>
      <Scene key="groups" component={Groups} title="groups" type={ActionConst.REPLACE} />
  </Scene>
);

const RouterWithRedux = connect(mapStateToProps)(Router);

export default class MySentry extends Component {
  render() {
    return (
      <Provider store = {store} >
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}