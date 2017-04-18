import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Text, View} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  header: {
    height: 60,
    backgroundColor: 'transparent',
  },
  body: {
    justifyContent: 'center'
  },
  menu: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0f0f0'
  },
};


const mapStateToProps = ({header}) => ({prev: header.prev, title: header.title});


export default connect(mapStateToProps)(function ({prev, title}) { 
  return (
    <Header style={styles.header} > 
    <Left> 
    {title !== 'My-Sentry' ? (
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
      <Text style={styles.text}>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</Text>
      </Body>      
         
    <Right>
      {title === 'My-Sentry' 

      ? (<Button style={styles.menu} onPress={()=> Actions.refresh({key: 'menu', open: value => !value })}>
              <Icon 
              ios='ios-menu' 
              android="md-menu" 
              />
        </Button>)
      : null
    }
    </Right>
    </Header>
  );
});

