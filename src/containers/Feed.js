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
    paddingLeft: 0,
  },
  list: {
    borderStyle: 'solid',
    borderColor: 'black',
  },
  text: {
    paddingLeft: 17,

  },
  subtext: {
    fontSize: 10,
    paddingLeft: 17,
  },
  current: {
    marginLeft: 0,
    backgroundColor: '#4C8338',
    paddingLeft: 0,
    borderWidth: 2,
  },
  danger: {
    marginLeft: 0,
    paddingLeft: 0,
    borderWidth: 2,
    backgroundColor: '#974044',
  },
  inactive: {
    marginLeft: 0,
    borderWidth: 2,
    paddingLeft: 0,

  },
};

const mapStateToProps = ({feed, auth}) => ({feed, personal: auth.id });

export default connect(mapStateToProps)(function Feed ({feed, personal, dispatch}) {
  const now = new Date();
  return (
    <Container ><Header /><Container style={styles.container}>
     <List style={styles.list}
     dataArray={feed.data}
      renderRow={item => {
        let started = new Date(item.begin).valueOf() - now.valueOf() < 0;
        let ended = new Date(item.end).valueOf() - now.valueOf() < 0;
        let personalCheck = personal === item.user_id;
        let current = (started && !ended);
        let danger = (!item.safe && ended);
        return ( <ListItem 
          style={danger ? styles.danger : current ? styles.current : styles.inactive}
          onPress={() => {
            dispatch({
              type: 'CURRENT_ITEM', 
              item: item, 
              active: started && !ended, 
              personal: personalCheck
            });
            Actions.eventView({prev: 'events', title: item.name});
          }}>
        <Body>
          <Text style={styles.text}>{item.name.length > 40 ? [...item.name.slice(0, 40), '...'].join('') : item.name}</Text>
          <Text style={styles.subtext}>{item.description}</Text>
        </Body>
        { started && !ended ? <Right><Icon name='alarm' style={{color: 'red'}} /></Right>
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

