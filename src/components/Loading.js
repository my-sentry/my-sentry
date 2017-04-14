import React from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage } from 'react-native';
import { Container, Content, Spinner, Body } from 'native-base';
import {getEvents, getGroups, verifyLogin} from '../actions/axiosController';


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

export default connect()(function ({dispatch}) {
  verifyLogin()
    .catch(({response}) => {
      if (response.status === 401) {
        dispatch({type: 'LOGOUT'});
        Actions.login();
      } else {
        console.log('unknown error', response);
      }
    })
  .then(() => AsyncStorage.getItem('AUTHENTICATION')
    .then(id=> id !== 'null' 
    ? getGroups(dispatch)
      .then(() => AsyncStorage.getItem('NAME')
        .then(name => dispatch({type: 'SET_VALUES', id: id, name: name}) )
          .then(getEvents(dispatch)
            .then(() => Actions.menu({title: 'events'}) ) 
          )
      )    
    : Actions.login()
  ));
  return (
  <Container style={styles.centering} >
  <Content >
  <Body>
  <Spinner style={styles.spinner} color='black' />
  </Body>
  </Content>
  </Container>
  );
});
