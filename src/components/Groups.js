import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';


const mapStateToProps = state => { 
  /* pass in what specific state you want component to have here to have here
  ex.
  return {
  members: state.groupmembers
  }

  */
  return {state};
};

export default connect()(function Groups (state) {
  
  // then there would be a state.members inside here
  return (
    <Container>
    <Header />

    <Content>
    <H1>Groups Go Here</H1>
    </Content>
    </Container>
  );
});