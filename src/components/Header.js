import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Text, View} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  header: {
    elevation: 8,
    borderBottomColor: null,
    borderColor: 'transparent',
    height: 50,
    backgroundColor: '#1f1f1f',
  },
  body: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    paddingLeft: 30,
  },
  menu: {
    elevation: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  fakemenu: {
    elevation: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    paddingRight: 10,
  },  
  text: {
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0f0f0'
  },
  fake: {
    paddingTop: 15,
    paddingLeft: 25,
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0f0f0'
  },
  nullify: {
    margin: 0, 
    padding: 0, 
    alignSelf: null, 
    flex: null
  },
};


const mapStateToProps = ({header}) => ({prev: header.prev, title: header.title});


export default connect(mapStateToProps)(function ({prev, title}) { 
  return (
    <Header style={styles.header} > 
    <Left style={{flex: null}}> 
    {title !== 'My-Sentry' ? (
      <Button 
      onPress={()=> Actions.pop()}
      style={styles.menu} >
        <Icon 
          name='arrow-back' 
          style={styles.menu}          
          />
      </Button>
      ) : <Button disabled style={styles.fakemenu}/>
  }
    </Left>
    <Body style={styles.nullify} >
      <Text style={title !== 'My-Sentry' ? styles.text : styles.fake }>{title.length > 25 ? `${title.slice(0, 25)}...` : title}</Text>
    </Body>
         
    <Right>
      {title === 'My-Sentry' 

      ? (<Button 
        style={styles.menu} 
        onPress={()=> Actions.refresh({key: 'menu', open: value => !value })}>
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

