import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import {Actions} from 'react-native-router-flux';
import Datepicker from './Datepicker';
import TimePicker from './TimePicker';
import { postEvent } from '../actions/axiosController';


import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form} from 'native-base';

const mapStateToProps = ({eventForms, dateReducer, groups}) => { 
  return { form: {
    name: eventForms.name,
    location: eventForms.location,
    date: dateReducer.date,
    begin: dateReducer.start,
    end: dateReducer.end,
    description: eventForms.description,
    //lat and long is hardcoded untill maps is deployed
    lat: 123456,
    long: 78910,
    // group id is currently hardcoded
    groupId: 3
  }
  };
};


const styles = {
  button: {
    alignSelf: 'center',
    marginTop: 20, 
    marginBottom: 20 
  }
};


export default connect(mapStateToProps)(function EventForm ({form, dispatch}) {
  return (
    <Container>
      <Header />
        <Content>
        <Item stackedLabel>
          <Label>Event</Label>
          <Input onChangeText={text => dispatch({type: 'EVENT_NAME', text: text})}/>
        </Item>
        <Item stackedLabel>
          <Label>Location</Label>
          <Input onChangeText={text => dispatch({type: 'LOCATION', text: text})}/>
        </Item>
        <Item>
          <InputGroup>
            <Datepicker />
          </InputGroup>
        </Item>
        <Item>
        <InputGroup>
          <Icon name="ios-alarm"/>
          <TimePicker type={'START'} />
        
          <Icon name="ios-alarm"/>
          <TimePicker type={'END'} />

        </InputGroup>
        </Item>
        
        <Picker style= {{width: 100}}>
           
        </Picker>
            
            <Item stackedLabel>
              <Label>Event Description</Label>
              <InputGroup regular>
                <Input onChangeText={text => dispatch({type: 'EVENT_DESC', text: text})}/>
              </InputGroup>
            </Item>
            </Content>
            <Button style={styles.button} onPress={() => postEvent(form)}>
              <Text>Create Event</Text>
            </Button>
      
    </Container>
  );
});