import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Container, Title, Content, Footer, FooterTab, Button, Body, Icon, H1 } from 'native-base';
import { getGroups, logoutCtrl } from '../actions/axiosController';

/*  to remove the hacky settimeouts,
this all has to be reformatted to THUNK. aka async redux promises
it needs to do the actions asynchrounously, else the first function blocks.
*/
export default connect()(function SideMenu ({dispatch}) {
  return (
    <Container>
    <Content>

    <H1 onPress={() => {
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      logoutCtrl(dispatch);
    }}>LOGOUT</H1>

    <H1 onPress={() => {
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      getGroups(dispatch).then(()=> Actions.groups());
      
    }}>Groups</H1>

    <H1 onPress={() =>{
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      Actions.dashboard();
    }}>EVENTS</H1>
    </Content>
    </Container>
  );
});