import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Header from './authHeader';

import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';


// const mapStateToProps = state => { 
//   return {state: state};
// };

export default connect()(function Login (state) {
  // state.dispatch({type: 'HEADER_CHANGE_FORCE', title: 'login'});
  return (
    <Container>
    <Header />
    <Content>
      <H1 onPress={() => {
        Actions.dashboard();
      }}>login</H1>
      <H1 onPress={() => {
        Actions.signup();
      }}>SIGNUP</H1>
    </Content>
    </Container>
  );
});