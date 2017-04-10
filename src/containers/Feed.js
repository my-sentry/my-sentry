import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import axios from 'axios';
import { getGroups } from '../actions/axiosController';


import { Container, Title, Content, Button, Left, Right, List, ListItem, Body, Fab, Icon, H1, H2, H3 } from 'native-base';


export default connect(({feed}) => feed)(class Feed extends Component {
  render() {
    return (
      <Container><Header /><Container>
       <List dataArray={this.props.data}
        renderRow={item =>
            <ListItem onPress={() => {
              this.props.dispatch({type: 'CURRENT_ITEM', item: item});
              setTimeout(()=> Actions.eventView({title: item.name}));
            }}>
            <Body>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
                </Body>
            </ListItem>
        }>
      </List>
      </Container>
          <ActionButton
          buttonColor='rgba(231,76,60,1)'
          onPress={() => getGroups(this.props.dispatch).then(() => Actions.eventForm()) }/>  
    
      </Container>
    );
  }
});

