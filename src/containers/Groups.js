import React, {Component} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { getUsers, getGroupById } from '../actions/axiosController';



import { Container, Title, Content, List, ListItem, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, H3 } from 'native-base';
const mapStateToProps = ({groups, auth}) => {
  return {
    groups: groups.groups,
    isAdmin: groups.id.admin_user === Number(groups.id.userId),
    userId: auth.id
  };
};
export default connect(mapStateToProps)(function Groups ({groups, userId, isAdmin, dispatch}) {
  return (
      <Container>
      <Header />
      <Container>
       <List dataArray={groups}
        renderRow={group =>
          <ListItem onPress={() => {
            getGroupById(group.id)
              .then(res => {
                dispatch({type: 'RECEIVE_USERS', users: res.data.users});
                dispatch({type: 'CURRENT_GROUP', id: {...group, userId: userId}});
              })
              .then(() => {
                return getUsers().then((res) => {
                  dispatch({type: 'RECEIVE_SEARCH_DATA', users: res.data});
                  Actions.groupView({ title: group.name });
                });
              });
          }}>

            <Body>
              <Text>{group.name}</Text>
            </Body>

          </ListItem>
        }>
      </List>
      </Container>
      <ActionButton
          buttonColor='rgba(231,76,60,1)'
          onPress={() =>
            getUsers()
              .then((res) => {
                dispatch({type: 'RECEIVE_USERS', users: res.data});
                dispatch({type: 'RECEIVE_SEARCH_DATA', users: res.data});
              })
              .then(() => Actions.groupForm()) }/>
      </Container>
  );
});
