import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import Datepicker from './Datepicker';
import TimePicker from './TimePicker';
import axios from 'axios';

import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form} from 'native-base';

const mapStateToProps = ({eventForms, dateReducer}) => { 
  return { form: {
    name: eventForms.name,
    location: eventForms.location,
    date: dateReducer.date,
    begin: dateReducer.start,
    end: dateReducer.end,
    description: eventForms.description,
    lat: 123456,
    long: 78910,
    groupId: 4
  }
  };
};

export default connect(mapStateToProps)(function EventForm ({form, dispatch}) {
  return (
    <Container>
      <Header />
        <Content>
        <Item stackedLabel>
          <Label>Event</Label>
          <Input onChangeText={(text) => dispatch({type: 'EVENT_NAME', text: text})}/>
        </Item>
        <Item stackedLabel>
          <Label>Location</Label>
          <Input onChangeText={(text) => dispatch({type: 'LOCATION', text: text})}/>
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
        <Item>
        <Picker
          iosHeader="Select one"
          mode="dropdown">
           <Item label="Cats" value="key0" />
                 <Item label="Dogs" value="key1" />
                 <Item label="Birds" value="key2" />
                 <Item label="Elephants" value="key3" />
            </Picker>
            </Item>
            <Item stackedLabel>
              <Label>Event Description</Label>
              <InputGroup regular>
                <Input onChangeText={(text) => dispatch({type: 'EVENT_DESC', text: text})}/>
              </InputGroup>
            </Item>
            </Content>
            <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} onPress={() => {
              console.log(form)

              let data = JSON.stringify(form);

              axios({
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              url: 'http://192.168.1.163:8000/api/events/',
              data: data
            }).then(response => response.json()
            ).catch(err =>  console.log('err', err));
            }}>
              <Text>Create Event</Text>
            </Button>
      
    </Container>
  );
});