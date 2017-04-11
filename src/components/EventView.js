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
const mapStateToProps = ({events}) => { 
  return {
    isPersonal: events.isPersonal,
    active: events.active,
    name: events.id.name,
    begin: events.id.begin,
    end: events.id.end,
    description: events.id.description
  };
};



export default connect(mapStateToProps)(function EventView (state) {
  const {active, isPersonal, name, begin, end, description, dispatch} = state;
  return (
    <Container>

      <Header title={name}/>
        <Content>
          <Card>
            <CardItem>
              <Body>
              {active ? (
              <H1>Timer will go here</H1>
              ) : (
              <H1>Start Time</H1>
              )}
              </Body>
            </CardItem> 
          </Card>
          <Card>
            <CardItem header>
              <Text style={styles.text}>{description}</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text style={styles.text}>{begin}</Text>
              <Text style={styles.text}>{end}</Text>
              <Text style={styles.text}>Group</Text>
            </Body>
            </CardItem> 
          </Card>
        </Content>
      {active && isPersonal ? (
      <Container>
      <Button block style={styles.button}>
      <Text>Safe</Text>
      </Button>
      <Button block style={styles.button}>
      <Text>Extend Event</Text>
      </Button>
      <Button danger block style={styles.button}>
      <Text>Emergency Alert</Text>
      </Button>
      </Container>
			) : ( 
				<Text>Map will go here</Text>
			)}
    </Container>
  );
});

  //<MapView
  //style={styles.map}
  //initialRegion={coordinates}
  ///>






