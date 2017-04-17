import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import GoogleStaticMap from 'react-native-google-static-map';
import { markSafe, markDanger } from '../actions/axiosController';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, H1, Card, CardItem, Image } from 'native-base';

const styles = {
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  timer: {
    fontSize: 35,
    marginLeft: 90,
  }
};
const mapStateToProps = ({events, dateReducer}) => {
  console.log(events);
  return {
    id: events.id.id,
    isPersonal: events.isPersonal,
    active: events.active,
    name: events.id.name,
    begin: new Date(events.id.begin),
    end: new Date(events.id.end),
    current: new Date(dateReducer.current),
    description: events.id.description,
    lat: events.id.lat,
    long: events.id.long,
    place_id: events.id.place_id,
    place_name: events.id.place_name,
    group: events.id.groupName,
    safe: events.id.safe
  };
};



export default connect(mapStateToProps)(class EventView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {begin, end, current} = this.props;
    if (end.valueOf() > current.valueOf()) {

      this.id = setInterval( () => {
        this.props.dispatch({ type: 'CURRENT'});
      }, 1000);
    }
  }


  componentWillUnmount() {
    clearInterval(this.id);
  }
  render() {
  const { id, active, isPersonal, name, begin, end, description, lat, long, group, current, dispatch} = this.props;
  return (
    <Container style={{backgroundColor: '#F3ECE2'}}>
      <Header title={name}/>
        <Content>
          <Card>
            <CardItem>
              <Body>
              {active ? (
              <H1>{(end.getHours() - current.getHours()) + ':' + (end.getUTCMinutes() - current.getUTCMinutes()) + ':' + (end.getSeconds() + (begin.getSeconds() - current.getSeconds()))}</H1>
              ) : (
              <H1 style={styles.timer}>{begin.toLocaleTimeString()}</H1>
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
              <Text style={styles.text}>Start: {`${begin.toLocaleString().slice(0, 16)} ${begin.toLocaleString().slice(19)}`}</Text>
              <Text style={styles.text}>End: {`${end.toLocaleString().slice(0, 16)} ${end.toLocaleString().slice(19)}`}</Text>
              <Text style={styles.text}>Location: {place_name}</Text>
              <Text style={styles.text}>Group Name: {group}</Text>
            </Body>
            </CardItem>
          </Card>




      {active && isPersonal ? (
      <Container>
      <Button block style={styles.button} onPress={() => {
        markSafe(id).then(event => this.props.dispatch({type: 'CURRENT_ITEM', item: event}));
      }}>
      <Text>Safe</Text>
      </Button>
      {/* <Button block style={styles.button}>
        <Text>Extend Event</Text>
      </Button> */}
      <Button danger block style={styles.button} onPress={() => {
        markDanger(id).then(event => this.props.dispatch({type: 'CURRENT_ITEM', item: event}));
      }}>
        <Text>Emergency Alert</Text>
      </Button>
      </Container>
      ) : (
         <GoogleStaticMap
            latitude= {lat.toString()}
            longitude= {long.toString()}
            zoom={16}
            size={{ width: 415, height: 350 }}
        />
			)}
      </Content>
    </Container>
    );
  }
});
