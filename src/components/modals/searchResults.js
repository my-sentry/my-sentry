import React, {Component} from 'react';
import { Text, View, Dimensions, Keyboard} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Label, Item, Input, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image, Form } from 'native-base';
import { addUser } from '../../actions/axiosController';

var mapStateToProps = function({ searchBar }) {
  return { searchResults: searchBar.results };
};



export default connect(mapStateToProps)(function LocationSearch({ form, searchResults, dispatch }) {
  var {height, width} = Dimensions.get('window');

  return (
    <Container style={{
      position: 'absolute',
      top: 25,
      height: 150,
      width: width,
    }}><View>
    {searchResults.map(user => (
        <Button 
        key={user.id} block light
        onPress={() => {
          dispatch({type: 'ADD_MEMBER',form: form, user: user});
          dispatch({type: 'CLEAR_SEARCH_VALUE'});
          Keyboard.dismiss()
          Actions.pop()
        }}><Text>{user.username}</Text>
      </Button>
      ))}</View></Container>
  );
});
