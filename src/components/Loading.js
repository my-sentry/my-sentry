import React from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage } from 'react-native';
import { Container, Content, Spinner, Body } from 'native-base';
import {getEvents, getGroups} from '../actions/axiosController';


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
  AsyncStorage.getItem('AUTHENTICATION')
  .then(res=> res !== 'null' 
  ? getGroups(dispatch)
    .catch(({response}) => {
      if (response.status === 401) {
        dispatch({type: 'LOGOUT'});
        Actions.login();
      } else {
        console.log(response);
      }
    })
    .then(() => AsyncStorage.getItem('NAME')
      .then(name => dispatch({type: 'SET_VALUES', id: res, name: name}))
    )
    .then(getEvents(dispatch)
      .then(() => setTimeout(()=> Actions.menu()) ) 
    )
  : Actions.login()
  );
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
