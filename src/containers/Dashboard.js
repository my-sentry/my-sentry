import React, {Component} from 'react';
import { Text, View, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { Container, Content, Button, H1 } from 'native-base';
import { getUsers } from '../actions/axiosController';

import Feed from './Feed';
import Groups from './Groups';
import Header from '../components/Header';

const styles = {
  container: {
    backgroundColor: '#1f1f1f',
  },
};

const mapStateToProps = ({groups}) => groups;

export default connect(mapStateToProps)(function Dashboard({dispatch, groups}) {
  return (
    <Container style={styles.container}>
    {groups.length > 0 
      ? <Feed />
      : (
      <Content>
        <Header />
        <Container style={styles.container}>
        <H1>No Groups</H1>
        <Button block primary onPress={async () => {
          let res = await getUsers();
          dispatch({type: 'RECEIVE_USERS', users: res.data});
          Actions.groupForm();
        }} >
          <Text>Create Group</Text>
        </Button>
        </Container>
      </Content>
        )
    }
    </Container>
  );
});




