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
    userId: auth.id
  }
}
export default connect(mapStateToProps)(function Groups ({groups, userId, dispatch}) {
  return (
      <Container>
      <Header />
      <Container>
       <List dataArray={groups}
        renderRow={item =>
            <ListItem onPress={() => {
              getGroupById(item.id, dispatch).then(() => {
                dispatch({type: 'CURRENT_GROUP', id: {...item, userId: userId}});
                Actions.groupView({title: item.name});
              })
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
