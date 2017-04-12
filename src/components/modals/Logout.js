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
        top: height / 3,
        height: 105,
        width: 250,
        opacity: .8,
        backgroundColor: 'rgba(155,155,155,0.8)',          
        borderStyle: 'solid',
        borderColor: '#cccccc',
        borderWidth: 1,
      }}>
    <Grid style={{flex: 1}}>
    <Row >
    <Text> Are you sure</Text>
    </Row>
    <Row style={{flex: 0}}>
    <Left>
      <Button block bordered 
      onPress={() =>{
        this.dismissModal()
      }} ><Text> NO</Text></Button>
    </Left>
    <Right>
      <Button block onPress={()=> {
        this.dismissModal()
        logoutCtrl(this.props.dispatch)
      }}><Text> Yes </Text>
      </Button>
    </Right>
    </Row>
  </Grid>
  </Container>
  );    
  }
});


