import React, {Component} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';


import { Container, Title, Content, List, ListItem, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, H3 } from 'native-base';

export default connect(({groups}) => groups)(function Groups ({groups, dispatch}) {
  return (
      <Container>
      <Header />
      <Container>
       <List dataArray={groups}
        renderRow={item =>
            <ListItem onPress={() => {
              AsyncStorage.getItem('AUTHENTICATION').then(res=> {
              dispatch({type: 'CURRENT_GROUP', item: {...item, userId: res} } );
              })
              .then(()=> Actions.groupView({title: item.name}));
            }}>
                <Body>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                </Body>
            </ListItem>
        }>
      </List>
      </Container>
      <ActionButton
          buttonColor='rgba(231,76,60,1)'
          onPress={() => {
            axios('http://192.168.1.163:8000/api/users')
              .then(res => {
                dispatch({type: 'RECEIVE_USERS', users: res.data})
                Actions.groupForm()
              })
              .catch(err => console.log(err))
          }}/>

      </Container>
  );
});