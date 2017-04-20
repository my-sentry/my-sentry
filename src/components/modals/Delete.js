import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {View, TouchableHighlight, Dimensions, BackAndroid} from 'react-native';
import { Container, Title, Text, Grid, Row, Form, Content, Button, Left, Right, Body, List, ListItem, H1 } from 'native-base';
import { logoutCtrl } from '../../actions/axiosController';
import { removeUser, deleteGroup, getGroupById, getGroups } from '../../actions/axiosController';



export default connect()(class Delete extends Component {
  constructor(props) {
    super(props);
    this.dismissModal = this.dismissModal.bind(this);
  }

  static propTypes = {
    groupId: PropTypes.number,
    userId: PropTypes.number,
    username: PropTypes.string,
    groupName: PropTypes.string
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true );
  }

  dismissModal() {
    this.setState({hide: true});
  }

  render() {

    var {groupId, user, users, hide, groupName, deletingUser, dispatch} = this.props;
    var {height, width} = Dimensions.get('window');
    return hide
      ? (
        <View>
        </View>
      )
      : (
      <Container style={{
        position: 'absolute',
        alignSelf: 'center',
        height: height,
        width: width,
        opacity: .8,
        backgroundColor: 'transparent',
      }}>
    <Container style={{
      position: 'absolute',
      alignSelf: 'center',
      top: height / 3,
      height: 150,
      width: 200,
      backgroundColor: '#ccc2cd',
      borderStyle: 'solid',
      borderColor: '#ccc2cd',
      borderWidth: 1,
    }}>
    <Grid style={{flex: 1}}>
    <Row >
    <Text style={{alignSelf: 'center'}}>
      Are you sure you want to {deletingUser ? (
        'remove ' + user.username + ' from ' + groupName + '?'
      ) : (
        'delete the group: ' + groupName + '?'
      )}
    </Text>
    </Row>
    <Row style={{flex: 0}}>
    <Left>
      <Button block bordered dark
      onPress={() =>{
        Actions.pop();
      }} ><Text> NO</Text></Button>
    </Left>
    <Right>
      <Button block danger
      onPress={()=> {
        deletingUser ? (
          removeUser(groupId, [user])
          .then(() => dispatch({type: 'REMOVE_MEMBER', id: user.id}))
          .then(getGroupById(groupId, dispatch)
          .then(() => Actions.pop()))
        ) : (
          removeUser(groupId, users)
          .then(() => {
            return deleteGroup(groupId)
            .then(() => {
              return getGroups(dispatch)
              .then(() => {
                Actions.pop();
                Actions.groups();
              });
            });
          })
        );
      }}><Text> Yes </Text>
      </Button>
    </Right>
    </Row>
  </Grid>
  </Container>
  </Container>
  );
  }
});
