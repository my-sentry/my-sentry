import React, {Component} from 'react';
import { Text, View, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Container, Title, Content, Footer, FooterTab, Button, Body, Icon, H1 } from 'native-base';
import axios from 'axios';
import URL_CONFIG from '../../config/config';

/*  to remove the hacky settimeouts,
this all has to be reformatted to THUNK. aka async redux promises
it needs to do the actions asynchrounously, else the first function blocks.
*/
export default connect()(function SideMenu ({dispatch}) {
  return (
    <Container>
    <Content>

    <H1 onPress={() => {
      axios({
        method: 'post',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: `${URL_CONFIG}/api/users/logout`
      }).then(() => Actions.loading());
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      dispatch({type: 'LOGOUT'});
    }}>LOGOUT</H1>

    <H1 onPress={() => {

      axios(`${URL_CONFIG}/api/groups`)
      .then(res => dispatch({type: 'UPDATE_GROUPS', data: res.data}))
        .catch(err => console.log('err', err))
        .then(() => Actions.groups());
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      
    }}>Groups</H1>

    <H1 onPress={() =>{
      setTimeout(() =>Actions.refresh({key: 'menu', open: value => !value }));
      Actions.dashboard();
    }}>EVENTS</H1>
    </Content>
    </Container>
  );
});