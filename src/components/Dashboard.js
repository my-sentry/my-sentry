import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Login from './Auth/Login';

import Feed from './Feed';
import MyHeader from './Header';
import { Container, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = state => { 
  return {
    // returns verification from store as state to dashboard
    hasGroups: state.hasGroups,
    Auth: state.auth
  };
};

export default connect(mapStateToProps)(class Dashboard extends Component {
  render() {
    const {hasGroups, auth} = this.props; 

    // if session, or token, shows dashboard
    return !auth 
    ? (
      <Container>
      <MyHeader />
        <Content>
        {hasGroups 
        ? <Feed />
        : (
          <Container style={styles.container}>
          <H1>No Groups</H1>
          <Button block primary
          onPress={()=> Actions.groups()}
          >
            <Text>Find Group</Text>
          </Button>
          </Container>
        )}
        </Content>
      </Container>
    )
    : (<Login />);
  }
});


