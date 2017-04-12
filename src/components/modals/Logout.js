import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {View, TouchableHighlight, Dimensions, BackAndroid} from 'react-native';
import { Container, Title, Text, Grid, Row, Form, Content, Button, Left, Right, Body, List, ListItem, H1 } from 'native-base';
import { logoutCtrl } from '../../actions/axiosController';


export default connect()(class SignupModal extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      hide: props.hide,
    };
    this.dismissModal = this.dismissModal.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true );
  }

  dismissModal() {
    this.props.dispatch({type: 'TOGGLE_POPUP'})
    this.setState({hide: true});
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return this.state.hide
      ? (
        <View>
        </View>
      )
      : (
      <Container style={{
        position: 'absolute',
        alignSelf: 'center',
        height: height,
        width: width,
        opacity: .8,
        backgroundColor: 'rgba(155,55,55,0.5)',          
        borderStyle: 'solid',
        borderColor: '#cccccc',
        borderWidth: 1,
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
      onPress={() =>{
        this.dismissModal();
        Actions.pop();
      }} ><Text> NO</Text></Button>
    </Left>
    <Right>
      <Button block onPress={()=> {
        this.dismissModal();
        logoutCtrl(this.props.dispatch);
      }}><Text> Yes </Text>
      </Button>
    </Right>
    </Row>
  </Grid>
  </Container>
  </Container>
  );    
  }
});


