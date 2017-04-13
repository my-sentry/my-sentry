import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Label, Item, Input, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image, Form } from 'native-base';
import { removeUserFromGroup, getPlaces, getPlaceDetails } from '../actions/axiosController';

var mapStateToProps = function({ searchLocation }) {
  return { predictions: searchLocation.predictions };
};

var selectLocation = function(placeId) {
  return getPlaceDetails(placeId)
    .then(res => {
      console.log('Response: ', res);
    });
};

export default connect(mapStateToProps)(function LocationSearch({ predictions, dispatch }) {
  return (
    <Container>

      <Header />

      <Content>

        <Item>
          <Input placeholder="Search Locations" onChangeText={text => {
            dispatch({ type: 'UPDATE_LOC_INPUT', text });
            getPlaces(text)
            .then(res => {
              dispatch({ type: 'UPDATE_LOC_PREDICTIONS', predictions: res.data.predictions });
            });
          }}/>
        </Item>

        {predictions.map(prediction => (
          <Button key={prediction.id} block light onPress={() => selectLocation(prediction.place_id)}>
            <Text>{prediction.description}</Text>
          </Button>
        ))}

      </Content>

    </Container>
  );
});
