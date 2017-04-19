import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage, Keyboard, Dimensions} from 'react-native';
import { Container, Title, Left, Right, Content, Label, Form, Button, Text, Item, Icon, Spinner, Body, Input, H1, Grid, Row } from 'native-base';
import { loginCtrl } from '../../actions/axiosController.js';
const {height, width} = Dimensions.get('window');

export var styles = {
  content: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1f1f1f'
  },
  item: {
    backgroundColor: '#a0a',
    flex: 1
  },
  form: {
    backgroundColor: '#cccccc',
    width: (width * .90),
    alignSelf: 'center'
  },
  confirm: {
    paddingTop: 15,
    alignSelf: 'center'
  },
  confirmButton: {
    width: 150
  },
  textbox: {
    paddingTop: 0,
    alignSelf: 'center'
  },
  back: {
    paddingTop: 0,
    marginTop: 0,
  },
  text: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'sans-serif',
    alignSelf: 'center'
  }
};

const mapStateToProps = ({login, token}) => {
  return { form: {
    username: login.username,
    password: login.pw,
    token: token
  }};
};

export default connect(mapStateToProps)(function Login ({form, dispatch}) {
  return (
   <Container style={styles.container}>
    <Grid style={{flex: 1}}>
    <Row >
    <Content style={styles.content}>
    <Form style={styles.form} >

        <Item style={{borderColor: 'transparent'}}>
          <Input 
          placeholder='Username' 
          autoCapitalize={'none'} 
          value={form.username} 
          onChangeText={text => dispatch({type: 'USERNAME', text: text})}/>
        </Item>

        <Item last >
          <Input 
          autoCapitalize={'none'} 
          value={form.password} 
          placeholder='Password'
          secureTextEntry={true} 
          onChangeText={text => dispatch({type: 'PASSWORD', text: text})}/>
        </Item>
        
    </Form>

    <Row style={styles.confirm}>
      <Button 
      style={styles.confirmButton} 
      block light
      onPress={()=> {
        Keyboard.dismiss();
        loginCtrl(form, dispatch);
      }}><Text> LOGIN </Text>
      </Button>
      </Row>

      <Row style={styles.textbox}>
      <Button transparent
        onPress={() => {
          Keyboard.dismiss();
          Actions.signup();
        }}
        style={styles.back}
        ><Text style={styles.text}>Dont Have an account?</Text>
      </Button>
    </Row>

    </Content>
    </Row>
  </Grid>
  </Container>
  );
});
