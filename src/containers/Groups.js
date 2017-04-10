import React, {Component} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { getUsers, getGroupById } from '../actions/axiosController';



import { Container, Title, Content, List, ListItem, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, H3 } from 'native-base';
const mapStateToProps = ({groups, auth}) => {
  console.log('MAPSTATE',groups, auth)
  return {
    groups: groups.groups
  }
}
export default connect(mapStateToProps)(function Groups ({groups, dispatch}) {
  return (
      <Container>
      <Header />
      <Container>
       <List dataArray={groups}
        renderRow={item =>
            <ListItem onPress={() => {
              AsyncStorage.getItem('AUTHENTICATION').then(res=> {
              getGroupById(item.id, dispatch)
              dispatch({type: 'CURRENT_GROUP', id: {...item, userId: res} } );
              }).then(()=> Actions.groupView({title: item.name}));
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
          onPress={() => getUsers(dispatch) }/>
      </Container>
  );
});
