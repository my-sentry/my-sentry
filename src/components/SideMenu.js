import React, {Component} from 'react';
import { Text, View, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
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
      setTimeout(() =>Actions.loading());
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      state.dispatch({type: 'LOGOUT'});
    }}>LOGOUT</H1>

    <H1 onPress={() => {
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      Actions.groups();
    }}>Groups</H1>

    <H1 onPress={() =>{
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      setTimeout(() =>Actions.dashboard());
    }}>EVENTS</H1>
    </Content>
    </Container>
  );
});