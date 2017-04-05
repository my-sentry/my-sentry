import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import Datepicker from './Datepicker';
import TimePicker from './TimePicker';

import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, List, ListItem, InputGroup, Picker, Label, Item, Input, Form} from 'native-base';



export default function EventForm () {
  return (
    <Container>
      <Header />
        <Content>
        <Item stackedLabel>
          <Label>Event</Label>
          <Input />
        </Item>
        <Item stackedLabel>
          <Label>Location</Label>
          <Input />
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
                <Input />
              </InputGroup>
            </Item>
            </Content>
            <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
              <Text>Create Event</Text>
            </Button>
      
    </Container>
  );
};