import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form, style} from 'native-base';
import {postGroup, getGroups } from '../actions/axiosController';

const mapStateToProps = ({groups, auth, searchBar}) => {
  return {
    userId: auth.id,
    groupName: groups.groupName,
    users: groups.users,
    members: groups.members,
    searchResults: searchBar.results
  };
};

export default connect(mapStateToProps)(function GroupForm ({users, userId, members, groupName, searchResults, dispatch}) {
  return (
    <Container>

      <Header />

      <Content>

        <Form>
          <Item>
            <Input onChangeText={(text) => dispatch({type: 'ADD_NAME', text: text})} placeholder='Group Name' />
          </Item>
        </Form>

        <Item>
          <Input onChangeText={text => dispatch({type: 'SEARCH_NAME', text: text})} placeholder='Add a Member'/>
          <List dataArray={searchResults}
            renderRow={user =>
              <ListItem onPress={() => dispatch({type: 'ADD_MEMBER', id: user.id})}>
                <Text>{user.username}</Text>
              </ListItem>
            }>
          </List>
        </Item>

      </Content>

      <Button
        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
        onPress={()=> {
          let data = {
            name: groupName,
            members: [...members, userId ]
          };
          postGroup(data).then(data => getGroups(dispatch).then(() => Actions.groups()));
        }}>
        <Text>Create Group</Text>
      </Button>

    </Container>
  );
});
