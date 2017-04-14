import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Text, View} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  header: {
    backgroundColor: '#d0d0da'
  },
  body: {
    flex: 0,
    justifyContent: 'center'
  },
  menu: {
    backgroundColor: '#d0d0da',
  }
};


const mapStateToProps = ({header}) => ({prev: header.prev, title: header.title});

// this has to be called MyHeader instead of Header because i am importing Header

export default connect(mapStateToProps)(function MyHeader ({prev, title}) { 
  return (
    <Header style={styles.header} > 
    <Left> 
    {title !== 'events' ? (
      <Button style={styles.menu} onPress={()=> Actions[prev]()}>
        <Icon 
          name='arrow-back' 
          style={styles.menu}          
          />
      </Button>
      ) : null
  }
    </Left>

      <Body style={styles.body}>
        <Text>{title.length > 30 ? `${title.slice(0,30)}...` : title}</Text>
      </Body>      
         
    <Right>
      <Button style={styles.menu} onPress={()=> Actions.refresh({key: 'menu', open: value => !value })}>
        <Icon 
        ios='ios-menu' 
        android="md-menu" 
        />
      </Button>
    </Right>
    </Header>
  );
});

