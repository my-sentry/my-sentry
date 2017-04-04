import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Login from './Auth/Login';
import Groups from '../containers/Groups';
import ActionButton from 'react-native-action-button';


import Feed from '../containers/Feed';
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
        {hasGroups 
        ? (<Feed /> )
        : ( <Groups /> ) }

      </Container>
    );
  }
});


