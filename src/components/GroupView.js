import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image } from 'native-base';

const styles = {
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  }
};

export default function EventView (state) {
  return (
    <Container>
      <Header />
      <Text>GROUP VIEW</Text>

    </Container>
  );
}

  //<MapView
  //style={styles.map}
  //initialRegion={coordinates}
  ///>






