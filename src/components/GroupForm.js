import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form} from 'native-base';
import axios from 'axios';

// const mapStateToProps = state => {
//   return {state: state};
// };

//This is working
var data = [];
axios.get('http://192.168.1.127:8000/api/users')
  .then(users => {
    data = users;
    console.log('--------- data ---------', data.data);
  });

// var testData = [
//   {
//     first_name: 'Jerry',
//     last_name: 'Krusinski',
//     id: 1,
//     username: 'jkrusr'
//   },
//   {
//     first_name: 'Jonathan',
//     last_name: 'Granstaff',
//     id: 2,
//     username: 'jgranny'
//   },
//   {
//     first_name: 'Christian',
//     last_name: 'Arredondo',
//     id: 3,
//     username: 'theDondo9000'
//   },
//   {
//     first_name: 'Cory',
//     last_name: 'Grinstead',
//     id: 4,
//     username: 'cGrins'
//   }
// ];

const mapStateToProps = ({groups}) => {
  return {
    users: groups.users
  };
};

export default connect(mapStateToProps)(function GroupForm (state) {
  return (
    <Container>

      <Header />

      <Content>

        <Form>
          <Item>
            <Input onChangeText={(text) => state.dispatch({type: 'ADD_NAME', text: text})} placeholder='Group Name' />
          </Item>
        </Form>

        <Form>
            <Item>
              <Input onChangeText={(text) => search(text)} placeholder='Search Users'/>
            </Item>
        </Form>

        <List dataArray={state.users}
          renderRow={user =>
            <ListItem onPress={(member) => state.dispatch({type: 'ADD_MEMBER', member: user})}>
              <Text>{`${user.first_name} ${user.last_name}`}</Text>
            </ListItem>
          }>
        </List>

      </Content>

      <Button
        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
        onPress={()=> state.dispatch({type: 'ADD_GROUP', item: {name: 'test'}})}
        >
        <Text>Create Group</Text>
      </Button>

    </Container>
  );
});
