

import React, {Component} from 'react';
import { Text, View, StyleSheet, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Container, Title, Content, Footer, FooterTab, Button, Body, List, ListItem, H1 } from 'native-base';
import { getGroups, logoutCtrl } from '../actions/axiosController';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  list: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  content: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  username: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 17,
    // fontWeight: 'bold'
  }
};



// const mapStateToProps = ;

export default connect(({auth}) => auth)(function SideMenu ({ name, dispatch }) {
  return (
    <Container>
      <Content>
        <Content style={styles.content}>
          <Icon name='user-circle' size={100} />
          <Text style={styles.username}>{`${name.firstName}\n${name.lastName}`}</Text>
        </Content>

        <List style={styles.list}>
          <ListItem onPress={() => {
            setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
            logoutCtrl(dispatch);
          }}>
            <Icon name='arrow-left' size={20} style={{ color: '#EF4841' }}/>
            <Text>    Logout</Text>
          </ListItem>

          <ListItem onPress={() => {
            setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
            getGroups(dispatch).then(()=> Actions.groups());

          }}>
            <Icon name='users' size={20} style={{ color: '#2891ee' }}/>
            <Text>   Groups</Text>
          </ListItem>

          <ListItem onPress={() =>{
            setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
            Actions.dashboard();
          }}>
            <Icon name='calendar' size={20} style={{ color: '#2891ee' }}/>
            <Text>   Events</Text>
          </ListItem>
        </List>
      </Content>

    </Container>
  );
});
