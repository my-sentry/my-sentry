import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import {Actions} from 'react-native-router-flux';
import { Container, Item, Input, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image } from 'native-base';
import { addUser, removeUser, deleteGroup, getGroups } from '../actions/axiosController';

const styles = {
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  addButton: {
    alignSelf: 'center',
    marginBottom: 20
  },
  searchBar: {
    height: 0
  }
};

const mapStateToProps = ({groups, auth, searchBar}) => {
  return {
    id: groups.id.id,
    groupName: groups.id.name,
    isAdmin: groups.id.admin_user === Number(groups.id.userId),
    users: groups.users,
    searchResults: searchBar.results
  };
};

export default connect(mapStateToProps)(function GroupView ({id, groupName, users, isAdmin, searchResults, dispatch}) {
  return isAdmin
  ? (
    <Container>
      <Header />
      <Container>

        <List dataArray={users}
          renderRow={user =>
            <ListItem>
            <Body>
              <Text>{user.username}</Text>
            </Body>
              <Right>
                <Button small bordered danger onPress={() => {
                  removeUser(id, [user], false);
                  dispatch({type: 'REMOVE_MEMBER', id: user.id});
                }}>
                  <Icon name='ios-trash-outline' style={{color: 'red'}} />
                </Button>
              </Right>
            </ListItem>
          }>
        </List>

        <Item>
          <Input onChangeText={text => dispatch({type: 'SEARCH_NAME', text: text})} placeholder='Add a Member'/>
          <List dataArray={searchResults}
            renderRow={user =>
              <ListItem onPress={() => {
                addUser(id, user.id)
                  .then(() => dispatch({type: 'ADD_MEMBER', user: user}));
              }}>
                <Text>{user.username}</Text>
              </ListItem>
            }>
          </List>
        </Item>

        <Button
          style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor: '#EF4841' }}
          onPress={() => {
            removeUser(id, users)
              .then(() => {
                return deleteGroup(id)
                  .then(() => {
                    return getGroups(dispatch)
                      .then(() => Actions.groups());
                  });
              });
          }}>
          <Text>Delete Group</Text>
        </Button>

      </Container>
    </Container>
  )
  : (
    <Container>
      <Header />
        <Container>
         <List dataArray={users}
          renderRow={item =>
              <ListItem>
                <Text>{item.username}</Text>
              </ListItem>
          }>
        </List>
        </Container>
    </Container>
  );
});
