import React from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage } from 'react-native';
import { Container, Content, Spinner, Body } from 'native-base';
import {getEvents, getGroups, verifyLogin, getGroupById} from '../actions/axiosController';


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
  async function verifyAndLoad() {
    try {
      await verifyLogin();
      var id = await AsyncStorage.getItem('AUTHENTICATION');
      await getGroups(dispatch);
      var name = await AsyncStorage.getItem('NAME');
      dispatch({type: 'SET_VALUES', id: id, name: name});
      var events = await getEvents();
      var groupIdsfromEvents = await Promise.all(events.data.map(event => (
        getGroupById(event.group_id)
      )));
      var newData = groupIdsfromEvents.map((group, index) => (
         {...events.data[index], groupName: group.data.name}
      ));
      dispatch({type: 'UPDATE_FEED', data: newData});
      return Actions.menu();
    } catch ({response}) {
      if (response.status === 401) {
        dispatch({type: 'LOGOUT'});
        Actions.login();
      } else {
        console.log('unknown error', response);
      }
    }
  }
  verifyAndLoad();
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
