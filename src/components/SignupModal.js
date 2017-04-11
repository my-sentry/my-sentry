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
    // bind functions
    this.dismissModal = this.dismissModal.bind(this);
  }
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true );
  }

  dismissModal() {
    this.setState({hide: true});
  }

  // show or hide Modal based on 'hide' prop
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
          this.props.dispatch({type: 'TOGGLE_BUTTON'});
          Actions.pop();
        }}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: height / 3,
          height: 225,
          width: 250,
          borderRadius: 10,
          opacity: .8,
          backgroundColor: 'rgba(155,155,155,0.8)',          
          justifyContent: 'center',
          borderStyle: 'solid',
          borderColor: '#cccccc',
          borderWidth: 1,
        }}>
          <Text style={{alignSelf: 'center'}}>PLEASE ENTER VALID INFORMATION</Text>
        </Button>
      );    
  }
});


