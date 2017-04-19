import React, {Component} from 'react';
import { Text, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { Container, Content, Button, H1 } from 'native-base';
import { getUsers } from '../actions/axiosController';
const {height, width} = Dimensions.get('window');


import Feed from './Feed';
import Groups from './Groups';
import Header from '../components/Header';

const styles = {
  container: {
    backgroundColor: '#1f1f1f',
  },
  content: {
    top: height / 3,
  },
  text: {
    paddingBottom: 20,
    alignSelf: 'center',
  }
};

export default connect(({groups}) => groups)(function Dashboard({dispatch, groups}) {
  return (
    <Container style={styles.container}>
    {groups.length > 0 
      ? <Feed />
      : (
      <Content>
        <Header />
        <Container style={styles.content}>
        <H1 style={styles.text}>No Groups</H1>

        <Button block light onPress={async () => {
          let res = await getUsers();
          dispatch({type: 'RECEIVE_USERS', users: res.data});
          dispatch({type: 'RECEIVE_SEARCH_DATA', users: res.data});
          Actions.groupForm();
        }} ><Text>Create Group</Text></Button>

        </Container>
      </Content>
        )
    }
    </Container>
  );
});




