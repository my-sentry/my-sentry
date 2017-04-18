import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Header from './Header';
import { Container, Title, Content, Grid, Row, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form, style} from 'native-base';
import {postGroup, getGroups } from '../actions/axiosController';
import {styles} from './EventForm';

const mapStateToProps = ({groups, auth, searchBar}) => {
  return {
    adminUser: auth,
    groupName: groups.groupName,
    members: groups.members,
    searchResults: searchBar.results,
    searchValue: searchBar.searchValue
  };
};

export default connect(mapStateToProps)(function GroupForm ({adminUser, members, groupName, searchResults, searchValue, tempList, dispatch}) {
  return (
   <Container style={{backgroundColor: '#1f1f1f'}}><Header /><Grid><Row style={styles.container}>
      <Content style={styles.content}>
      <Form style={styles.form} >
          <Item style={styles.listItemAlt}>
            <Input onChangeText={(text) => dispatch({type: 'ADD_NAME', text: text})} placeholder='Group Name' />
          </Item>

        <Item style={styles.list}>
          <List dataArray={members}
            renderRow={member =>
              <ListItem style={styles.listItem}>
                <Text>{member.username}</Text>
              </ListItem>
            }>
          </List>
        </Item>

        </Form>

        <Item style={styles.addMember}>
        <Row>
          <Input onChangeText={text => dispatch({type: 'SEARCH_NAME', text: text, users: members})} value={searchValue} placeholder='Add a Member'/>
          </Row>
          <List dataArray={searchResults}
            renderRow={user =>
              <ListItem style={styles.listItem} onPress={() => {
                dispatch({type: 'ADD_MEMBER', form: true, user: user});
                dispatch({type: 'CLEAR_SEARCH_VALUE'});
              }}><Text>{user.username}</Text>
              </ListItem>
            }>
          </List>

        </Item>

      </Content>

      </Row>
        <Row style={styles.confirm}>
        <Button full
          outline light rounded
          style={styles.confirmButton}
          onPress={() => {
            let data = {
              name: groupName,
              members: [...members, adminUser ]
            };
            postGroup(data).then(() => getGroups(dispatch).then(() => Actions.groups()));
          }}><Text style={styles.textbox}>Create Group</Text></Button></Row>

      </Grid>
    </Container>
  );
});
