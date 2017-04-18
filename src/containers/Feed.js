import React, {Component} from 'react';
import { Text, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import { getGroups } from '../actions/axiosController';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Title, Content, Button, Left, Right, List,Grid, Row, ListItem, Body, Fab, H1, H2, H3 } from 'native-base';
const {height, width} = Dimensions.get('window');

const styles = {
  container: {
    paddingLeft: 0,
    top: 35,
    height: 420,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  content: {
    backgroundColor: '#4F4F4F',
  },
  list: {
    backgroundColor: '#c4cc4c',
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#4C8338',
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
    paddingLeft: 0,
    borderWidth: 2,
  },
  danger: {
    marginLeft: 0,
    paddingLeft: 0,
    borderWidth: 2,
    backgroundColor: '#ccc2cd',
  },
  inactive: {
    marginLeft: 0,
    borderWidth: 2,
    paddingLeft: 0,

  },
  iconRight: {
    width: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: null,
  },
  warningIcon: {
    width: 20,
    paddingLeft: 5,
    margin: null,
    color: 'red', 
    flex: 0
  },
  activeIcon: {
    width: 20,
    paddingLeft: 5,
    margin: null,
    color: 'green', 
    flex: 0
  },
  iconRightText: {
    paddingLeft: 32.5,
    margin: null,
    flex: 0,
    fontSize: 8,
  },
  confirm: {
    flex:0.75,
    paddingTop: 30,
    alignSelf: 'center'
  },
  confirmButton: {
    width: 200
  },
  textbox: {
    paddingTop: 0,
    alignSelf: 'center'
  },
};

const mapStateToProps = ({feed, auth}) => ({feed, personal: auth.id });

export default connect(mapStateToProps)(function Feed ({feed, personal, dispatch}) {
  const now = new Date();
  // feed.data[1].safe = 1
  feed.data[2].safe = 1
  // feed.data[3].safe = 1
  return (
    <Container><Header /><Grid><Row style = {{flex: 4}}>
    <Content style={styles.container}>
     <List style={styles.container}
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
        { danger ? <Right style={styles.iconRight}><Text style={styles.iconRightText}>Danger!</Text><Icon name='circle' style={styles.warningIcon} /></Right>
          : current ? <Right style={styles.iconRight}><Text style={styles.iconRightText}>Active!</Text><Icon name='circle' style={styles.activeIcon} /></Right>
          : null }
      
        </ListItem> );
      }}>
    </List></Content>
    </Row>
    <Row style={styles.confirm}>
        <Button full
        outline light rounded
        style={styles.confirmButton}
        bgColor='green'
        buttonColor='rgba(231,76,61,1)'
        onPress={async () => {
          await getGroups(dispatch);
          Actions.eventForm();
        }}><Text style={styles.textbox}>Create a new Event</Text></Button></Row> 
    </Grid>
    </Container>
  );
});

