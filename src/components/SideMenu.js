import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';


export default connect()(function SideMenu (state) {
  return (
    <Container>
    <Content>
    <H1>menu Go Here</H1>
    </Content>
    </Container>
  );
});