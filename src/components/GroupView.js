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

const mapStateToProps = ({groups, auth}) => ({isAdmin: groups.id.admin_user === Number(groups.id.userId)});

export default connect(mapStateToProps)(function EventView ({isAdmin, dispatch}) {
  return isAdmin 
  ? (
    <Container>
      <Header />
      <Text>ADMIN VIEW</Text>

    </Container>
  )
  : (
    <Container>
      <Header />
      <Text>MEMBER VIEW</Text>

    </Container>
  );
});

  //<MapView
  //style={styles.map}
  //initialRegion={coordinates}
  ///>






