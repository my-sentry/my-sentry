import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from '../components/Header';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';


import { Container, Title, Content, List, ListItem, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, H3 } from 'native-base';

// const mapStateToProps = 

var mock = [{id: 'abc', name: 'Jeep Sales Committee', description: 'abc'}];


export default connect(({groups}) => groups)(function Groups (state) {
  // then there would be a state.members inside here
  return (
      <Container>
      <Header title={'groups'}/>
      <Container>
       <List dataArray={mock}
        renderRow={(item) =>
            <ListItem onPress={() => {
              setTimeout(()=> Actions.groupView({title: item.name}));
              state.dispatch({type: 'UPDATE_GROUP', item: item});
            }}>
                <Body>
                <H3>{item.name}</H3>
                <Text>{item.description}</Text>
                </Body>
            </ListItem>
        }>
      </List>
      </Container>
      <ActionButton
          buttonColor='rgba(231,76,60,1)'
          onPress={() => Actions.groupForm()}/>  
    
      </Container>
  );
});