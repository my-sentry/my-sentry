import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
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


   // const initialRegion = {
   //    latitude: 37.78825,
   //    longitude: -122.4324,
   //    latitudeDelta: 0.0922,
   //    longitudeDelta: 0.0421,
   //  };
  

const mapStateToProps = state => { 
  return {
  	active: state.events.active
  	//isPersonal: state.events.isPersonal
  };
};



export default connect()(function EventView (state) {
  return (
    <Container>

    	<Header />
    		<Content>
   				<Card>
   					<CardItem>
   						<Body>
   						{state.active ? (
   							<H1>Timer will go here</H1>
   							) : (
   							<H1>Start Time</H1>
   							)}
   						</Body>
   					</CardItem> 
   				</Card>
   				<Card>
   					<CardItem header>
   						<Text  style={styles.text}>Event Descrition</Text>
   					</CardItem>
   					<CardItem>
   						<Body>
   							<Text style={styles.text}>Location</Text>
   							<Text style={styles.text}>Start</Text>
   							<Text style={styles.text}>End</Text>
   							<Text style={styles.text}>Group</Text>
   							<Text style={styles.text}>Descrition</Text>
   						</Body>
   					</CardItem> 
   				</Card>
    		</Content>
            <Container>
            {state.active && state.isPersonal ? (
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
    </Container>
  );
});

//<MapView
              		//style={styles.map}
              		//initialRegion={coordinates}
            	///>






