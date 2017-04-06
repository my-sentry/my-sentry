import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Header from './authHeader';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';

import axios from 'axios';

const styles = {
  container: {
    flex: 1
  }
};


import { Container, Title, Content, Label, Form, Button, Text, Item, Icon, Right, Body, Input, H1, Grid, Row } from 'native-base';


const mapStateToProps = state => { 
  return { login: {username: state.login.username, password: state.login.pw}};
};

export default connect(mapStateToProps)(function Login ({login, dispatch}) {
  return (
   <Container>
    <Grid style={{flex: 1}}>
    <Row >
    <Content>
    <Form style={styles.container}>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input value={login.username} onChangeText={(text) => dispatch({type: 'USERNAME', text: text})}/>
        </Item>
        <Item floatingLabel last >
          <Label>Password</Label>
          <Input value={login.password} secureTextEntry={true} onChangeText={(text) => dispatch({type: 'PASSWORD', text: text})}/>
        </Item>
    </Form>
    </Content>
    </Row>
    <Row style={{flex: 0}}>
      <Button onPress={Actions.signup} ><Text> SIGNUP</Text></Button>
      <Button onPress={()=> {
        axios({
          method: 'post',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: 'http://192.168.1.163:8000/api/users/login',
          data: JSON.stringify(login)
        }).then(res => {
          setTimeout(() => Actions.dashboard());
          dispatch({type: 'LOGIN'});
          dispatch({type: 'CLEAR_LOGIN'});

        }).catch(err => {
          dispatch({type: 'CLEAR_LOGIN'});
          alert('LOGIN FAILED');
        });
      }}><Text> LOGIN </Text>
      </Button>
    </Row>
  </Grid>
  </Container>
  );
});