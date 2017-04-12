import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Item, Input, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image } from 'native-base';
import { removeUserFromGroup } from '../actions/axiosController';

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
    isAdmin: groups.id.admin_user === Number(groups.id.userId),
    users: groups.users,
    searchResults: searchBar.results
  };
};

export default connect(mapStateToProps)(function GroupView ({id, users, isAdmin, searchResults, dispatch}) {
  return isAdmin
  ? (
    <Container>
      <Header />
      <Container>

        <List dataArray={users}
          renderRow={item =>
            <ListItem>
            <Body>
              <Text>{item.username}</Text>
            </Body>
              <Right>
                <Button small bordered danger onPress={() => {
                  removeUserFromGroup(id, item.id);
                  dispatch({type: 'REMOVE_MEMBER', id: item.id});
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
              <ListItem onPress={() => dispatch({type: 'ADD_MEMBER', id: user.id})}>
                <Text>{user.username}</Text>
              </ListItem>
            }>
          </List>
        </Item>

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


/////////Button
// <Button style={styles.addButton} onPress={() => dispatch({type: 'TOGGLE_SEARCH'})}>
//   <Text>Add Member</Text>
// </Button>
