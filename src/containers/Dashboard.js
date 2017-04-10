import React, {Component} from 'react';
import { Text, View, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { Container, Title, Content, Button, Left, Right, Body, Icon, H1 } from 'native-base';
import { getUsers } from '../actions/axiosController';


import Feed from './Feed';
import Groups from './Groups';
import Header from '../components/Header';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = ({groups}) => groups;

export default connect(mapStateToProps)(class Dashboard extends Component {
  render() {
    const groups = this.props.groups;
    return (
      <Container>
      {groups.length > 0 
        ? <Feed />
        : (
        <Content>
          <Header />
          <Container style={styles.container}>
          <H1>No Groups</H1>
          <Button block primary onPress={() => getUsers(this.props.dispatch) } >
            <Text>Create Group</Text>
          </Button>
          </Container>
        </Content>
          )
      }
      </Container>
    );
  }
});




