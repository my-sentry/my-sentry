import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import GoogleStaticMap from'react-native-google-static-map';
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
  },
  timer: {
    fontSize: 40,
    marginLeft: 110,
  }
};
const mapStateToProps = ({events}) => { 
  console.log(events);
  return {
    isPersonal: events.isPersonal,
    active: events.active,
    name: events.id.name,
    begin: Date([events.id.begin]),
    end: Date([events.id.end]),
    description: events.id.description,
    lat: events.id.lat,
    long: events.id.long,
    place_id: events.id.place_id,
    group: events.id.groupName
  };
};



export default connect(mapStateToProps)(function EventView (state) {
  const {active, isPersonal, name, begin, end, description, lat, long, group} = state;
  console.log(state);
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
              <H1 style={styles.timer}>{begin.slice(16, 25)}</H1>
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
              <Text style={styles.text}>Start: {begin.slice(0, 25)}</Text>
              <Text style={styles.text}>End: {end.slice(0, 25)}</Text>
              <Text style={styles.text}>Group Name: {group}</Text>
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
				 <GoogleStaticMap  
            latitude= {lat.toString()}
            longitude= {long.toString()}
            zoom={13}
            size={{ width: 400, height: 300 }}
        />
			)}
    </Container>
  );
});







