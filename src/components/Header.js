import React, {Component} from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
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


// this has to be called MyHeader instead of Header because i am importing Header

export default connect()(function MyHeader () {
  return (
    <Header> 
    <Left>
      <Button>
        <Icon 
          name='arrow-back' 
          style={styles.menu}
          onPress={()=> console.log('back')}
          />
      </Button>
    </Left>

      <Body style={styles.header}>
        <Text>Dashboard</Text>
      </Body>      
         
    <Right>
      <Button>
        <Icon 
        ios='ios-menu' 
        android="md-menu" 
        style={styles.menu}
        onPress={()=> console.log('hamburger')}
        />
      </Button>
    </Right>
    </Header>
  );
});