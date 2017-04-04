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
  console.log(state)
  return {title: state.header.title};
};

// this has to be called MyHeader instead of Header because i am importing Header

export default connect(mapStateToProps)(function MyHeader (state) { 
  console.log(">>", state)
  const title = state.title
  return (
    <Header > 
      <Body style={styles.header}>
        <Text>{title.toUpperCase()}</Text>
      </Body>      
    </Header>
  );
});

