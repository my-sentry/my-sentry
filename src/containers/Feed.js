import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import axios from 'axios';
import { getGroups } from '../actions/axiosController';


import { Container, Title, Content, Button, Left, Right, List, ListItem, Body, Fab, Icon, H1, H2, H3 } from 'native-base';

const mapStateToProps = ({feed, auth}) => ({feed, personal: auth.id });

export default connect(mapStateToProps)(function Feed ({feed, personal, dispatch}) {
  console.log('...............',feed)
  return (
    <Container><Header /><Container>
     <List style={{marginLeft: 0}}
     dataArray={feed.data}
      renderRow={item => {
        let personalCheck = personal === item.user_id;
        let activeCheck = new Date(item.begin).getTime() - Date.now() < 0; 
        return ( <ListItem 
          style={{marginLeft: 0}}
          onPress={() => {
            dispatch({
              type: 'CURRENT_ITEM', 
              item: item, 
              active: activeCheck, 
              personal: personalCheck
            });
            setTimeout(()=> Actions.eventView({prev: 'dashboard', title: item.name}));
          }}>
        <Body>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </Body>
        { activeCheck ? <Right><Icon name='alarm' style={{color: 'red'}} /></Right>
          : null
        }
        </ListItem> );
      }}>
    </List>
    </Container>
        <ActionButton
        buttonColor='rgba(231,76,60,1)'
        onPress={() => getGroups(dispatch).then(() => Actions.eventForm()) }/>  
  
    </Container>
  );
});

