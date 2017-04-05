import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';



import { Container, Title, Content, Button, Left, Right, List, ListItem, Body, Fab, Icon, H1, H2, H3 } from 'native-base';

var mock = [{id: null, name: 'test', description: 'some description here'}];

// fetch('http://192.168.1.163:8000/api/events')
//   .then(res=> res.json()).then(res=> mock = res);


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
    
      </Container>
    );
  }
});

