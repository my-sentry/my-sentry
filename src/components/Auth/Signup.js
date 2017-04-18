import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dimensions, Keyboard } from 'react-native';
import { Container, Title, Content, Label, Form, Button, Item, Text, Icon, Left, Right, Body, Input, H1, Grid, Row } from 'native-base';
import { signupCtrl } from '../../actions/axiosController';
import {styles } from './Login';
var {height, width} = Dimensions.get('window');


const mapStateToProps = ({signup, token}) => {
  return { signup: {
    firstName: signup.firstName,
    lastName: signup.lastName,
    username: signup.userName,
    password: signup.password,
    confirm: signup.confirm,
    token: token
  }
  };
};
const signupOnPress = (passwordRegex, signup, dispatch) => {
  let { firstName, lastName, username, password, token, confirm } = signup;
  let data = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    token: token
  };

  if (confirm === password && passwordRegex && username.length) {
    signupCtrl(data, dispatch);
  } else {
    var errorcode = confirm !== password ? 'Passwords don\'t match' : null;
    errorcode = !passwordRegex ? 'Password is invalid' : errorcode;
    errorcode = !username.length ? 'Username is required' : errorcode;
    Actions.errorModal({
      clear: {type: 'CLEAR_SIGNUP'},
      error: errorcode
    });
  }
  Keyboard.dismiss();
};

export default connect(mapStateToProps)(function Login ({dispatch, signup}) {
  const passwordRegex = /^(?=.*\d)([0-9a-zA-Z \W]{8,})$/g.test(signup.password);
  
  return (
   <Container style={styles.container}>
      <Grid style={{flex: 1}}>
      <Row >
    <Content style={styles.content}>
      <Form style={styles.form} >
        <Item >
          <Input 
          placeholder='First Name' 
          value={signup.firstName} 
          onChangeText={text => dispatch({type: 'FIRST_NAME', text: text})}/>
        </Item>

        <Item >
          <Input 
          placeholder='Last Name' 
          value={signup.lastName} 
          onChangeText={text => dispatch({type: 'LAST_NAME', text: text})}/>
        </Item>

        <Item >
          <Input placeholder='Username' 
          value={signup.username} 
          onChangeText={text => dispatch({type: 'USERNAME_SIGNUP', text: text})}/>
        </Item>

        <Item >
          <Input 
          placeholder='Password' 
          value={signup.password} 
          secureTextEntry={true} 
          onChangeText={text => dispatch({type: 'PASSWORD_SIGNUP', text: text})}/>
        </Item>

        <Item last style={{borderColor: 'transparent'}}>
          <Input 
          placeholder='Confirm Password' 
          value={signup.confirm} 
          secureTextEntry={true} 
          onChangeText={text => dispatch({type: 'CONFIRM_PASSWORD', text: text})}/>

          {signup.confirm === signup.password ? null : <Icon name='ios-close-circle' style={{color: 'red'}}/>}
        </Item>
      {!passwordRegex && signup.password.length
        ? <Text style={styles.text}
        >password must be atleast 8 characters long and contain letters and numbers
        </Text>
        : null
      }
      </Form>

    <Row style={styles.confirm}>
      <Button 
        style={styles.confirmButton} 
        block light
        onPress={() => signupOnPress(passwordRegex, signup, dispatch)}
        ><Text> Create Account</Text>
      </Button>
      </Row>

      <Row style={styles.textbox}>
      <Button 
        transparent 
        style={styles.back}
        onPress={() => {
          Keyboard.dismiss();
          dispatch({type: 'CLEAR_SIGNUP'});
          Actions.login();
        }}><Text style={styles.text}>Already have an account ?</Text>
        </Button>
        </Row>

    </Content>
    </Row>
    </Grid>
  </Container>
  );
});
