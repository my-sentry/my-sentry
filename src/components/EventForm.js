import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';


// const mapStateToProps = state => { 
//   return {state: state};
// };

export default connect()(function EventForm (state) {
  return (
    <Container>
    <Header />
    <Content>
    <H1>EventForm Goes Here</H1>
    </Content>
    </Container>
  );
});