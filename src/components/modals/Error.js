import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, Dimensions} from 'react-native';
import { Text, Button } from 'native-base';


export default connect()(function errorModal ({dispatch, clear, error}) { 
  var {height, width} = Dimensions.get('window');
  return (
      <Button 
      transparent
      onPress={() => {
        dispatch(clear);
        Actions.pop();
      }}
      style={{
        position: 'absolute',
        alignSelf: 'center',
        height: height,
        width: width,
        borderRadius: -1,
        backgroundColor: 'rgba(155,55,55,1)',          
        justifyContent: 'center',
        borderWidth: .2,
        borderColor: 'black'
      }}>
        <Text style={{alignSelf: 'center'}}>{error}</Text>
      </Button>
  );   
});


