import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image } from 'native-base';

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

const mapStateToProps = ({groups, auth}) => {
  return {
    isAdmin: groups.id.admin_user === Number(groups.id.userId),
    users: groups.users
  };
};

export default connect(mapStateToProps)(function GroupView ({users, isAdmin, dispatch}) {
  return isAdmin
  ? (
    <Container>
      <Header />
      <Container>
       <List dataArray={users}
        renderRow={item =>
            <ListItem>
            <Body>
                <Text>{item.username}</Text>
                </Body>
                <Right>
                  <Button small bordered danger onPress={() => dispatch({type: 'REMOVE_MEMBER', id: item.id})}>
                    <Icon name='ios-trash-outline' style={{color: 'red'}} />
                  </Button>
                </Right>
            </ListItem>
        }>
      </List>
      </Container>
    </Container>
  )
  : (
    <Container>
      <Header />
      <Text>MEMBER VIEW</Text>
    </Container>
  );
});
