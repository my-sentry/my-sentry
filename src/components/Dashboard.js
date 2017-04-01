import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';

import Feed from './Feed';
import MyHeader from './Header';
import { Container, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';

const styles = {
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = state => { 
  return {hasGroups: state.hasGroups};
};

export default connect(mapStateToProps)(class Dashboard extends Component {
  render() {
    const {hasGroups} = this.props; 
    return (
      <Container>
      <MyHeader />
        <Content>
        {!hasGroups 
        ? <Feed />
        : (
          <Container style={styles.container}>
          <H1>No Groups</H1>
          <Button block primary
          onPress={()=> Actions.groups()}
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


