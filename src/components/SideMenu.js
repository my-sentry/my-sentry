import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from './Header';
import {Actions} from 'react-native-router-flux';


import { Container, Title, Content, Footer, FooterTab, Button, Body, Icon, H1 } from 'native-base';

/*  to remove the hacky settimeouts,
this all has to be reformatted to THUNK. aka async redux promises
it needs to do the actions asynchrounously, else the first function blocks.
*/
export default connect()(function SideMenu (state) {
  return (
    <Container>
    <Content>

    <H1 onPress={() => {
      setTimeout(() =>Actions.menu());
      setTimeout(() =>Actions.login());
      state.dispatch({type: 'LOGOUT'});
    }}>LOGOUT</H1>

    <H1 onPress={() => {
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      Actions.groups();
    }}>Groups</H1>

    <H1 onPress={() =>{
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      Actions.dashboard();
    }}>EVENTS</H1>
    </Content>
    </Container>
  );
});