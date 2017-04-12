import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, TouchableHighlight, Dimensions, BackAndroid} from 'react-native';
import { Container, Title, Text, Content, Button, Body, List, ListItem, H1 } from 'native-base';


export default connect()(class SignupModal extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      message: props.error,
      hide: props.hide,
    };
    this.dismissModal = this.dismissModal.bind(this);
  }
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true );
  }

  dismissModal() {
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
        <Button 
        transparent
        onPress={() => {
          this.props.dispatch({type: 'TOGGLE_POPUP'});
          Actions.pop();
        }}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: height / 3,
          height: 145,
          width: 250,
          borderRadius: -1,
          backgroundColor: 'rgba(240,240,240,0.95)',          
          justifyContent: 'center',
          borderWidth: .2,
          borderColor: 'black'
        }}>
          <Text style={{alignSelf: 'center'}}>PLEASE ENTER VALID INFORMATION</Text>
        </Button>
      );    
  }
});


