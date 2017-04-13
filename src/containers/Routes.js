import React, {Component} from 'react';
import {routerReducer} from '../reducers/index.js';
import Dashboard from './Dashboard';
import NavigationDrawer from '../components/NavigationDrawer';
import Feed from './Feed';
import Groups from './Groups';
import GroupForm from '../components/GroupForm';
import GroupView from '../components/GroupView';
import EventForm from '../components/EventForm';
import EventView from '../components/EventView';
import LocationSearch from '../components/LocationSearch';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import Loading from '../components/Loading';
import Datepicker from '../components/Datepicker';
import SignupModal from '../components/modals/Signup';
import Logout from '../components/modals/Logout';
import Delete from '../components/modals/Delete';


import { connect } from 'react-redux';

import {Router, Modal, Scene, Actions, ActionConst, Switch } from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene key='modal' component={Modal} >
  <Scene key='root' tabs={true} hideNavBar >

    <Scene key="loading" hideNavBar initial={true} component={Loading} />

    <Scene key='menu' hideNavBar component={NavigationDrawer} open={false}>
      <Scene key='events' hideNavBar tabs={true} component={Dashboard} />

      <Scene key='groups' tabs={true} component={Groups} />
      <Scene key='groupForm' tabs={true} component={GroupForm} />
      <Scene key='groupView' tabs={true} component={GroupView} />

      <Scene key='feed' tabs={true} component={Feed}/>
      <Scene key='eventForm' tabs={true} component={EventForm} />
      <Scene key='locationSearch' tabs={true} component={LocationSearch} />
      <Scene key='eventView' tabs={true} component={EventView} />

    </Scene>

    <Scene key='signup' hideNavBar component={Signup} />
    <Scene key='login' hideNavBar tabs={true} component={Login} />

  </Scene>
  <Scene key='logout' duration={1} component={Logout} />
  <Scene key='delete' duration={1} component={Delete} />

  <Scene key='signupError' component={SignupModal} />

  </Scene>
);

export default function Routes() {
  return (
    <RouterWithRedux createReducer={routerReducer} scenes={scenes} />
  );
}
