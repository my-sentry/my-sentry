import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Text, View} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  header: {
    backgroundColor: 'rgba(60,60,60,1)',
  },
  body: {
    justifyContent: 'center'
  },
  menu: {
    backgroundColor: 'rgba(60,60,60,0.8)',
  }
};


const mapStateToProps = ({header}) => ({prev: header.prev, title: header.title});

// this has to be called MyHeader instead of Header because i am importing Header

export default connect(mapStateToProps)(function MyHeader ({prev, title}) { 
  return (
    <Header style={styles.header} > 
    <Left> 
    {title !== 'events' ? (
      <Button style={styles.menu} onPress={()=> Actions.pop()}>
        <Icon 
          name='arrow-back' 
          style={styles.menu}          
          />
      </Button>
      ) : null
  }
    </Left>

      <Body style={styles.body}>
      {title === 'events' 
      ? <Text>My-Sentry</Text>
      : <Text>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</Text>
    }
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

