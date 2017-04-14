import React, { Component } from 'react';
import Header from './Header';
import Datepicker from './Datepicker';
import TimePicker from './TimePicker';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { postEvent, getPlaces } from '../actions/axiosController';
import {
  Container, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon,
  H1, List, ListItem, InputGroup,
  Picker, Label, Item, Input, Form
} from 'native-base';


const mapStateToProps = ({eventForms, dateReducer, groups}) => {

  var begin = new Date(dateReducer.date);
  var end = new Date(dateReducer.date);

  begin.setTime(dateReducer.start.getTime());
  end.setTime(dateReducer.end.getTime());

  return {
    form: {
      name: eventForms.name,
      location: eventForms.location,
      begin: begin,
      end: end,
      description: eventForms.description,
      lat: eventForms.lat,
      long: eventForms.long,
      place_id: eventForms.place_id,
      groupId: groups.id
    },
    groups: groups.groups
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
  var grouplist = groups.map(group => (
    <Item label={group.name} value={group.id} key={group.id}/>
  ));

  return (
    <Container>

      <Header />

      <Content>

        <Item stackedLabel>
          <Label>Event Name</Label>
          <Input onChangeText={text => dispatch({type: 'EVENT_NAME', text: text})}/>
        </Item>

        <Item>
        <TextInput
        style={{flex: 1}} 
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Search Locations"
        value={form.location}
        onFocus={() => {
          dispatch({type: 'ADD_LOCATION', location: ''});
          Actions.locationSearch();
        }}
        onChangeText={text => {
          dispatch({type: 'ADD_LOCATION', location: text});
          dispatch({ type: 'UPDATE_LOC_INPUT', text });
          getPlaces(text)
          .then(res => {
            dispatch({ type: 'UPDATE_LOC_PREDICTIONS', predictions: res.data.predictions });
          });
        }}/>
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
          onValueChange={id => dispatch({type: 'CURRENT_GROUP', id: id})}
        >{grouplist}</Picker>

        <Item stackedLabel>
          <Label>Event Description</Label>
          <InputGroup regular>
            <Input onChangeText={text => dispatch({type: 'EVENT_DESC', text: text})}/>
          </InputGroup>
        </Item>

      </Content>

      <Button 
      style={styles.button} 
      onPress={() => postEvent(form)
        .then(() => {
          dispatch({type: 'RESET_DATE'});
          dispatch({type: 'RESET_EVENT_FORM'});
        })
      }>
        <Text>Create Event</Text>
      </Button>

    </Container>
  );
});
