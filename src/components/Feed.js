import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';



export default connect()(class Feed extends Component {
  render() {
    return (
      <Text> FEED GOES HERE </Text>
    );
  }
});