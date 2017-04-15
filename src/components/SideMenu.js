

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
  },
  icon: {
    color: '#2891ee' 
  }
};



const mapStateToProps = ({auth}) => auth;

export default connect(mapStateToProps)(function SideMenu ({ name, dispatch }) {
  return (
    <Container>
      <Content>
        <Content style={styles.content}>
          <Icon name='user-circle' size={100} />
          <Text style={styles.username}>{`${name.firstName}\n${name.lastName}`}</Text>
        </Content>

        <List style={styles.list}>
          <ListItem onPress={() => Actions.logout()}>
            <Icon name='arrow-left' size={20} style={{ color: '#EF4841' }}/>
            <Text style={{paddingLeft: 16}}>Logout</Text>
          </ListItem>

          <ListItem onPress={async () => {
            await getGroups(dispatch);
            await Actions.refresh({key: 'menu', open: value => !value });
            Actions.groups();
          }}>
            <Icon name='users' size={20} style={styles.icon}/>
            <Text style={{paddingLeft: 13}}>Groups</Text>
          </ListItem>

          <ListItem onPress={async () => {
            Actions.refresh({key: 'menu', open: value => !value });
            Actions.events();
          }}>
            <Icon name='calendar' size={20} style={styles.icon}/>
            <Text style={{paddingLeft: 15}}>Events</Text>
          </ListItem>
        </List>
      </Content>

    </Container>
  );
});
