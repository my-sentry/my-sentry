import React, {Component} from 'react';
import { Text, View, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { getUsers, getGroupById } from '../actions/axiosController';
import {styles} from './Feed';



import { Container, Title, Content, Button, Left, Right, List,Grid, Row, ListItem, Body, Fab, H1, H2, H3 } from 'native-base';
const {height, width} = Dimensions.get('window');

const mapStateToProps = ({groups, auth}) => {
  return {
    groups: groups.groups,
    isAdmin: groups.id.admin_user === Number(groups.id.userId),
    userId: auth.id
  };
};
export default connect(mapStateToProps)(function Groups ({groups, userId, isAdmin, dispatch}) {
  return (
    <Container style={{backgroundColor: '#1f1f1f'}}><Header /><Grid><Row style={styles.container}>
    <Content style={styles.content} >
       <List dataArray={groups}
        renderRow={group =>
          <ListItem 
          style={styles.danger}
          onPress={() => {
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
              <Text style={styles.text}>{group.name}</Text>
            </Body>

          </ListItem>
        }>
    </List></Content>
    </Row>

    <Row style={styles.confirm}>
      <Button full
        outline light rounded
        style={styles.confirmButton}
          onPress={() =>
            getUsers()
              .then((res) => {
                dispatch({type: 'RECEIVE_USERS', users: res.data});
                dispatch({type: 'RECEIVE_SEARCH_DATA', users: res.data});
              })
              .then(() => Actions.groupForm({title: 'Create a new Group'})) }><Text style={styles.textbox}>Create a new Group</Text></Button></Row> 
    </Grid>
    </Container>
  );
});
