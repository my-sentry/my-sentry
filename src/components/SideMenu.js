import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from './Header';
import {Actions} from 'react-native-router-flux';


import { Container, Title, Content, Footer, FooterTab, Button, Body, Icon, H1 } from 'native-base';


export default connect()(function SideMenu (state) {
  return (
    <Container>
    <Content>
    <H1 onPress={() => state.dispatch({type: 'LOGOUT'})}>LOGOUT</H1>
    <H1 onPress={() => Actions.groups()}>Groups</H1>
    <H1 onPress={() => Actions.eventView()}>EVENTS</H1>
    </Content>
    </Container>
  );
});