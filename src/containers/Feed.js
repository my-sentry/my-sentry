import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import axios from 'axios';


import { Container, Title, Content, Button, Left, Right, List, ListItem, Body, Fab, Icon, H1, H2, H3 } from 'native-base';

var mock = [];

// axios('http://192.168.1.163:8000/api/events')
//   .then(res=> console.log('GOOD', res)).catch(err => console.log('ERR', err))
//   .then(res=> mock = res);


export default connect()(class Feed extends Component {
  render() {
    return (
      <Container><Header /><Container>
       <List dataArray={mock}
        renderRow={item =>
            <ListItem onPress={() => {
              this.props.dispatch({type: 'UPDATE_ITEM', item: item});
              setTimeout(()=> Actions.eventView({title: item.name}));
            }}>
            <Body>
                <H3>{item.name}</H3>
                <Text>{item.description}</Text>
                </Body>
            </ListItem>
        }>
      </List>
      </Container>
          <ActionButton
          buttonColor='rgba(231,76,60,1)'
          onPress={() => Actions.eventForm()}/>  
    
      </Container>
    );
  }
});

