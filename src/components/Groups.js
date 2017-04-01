import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';

// const mapStateToProps = ({router}) => { 
//   return {state: router};
// };

export default connect()(class Groups extends Component {
  render() {
    return (
      <H1> Groups go here</H1>
    );
  }
});