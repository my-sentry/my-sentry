import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import Header from './Header';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem } from 'native-base';

// const mapStateToProps = state => { 
//   return {state: state};
// };

export default connect()(function EventView (state) {
  return (
    <Container>

    	<Header />
    		<Content>
   				<Card>
   					<CardItem>
   						<Body>
   							<H1>
   							Timer will go here
   							</H1>
   						</Body>
   					</CardItem> 
   				</Card>
   				<Card>
   					<CardItem header>
   						<Text  style={{fontSize: 20, fontWeight: 'bold'}}>Event Descrition</Text>
   					</CardItem>
   					<CardItem>
   						<Body>
   							<Text style={{fontSize: 20}}>Location</Text>
   							<Text style={{fontSize: 20}}>Start</Text>
   							<Text style={{fontSize: 20}}>End</Text>
   							<Text style={{fontSize: 20}}>Group</Text>
   							<Text style={{fontSize: 20}}>Descrition</Text>
   						</Body>
   					</CardItem> 
   				</Card>
    		</Content>
    		<Button block style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
            	<Text>Safe</Text>
            </Button>
            <Container>
            <Button warning block style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
            	<Text>Extend Event</Text>
            </Button>
            <Button danger block style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
            	<Text>Emergency Alert</Text>
            </Button>
            </Container>
    </Container>
  );
});