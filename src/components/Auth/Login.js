import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Header from './authHeader';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import { Container, Title, Content, Label, Form, Button, Text, Item, Icon, Spinner, Right, Body, Input, H1, Grid, Row } from 'native-base';
import axios from 'axios';


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#d0d0da'
  },
  item: {
    backgroundColor: '#a0a',
    flex: 1
  }
};




const mapStateToProps = ({login}) => { 
  return { login: {username: login.username, password: login.pw}};
};

export default connect(mapStateToProps)(function Login ({login, dispatch}) {
  return (
   <Container style={styles.container}>
    <Grid style={{flex: 1}}>
    <Row >
    <Content>
    <Form >
        <Item stackedLabel >
          <Label>Username</Label>
          <Input value={login.username} onChangeText={text => dispatch({type: 'USERNAME', text: text})}/>
        </Item>
        <Item stackedLabel last >
          <Label>Password</Label>
          <Input value={login.password} secureTextEntry={true} onChangeText={text => dispatch({type: 'PASSWORD', text: text})}/>
        </Item>
    </Form>
    </Content>
    </Row>
    <Row style={{flex: 0}}>
      <Button block onPress={Actions.signup} ><Text> SIGNUP</Text></Button>
      <Button onPress={()=> {
        axios({
          method: 'post',
          credentials: 'include',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: 'http://192.168.1.163:8000/api/users/login',
          data: JSON.stringify(login)
        }).then(res => {
          setTimeout(() => Actions.loading());
          dispatch({type: 'LOGIN', id: res.data.id});
          dispatch({type: 'CLEAR_LOGIN'});

        }).catch(err => {
          console.log('ERR', err);
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