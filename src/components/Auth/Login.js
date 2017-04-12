import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import { Container, Title, Left, Right, Content, Label, Form, Button, Text, Item, Icon, Spinner, Body, Input, H1, Grid, Row } from 'native-base';
import { loginCtrl } from '../../actions/axiosController';



const styles = {
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#a0a',
    flex: 1
  },
  form: {
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
    <Content>
    <Form style={styles.form} >
        <Item stackedLabel >
          <Label>Username</Label>
          <Input value={form.username} 
          onChangeText={text => dispatch({type: 'USERNAME', text: text})}/>
        </Item>
        <Item stackedLabel last >
          <Label>Password</Label>
          <Input value={form.password} 
          secureTextEntry={true} 
          onChangeText={text => dispatch({type: 'PASSWORD', text: text})}/>
        </Item>
    </Form>
    </Content>
    </Row>
    <Row style={{flex: 0}}>
    <Left>
      <Button block bordered onPress={Actions.signup} ><Text> SIGNUP</Text></Button></Left>
      <Right>
      <Button block onPress={()=> loginCtrl(form, dispatch)}><Text> LOGIN </Text>
      </Button></Right>
    </Row>
  </Grid>
  </Container>
  );
});
