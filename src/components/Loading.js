import React from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage } from 'react-native';
import axios from 'axios';
import { Container, Content, Spinner, Body } from 'native-base';
import URL_CONFIG from '../../config/config';

const styles = {
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc',
  },
  spinner: {
    marginTop: 250,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default connect()(function Loading({dispatch}) {
  AsyncStorage.getItem('AUTHENTICATION').then(res=> res !== 'null' 
  ? axios.get(`${URL_CONFIG}/api/events/`)
    .then(result => {
      dispatch({type: 'UPDATE_FEED', data: result.data});
    })
    .catch(err => console.log('ERR', err))
    .then(() => Actions.menu())
  : Actions.login());
  return (
  <Container style = {styles.centering} >
  <Content >
  <Body>
  <Spinner style={styles.spinner} color='black' />
  </Body>
  </Content>
  </Container>
  );
});
