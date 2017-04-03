import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  header: {
    flex: 0,
    justifyContent: 'center'
  },
  menu: {
    fontSize: 20, 
    color: 'black'
  }
};


const mapStateToProps = state => { 
  return {scene: state.scene};
};

// this has to be called MyHeader instead of Header because i am importing Header

export default connect(mapStateToProps)(function MyHeader ({scene}) { 
  console.log(scene)
  return (
    <Header > 
    <Left>
      <Button onPress={()=> Actions.pop()}>
        <Icon 
          name='arrow-back' 
          style={styles.menu}
          
          />
      </Button>
    </Left>

      <Body style={styles.header}>
        <Text></Text>
      </Body>      
         
    <Right>
      <Button onPress={()=> Actions.refresh({key: 'menu', open: value => !value })}
>
        <Icon 
        ios='ios-menu' 
        android="md-menu" 
        style={styles.menu}
        />
      </Button>
    </Right>
    </Header>
  );
});

