import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import {Actions} from 'react-native-router-flux';

import Feed from './Feed';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const nativeBaseStyles = {
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    fontSize: 20, 
    color: 'black'
  },
  header: {
    flex: 0,
    justifyContent: 'center'
  },
};

const mapStateToProps = state => { 
  return {hasGroups: state.hasGroups};
};

export default connect(mapStateToProps)(class Dashboard extends Component {
  render() {

    let {dispatch, hasGroups} = this.props;
 
    return (
      <Container>
        <Header> 
         <Left>
            <Button>
              <Icon 
              name='arrow-back' 
              style={nativeBaseStyles.menu}
              onPress={()=> console.log('back')}
              />
            </Button>
          </Left>
          <Body style={nativeBaseStyles.header}>
          <Text>Dashboard</Text>
          </Body>      
           
          <Right>
            <Button>
              <Icon 
              ios='ios-menu' 
              android="md-menu" 
              style={nativeBaseStyles.menu}
              onPress={()=> console.log('hamburger')}
              />
            </Button>
          </Right>
        </Header>

        <Content>
        {hasGroups ? <Feed />
         : (
        <Container style={nativeBaseStyles.container}>
        <H1>No Groups</H1>
        <Button block primary
        onPress={Actions.groups}
        >
          <Text>Find Group</Text>
        </Button>
        </Container>
        )}
        </Content>
      </Container>
    );
  }
});


