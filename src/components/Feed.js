import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import {Actions} from 'react-native-router-flux';

import { Container, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';



export default connect()(class Feed extends Component {
  render() {
    return (
      <Container>
      <Text> FEED GOES HERE </Text>
        <Button block primary
        onPress={()=> Actions.EventForm()}
        >
          <Text>Create Event</Text>
        </Button>
      </Container>
    );
  }
});