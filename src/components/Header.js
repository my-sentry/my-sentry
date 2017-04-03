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
  return {drawer: state.drawer};
};

// this has to be called MyHeader instead of Header because i am importing Header

export default connect()(function MyHeader (state, props) { 
  return (
    <Header dark> 
    <Left>
      <Button>
        <Icon 
          name='arrow-back' 
          style={styles.menu}
          onPress={()=> Actions.pop()}
          />
      </Button>
    </Left>

      <Body style={styles.header}>
        <Text></Text>
      </Body>      
         
    <Right>
      <Button>
        <Icon 
        ios='ios-menu' 
        android="md-menu" 
        style={styles.menu}
        onPress={()=> Actions.refresh({key: 'menu', open: value => !value })}
        />
      </Button>
    </Right>
    </Header>
  );
});

