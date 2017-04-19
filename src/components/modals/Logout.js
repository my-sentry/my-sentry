import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {View, Dimensions, BackAndroid} from 'react-native';
import { Container, Title, Text, Grid, Row, Form, Content, Button, Left, Right, Body, List, ListItem, H1 } from 'native-base';
import { logoutCtrl } from '../../actions/axiosController';


export default function SignupModal () { 
  var {height, width} = Dimensions.get('window');
  return (
    <Container style={{
      position: 'absolute',
      alignSelf: 'center',
      height: height,
      width: width,
      opacity: .8,
      backgroundColor: 'transparent',          
    }}>
  <Container style={{
    position: 'absolute',
    alignSelf: 'center',
    top: height / 3,
    height: 150,
    width: 200,
    backgroundColor: 'rgb(155,155,155)',          
    borderStyle: 'solid',
    borderColor: '#cccccc',
    borderWidth: 1,
  }}>
  <Grid style={{flex: 1}}>
  <Row >
  <Text style={{alignSelf: 'center'}}> Are you sure you want to logout?</Text>
  </Row>
  <Row style={{flex: 0}}>
  <Left>
    <Button block bordered 
    onPress={() =>Actions.pop()} ><Text> NO</Text></Button>
  </Left>
  <Right>
    <Button block onPress={()=> {
      Actions.pop();
      logoutCtrl();
    }}><Text> Yes </Text>
    </Button>
  </Right>
  </Row>
  </Grid>
  </Container>
  </Container>
  );      
}



