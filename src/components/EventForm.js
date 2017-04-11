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
    groupId: groups.id
  }, groups: groups.groups
  };
};


const styles = {
  button: {
    alignSelf: 'center',
    marginTop: 20, 
    marginBottom: 20 
  }
};


export default connect(mapStateToProps)(function EventForm ({form, groups, dispatch}) {
  var grouplist = groups.map(group => <Item label={group.name} value={group.id} key={group.id}/> );
  
  //initializing the picker to grouplist[0]
  // dispatch({type: 'CURRENT_GROUP', id: grouplist[0].id});
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
        
        <Picker 
        mode='dropdown'
        style={{width: 300}}
        iosHeader="Select one"
        selectedValue={form.groupId} 
        onValueChange={id => dispatch({type: 'CURRENT_GROUP', id: id})}>
        {grouplist}           
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