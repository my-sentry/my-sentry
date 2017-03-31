import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { connect, Provider } from 'react-redux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';



export default connect()(class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button style={nativeBaseStyles.button}></Button>
          </Left>
           <Body style={nativeBaseStyles.header}>
              <Text>Header</Text>
            </Body>
        </Header>

        <Content>
        </Content>

        <Footer>
              <Text>Footer</Text>
        </Footer>
      </Container>
    );
  }
});

const nativeBaseStyles = {
  button: {
    backgroundColor: '#33c3ff'
  },
  header: {
    flex: 1,
    margin: 10,
  },
};
