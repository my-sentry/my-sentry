import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { Container, Label, Item, Input, Title, List, ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image, Form } from 'native-base';
import { removeUserFromGroup } from '../actions/axiosController';

export default connect()(function LocationSearch() {
  return (
    <Container>

      <Header />

      <Content>
        <Form>

          <Item>
            <Input placeholder="Search Locations" onChangeText={text => null}/>
          </Item>

          <List dataArray={['List 1', 'List 2', 'List 3']} renderRow={loc => (
            <ListItem><Text>{loc}</Text></ListItem>
          )}></List>

        </Form>
      </Content>

    </Container>
  );
});
