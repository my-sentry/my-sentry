import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {Text} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { Container, Header, Title, Content, Button, Body, H1 } from 'native-base';

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

export default connect(({header}) => ({title: header.title}))(function ({title}) { 
  return (
    <Header > 
      <Body style={styles.header}>
        <Text>{title === 'Dashboard' ? 'LOGIN' : title.toUpperCase()}</Text>
      </Body>      
    </Header>
  );
});

