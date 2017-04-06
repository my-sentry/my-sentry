import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Header from './authHeader';
import { connect } from 'react-redux';
import axios from 'axios';



import { Container, Title, Content, Label, Form, Button, Item, Text, Icon, Right, Body, Input, H1 } from 'native-base';


const mapStateToProps = ({signup}) => { 
  return { signup: {
    firstName: signup.firstName,
    lastName: signup.lastName,
    username: signup.userName, 
    password: signup.password,
    confirm: signup.confirm
  }};
};

export default connect(mapStateToProps)(function Login ({signup, dispatch}) {
  return (
   <Container>
    <Content>
          <Button onPress={Actions.login}>
        <Icon name='arrow-back'/>
          </Button>
      <Form>
        <Item >
          <Input placeholder='First Name' onChangeText={(text) => dispatch({type: 'FIRST_NAME', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Last Name' onChangeText={(text) => dispatch({type: 'LAST_NAME', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Username' onChangeText={(text) => dispatch({type: 'USERNAME_SIGNUP', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Password' secureTextEntry={true} onChangeText={(text) => dispatch({type: 'PASSWORD_SIGNUP', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Confirm Password' secureTextEntry={true} onChangeText={(text) => dispatch({type: 'CONFIRM_PASSWORD', text: text})}/>
          {signup.confirm === signup.password ? null : <Icon name='ios-close-circle' style={{color: 'red'}}/>}
        </Item>

      </Form>

      <Button block onPress={() => {
        let data = JSON.stringify({
          firstName: signup.firstName,
          lastName: signup.lastName,
          username: signup.username,
          password: signup.password
        });

        signup.confirm === signup.password 
        ? axios({
          method: 'post',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: 'http://192.168.1.163:8000/api/users/signup',
          data: data
        }).then(res => {
          setTimeout(() => Actions.dashboard());
          dispatch({type: 'LOGIN'});
          dispatch({type: 'CLEAR_SIGNUP'});
        })
          .catch(err => {
            setTimeout(() => alert('invalid submission'));
            dispatch({type: 'CLEAR_SIGNUP'});
          })
        : null;

      }} ><Text> Create Account</Text></Button></Content>
  </Container>
  );
});