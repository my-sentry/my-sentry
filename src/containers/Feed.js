import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import { getGroups } from '../actions/axiosController';
import { Container, Title, Content, Button, Left, Right, List, ListItem, Body, Fab, Icon, H1, H2, H3 } from 'native-base';

const styles = {
  container: {
    backgroundColor: '#cfcccc',
  }
};

const mapStateToProps = ({feed, auth}) => ({feed, personal: auth.id });

export default connect(mapStateToProps)(function Feed ({feed, personal, dispatch}) {
  console.log(feed.data[0].begin);
  return (
    <Container ><Header /><Container style={styles.container}>
     <List style={{marginLeft: 0}}
     dataArray={feed.data}
      renderRow={item => {

        let personalCheck = personal === item.user_id;
        let activeCheck = new Date(item.begin).getTime() - Date.now() < 0; 
        return ( <ListItem 
          onPress={() => {
            dispatch({
              type: 'CURRENT_ITEM', 
              item: item, 
              active: activeCheck, 
              personal: personalCheck
            });
            Actions.eventView({prev: 'events', title: item.name});
          }}>
        <Body>
          <Text>{item.name.length > 40 ? [...item.name.slice(0, 40), '...'].join('') : item.name}</Text>
          <Text style={{fontSize: 10}}>{item.description}</Text>
        </Body>
        { activeCheck ? <Right><Icon name='alarm' style={{color: 'red'}} /></Right>
          : null
        }
        </ListItem> );
      }}>
    </List>
    </Container>
        <ActionButton
        bgColor='green'
        buttonColor='rgba(231,76,60,1)'
        onPress={async () => {
          await getGroups(dispatch);
          Actions.eventForm();
        }}/>  
  
    </Container>
  );
});

