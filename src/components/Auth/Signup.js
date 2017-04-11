import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Header from './authHeader';
import { connect } from 'react-redux';
import { Container, Title, Content, Label, Form, Button, Item, Text, Icon, Left, Right, Body, Input, H1, Grid, Row } from 'native-base';
import { signupCtrl } from '../../actions/axiosController';

const styles = {
  centering: {
    flex: 1
  },
  spinner: {
    marginTop: 250,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

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
   <Container >
      <Grid style={{flex: 1}}>
      <Row >
    <Content>
      <Form >
        <Item >
          <Input placeholder='First Name' onChangeText={text => dispatch({type: 'FIRST_NAME', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Last Name' onChangeText={text => dispatch({type: 'LAST_NAME', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Username' onChangeText={text => dispatch({type: 'USERNAME_SIGNUP', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Password' secureTextEntry={true} onChangeText={text => dispatch({type: 'PASSWORD_SIGNUP', text: text})}/>
        </Item>

        <Item last >
          <Input placeholder='Confirm Password' secureTextEntry={true} onChangeText={text => dispatch({type: 'CONFIRM_PASSWORD', text: text})}/>
          {signup.confirm === signup.password ? null : <Icon name='ios-close-circle' style={{color: 'red'}}/>}
        </Item>
      </Form>
    </Content>
      </Row>
      <Row style={{flex: 0}}>
        <Left>
        <Button outline bordered onPress={Actions.login}>
          <Icon name='arrow-back'/>
        </Button>
        </Left>
      <Right>
      <Button block onPress={() => {
        let data = {
          firstName: signup.firstName,
          lastName: signup.lastName,
          username: signup.username,
          password: signup.password
        };
        signup.password.match(/[A-Z]/g) === null 
        ? alert('YOUR PASSWORD MUST CONTAIN 1 CAPITAL')
        :
        signup.confirm === signup.password
        ? signupCtrl(data, dispatch)
        : null;
      }}>
        <Text> Create Account</Text>
      </Button>
      </Right>
    </Row>
    </Grid>
  </Container>
  );
});
