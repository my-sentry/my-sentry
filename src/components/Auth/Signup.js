import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
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
  password: {
    fontSize: 8, 
    color: 'grey',
    marginLeft: 8
  }
};

const mapStateToProps = ({signup, popup, token}) => {
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

export default connect(mapStateToProps)(function Login ({signup, dispatch}) {
  const passwordRegex = /^(?=.*\d)([0-9a-zA-Z \W]{8,})$/g.test(signup.password);
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
      {!passwordRegex && signup.password.length
        ? <Text style={styles.password}
        >password must be atleast 8 characters long and contain letters and numbers
        </Text>
        : null
      }
      </Form>

    </Content>
      </Row>
      <Row style={{flex: 0}}>
        <Left>
        <Button outline bordered 
        onPress={() => {
          Actions.login();
        }}>
          <Icon name='arrow-back'/>
        </Button>
      </Left>
      <Right>
      <Button block onPress={() => {
        let data = {
          firstName: signup.firstName,
          lastName: signup.lastName,
          username: signup.username,
          password: signup.password,
          token: signup.token
        };

        if (signup.confirm === signup.password && passwordRegex && signup.username.length) {
          signupCtrl(data, dispatch);
        } else {
          var errorcode = signup.confirm !== signup.password ? 'Passwords don\'t match' : null;
          errorcode = !passwordRegex ? 'Password is invalid' : errorcode;
          errorcode = !signup.username.length ? 'Username is required' : errorcode;
          Actions.signupError({error: errorcode, hide: false});
        }
      }}>
        <Text> Create Account</Text>
      </Button>
      </Right>
    </Row>
    </Grid>
  </Container>
  );
});
