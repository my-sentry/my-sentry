import React from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage } from 'react-native';
import { Container, Content, Spinner, Body } from 'native-base';
import {getEvents, getGroups, verifyLogin, getUserById, getGroupById} from '../actions/axiosController';


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
  (async function() {
    try {
      await verifyLogin();
      await getGroups(dispatch);
      var id = await AsyncStorage.getItem('AUTHENTICATION');
      var name = await AsyncStorage.getItem('NAME');
      var events = await getEvents();
      var userIds = await Promise.all(events.data.map(event => (
        getUserById(event.user_id)
        )));
      var groupIds = await Promise.all(events.data.map(event => (
        getGroupById(event.group_id)
      )));
      var feed = groupIds.map((group, i) => (
        {...events.data[i],
          groupName: group.data.name,
          fullName: `${userIds[i].data.first_name} ${userIds[i].data.last_name} ` }
      ));
      
      dispatch({type: 'SET_VALUES', id: id, name: name});
      dispatch({type: 'UPDATE_FEED', data: feed});
      return Actions.menu({title: 'My-Sentry'});

    } catch ({response}) {
      if (response.status === 401) {
        dispatch({type: 'LOGOUT'});
        Actions.login();
      } else {
        console.log('unknown error', response);
      }
    }
  }());
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
