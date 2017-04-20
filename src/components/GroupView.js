import React, {Component} from 'react';
import { Text, TextInput, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import {Actions} from 'react-native-router-flux';
import { Container, Item, Grid, Row, Input, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image } from 'native-base';
import { addUser, removeUser, deleteGroup, getGroups } from '../actions/axiosController';
import {styles} from '../containers/Feed';
const {height, width} = Dimensions.get('window');

const mapStateToProps = ({groups, auth, searchBar}) => {
  return {
    id: groups.id.id,
    groupName: groups.id.name,
    isAdmin: groups.id.admin_user === Number(groups.id.userId),
    users: groups.users,
    searchResults: searchBar.results,
    searchValue: searchBar.searchValue
  };
};

export default connect(mapStateToProps)(function GroupView ({id, groupName, users, isAdmin, searchResults, searchValue, dispatch}) {
  return isAdmin
  ? (
   <Container style={{backgroundColor: '#1f1f1f'}}><Header /><Grid><Row style={styles.container}>
      <Content style={styles.content}>

        <List
        dataArray={users}
          renderRow={user =>
            <ListItem>
            <Body>
              <Text>{user.username}</Text>
            </Body>
              <Right>
                <Button small bordered danger onPress={() => {
                  Actions.delete({
                    groupId: id,
                    user: user,
                    groupName: groupName,
                    deletingUser: true,
                    dispatch: dispatch
                  });
                }}>
                  <Icon name='ios-trash-outline' style={{color: 'red'}} />
                </Button>
              </Right>
            </ListItem>
          }>
        </List>
           <Input onChangeText={text => dispatch({type: 'SEARCH_NAME', text: text, users: users})} value={searchValue} placeholder='Add a Member'/>
           <List dataArray={searchResults}
             renderRow={user =>
               <ListItem onPress={() => {
                 addUser(id, user.id)
                   .then(() => {
                     dispatch({type: 'ADD_MEMBER', user: user});
                     dispatch({type: 'CLEAR_SEARCH_VALUE'});
                   });
               }}>
                 <Text>{user.username}</Text>
               </ListItem>
             }>
           </List>

        </Content>
      </Row><Row style={styles.confirm}>
      <Button danger full rounded
        style={styles.confirmButton}
        onPress={() => {
          Actions.delete({
            groupId: id,
            users: users,
            groupName: groupName,
            deletingUser: false,
            dispatch: dispatch
          });
          // removeUser(id, users)
          // .then(() => {
          //   return deleteGroup(id)
          //   .then(() => {
          //     return getGroups(dispatch)
          //     .then(() => Actions.groups());
          //   });
          // });
        }}><Text style={styles.textbox}>Delete Group</Text></Button></Row>
        </Grid>
      </Container>
  )
  : (
       <Container style={{backgroundColor: '#1f1f1f'}}><Header /><Grid><Row style={styles.container}>
        <Content style={styles.content}>
         <List dataArray={users}
          renderRow={item =>
              <ListItem><Text>{item.username}</Text></ListItem>
          }>
        </List></Content></Row></Grid></Container>
    );
});
