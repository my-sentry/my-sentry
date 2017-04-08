import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form, style} from 'native-base';
import axios from 'axios';

const mapStateToProps = ({groups}) => {
  return {
    groupName: groups.groupName,
    users: groups.users,
    members: groups.members
  };
};

export default connect(mapStateToProps)(function GroupForm ({users, members, groupName, dispatch}) {
  return (
    <Container>

      <Header />

      <Content>

        <Form>
          <Item>
            <Input onChangeText={(text) => dispatch({type: 'ADD_NAME', text: text})} placeholder='Group Name' />
          </Item>
        </Form>

        <Form>
            <Item>
              <Input placeholder='Search Users'/>
            </Item>
        </Form>

        <List dataArray={users}
          renderRow={user =>
            <ListItem style={{
              backgroundColor: members.includes(user.id) ? 'green' : null
            }} key={user.id} onPress={() => {
              dispatch({type: 'ADD_MEMBER', id: user.id});
            }}>
              {members.includes(user.id) ? console.log('green') : console.log('none')}
              <Text>{`${user.first_name} ${user.last_name}`}</Text>
            </ListItem>
          }>
        </List>

      </Content>

      <Button
        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
        onPress={()=> {
          let data = JSON.stringify({
            name: groupName,
            members: members
          });

          axios({
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            url: 'http://192.168.1.127:8000/api/groups',
            data: data
          }).then(res => console.log(res))
          //.then(() => dispatch({type: 'ADD_GROUP', item: {name: groupName}}))
          .catch(err => console.log(err));
        }}>
        <Text>Create Group</Text>
      </Button>

    </Container>
  );
});
