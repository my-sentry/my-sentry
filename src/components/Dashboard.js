import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Login from './Auth/Login';
import ActionButton from 'react-native-action-button';


import Feed from './Feed';
import Header from './Header';
import { Container, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = state => { 
  return {
    // returns verification from store as state to dashboard
    hasGroups: state.groups,
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps)(class Dashboard extends Component {
  render() {
    const {hasGroups, isAuth} = this.props; 

    // if session, or token, shows dashboard
    return (
      <Container>
      <Header />
        {hasGroups 
        ? (<Feed /> )
        : (
        <Content>
          <Container style={styles.container}>
          <H1>No Groups</H1>
          <Button block primary onPress={Actions.groups} >
            <Text>Find Group</Text>
          </Button>
          </Container>
        </Content>
        )}
        {hasGroups ? (
          <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => Actions.eventForm()}/>          
          ) : null          
        }
      </Container>
    );
  }
});


