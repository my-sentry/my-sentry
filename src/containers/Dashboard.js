import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { Container, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';


import Feed from './Feed';
import Groups from './Groups';
import Header from '../components/Header';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = ({groups}) => ({hasGroups: groups});

export default connect(mapStateToProps)(class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Feed />
      </Container>
    );
  }
});


