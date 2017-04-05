import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Header from './authHeader';
import { connect } from 'react-redux';


import { Container, Title, Content, Label, Form, Button, Item, Icon, Right, Body, Input, H1 } from 'native-base';


// const mapStateToProps = state => { 
//   return {state: state};
// };

export default connect()(function Login (state) {
  return (
   <Container>
    <Content>
      <Form>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input/>
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input />
        </Item>
      </Form>
      <Button onPress={()=> Actions.renderedmodal()}>
        <Icon 
          name='arrow-back' 
          
          />
          </Button>
    </Content>
  </Container>
  );
})