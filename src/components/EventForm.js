import React, { Component } from 'react';
import Header from './Header';
import Datepicker from './Datepicker';
import TimePicker from './TimePicker';
import moment from 'moment';
import { Text, View, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { postEvent, getPlaces } from '../actions/axiosController';
import {
  Container, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon,
  H1, List, ListItem, InputGroup,
  Picker, Label, Item, Input, Form,
  Grid, Row,
} from 'native-base';
var {height, width} = Dimensions.get('window');


export var styles = {
  container: {
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
  },
  content: {
    padding: 0,
    alignSelf: 'center',
    height: 400,
  },
  item: {
    backgroundColor: '#a0a',
  },
  form: {
    padding: 0,
    backgroundColor: '#cccccc',
    width: width,
  },
  formAlt: {
    padding: 0,
    backgroundColor: '#cccccc',
    height: height / 1.8,
    width: width,
  },
  confirm: {
    height: 125,
    paddingTop: 20,
    alignSelf: 'center'
  },
  confirmButton: {
    width: 150
  },
  textbox: {
    paddingTop: 0,
    alignSelf: 'center'
  },
  back: {
    paddingTop: 0,
    marginTop: 0,
  },
  row: {
    height: 400,
    position: 'absolute',
  },
  text: {
    paddingLeft: 20,
  },
  list: {
    height: 300,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 2,
  },
  listItem: {
    elevation: .5,
    marginLeft: 0,
    paddingLeft: 0,
    borderWidth: 2,
    backgroundColor: '#ccc2cd',
    margin: 0,
    paddingLeft: 10,
  },
  listItemAlt: {
    marginLeft: 0,
    paddingLeft: 0,
    borderWidth: 2,
    backgroundColor: '#ccc',
    margin: 0,
    paddingLeft: 10,
    borderColor: 'transparent',
  },
  addMember: {
    marginLeft: 0,
    paddingLeft: 0,
    borderWidth: 2,
    backgroundColor: '#ccc',
    margin: 0,
    paddingLeft: 10,
    borderColor: 'transparent',
    height: 50,
  },
};


const mapStateToProps = ({eventForms, dateReducer, groups}) => {

  return {
    form: {
      name: eventForms.name,
      location: eventForms.location,
      begin: dateReducer.start,
      end: dateReducer.end,
      description: eventForms.description,
      lat: eventForms.lat,
      long: eventForms.long,
      place_id: eventForms.place_id,
      groupId: groups.id
    },
    groups: groups.groups
  };
};

export default connect(mapStateToProps)(function EventForm ({form, groups, dispatch}) {
  var grouplist = groups.map(group => (
    <Item label={group.name} value={group.id} key={group.id}/>
  ));

  return (
    <Container style={styles.container}>

      <Header />

      <Grid style={{flex: 1}}>
        <Row >
          <Content style={styles.content}>
            <Form style={styles.form} >

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

            </Form>

            <Row style={styles.confirm}>
              <Button
                style={styles.confirmButton}
                onPress={() => postEvent(form)
                  .then(() => {
                    dispatch({type: 'RESET_DATE'});
                    dispatch({type: 'RESET_EVENT_FORM'});
                  })}>
                <Text style={styles.text}>Create Event</Text>
              </Button>
            </Row>

          </Content>
        </Row>
      </Grid>
    </Container>
  );
});
