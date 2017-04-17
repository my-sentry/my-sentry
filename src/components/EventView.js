import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import GoogleStaticMap from 'react-native-google-static-map';
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
  },
  timer: {
    fontSize: 35,
    marginLeft: 90,
  }
};
const mapStateToProps = ({events, dateReducer}) => { 
  console.log(events);
  return {
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
    group: events.id.groupName
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
    const {active, isPersonal, name, begin, end, description, lat, long, group, current, dispatch} = this.props;
    return (
    <Container>
      <Header title={name}/>
        <Content>
          <Card>
            <CardItem>
              <Body>
              {active ? (
              <H1>{(end.getHours() - current.getHours()) + ':' + (end.getMinutes() - current.getMinutes()) + ':' + (end.getSeconds() + (begin.getSeconds() - current.getSeconds()))}</H1>
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
              <Text style={styles.text}>Group Name: {group}</Text>
            </Body>
            </CardItem> 
          </Card>

           

        </Content>
      {active && isPersonal ? (
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
      <GoogleStaticMap  
            latitude= {lat.toString()}
            longitude= {long.toString()}
            zoom={13}
            size={{ width: 400, height: 325 }}
        />
			)}
    </Container>
    );
  }
});







