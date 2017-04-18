import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import moment from 'moment';
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

const mapStateToProps = ({event, dateReducer}) => {
  return {
    id: event.id,
    isPersonal: event.isPersonal,
    active: event.active,
    name: event.name,
    begin: moment(event.begin),
    end: moment(event.end),
    current: moment(dateReducer.current),
    description: event.description,
    lat: event.lat,
    long: event.long,
    place_id: event.place_id,
    place_name: event.place_name,
    group: event.groupName,
    safe: event.safe
  };
};



export default connect(mapStateToProps)(class EventView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {begin, end, current, dispatch} = this.props;

    this.props.dispatch({ type: 'CURRENT' });
    this.intervalId = setInterval(() => {
      this.props.dispatch({ type: 'CURRENT'});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    var { end, current } = this.props;
    var remaining = end.valueOf() - current.valueOf();
    var duration = moment.duration(remaining);

    return `${duration.days()}d:${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`;
  }

  // (end.getHours() - current.getHours()) + ':' + (end.getUTCMinutes() - current.getUTCMinutes()) + ':' + (end.getSeconds() + (begin.getSeconds() - current.getSeconds()))

  render() {

    const { id, active, isPersonal, name, begin, end, description, lat, long, group, current, dispatch} = this.props;
    return (
      <Container>
        <Header title={name}/>

        <Content>

          <Card>
            <CardItem>
              <Body>
                {active ? (
                <H1>{this.timer()}</H1>
                ) : (
                <H1 style={styles.timer}>{begin.format('ddd MMM Qo YYYY hh:mm a')}</H1>
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
                <Text style={styles.text}>Start: {begin.format('ddd MMM Qo YYYY hh:mm a')}</Text>
                <Text style={styles.text}>End: {end.format('ddd MMM Qo YYYY hh:mm a')}</Text>
                <Text style={styles.text}>Group Name: {group}</Text>
              </Body>
            </CardItem>
          </Card>

        </Content>

        {active && isPersonal ? (
        <Container>
          <Button block style={styles.button} onPress={() => {
            markSafe(id).then(event => this.props.dispatch({type: 'CURRENT_ITEM', item: event, active: active, isPersonal: isPersonal }));
          }}>
            <Text>Safe</Text>
          </Button>
          {/* <Button block style={styles.button}>
            <Text>Extend Event</Text>
          </Button> */}
          <Button danger block style={styles.button} onPress={() => {
            markDanger(id).then(event => this.props.dispatch({type: 'CURRENT_ITEM', item: event, active: active, isPersonal: isPersonal }));
          }}>
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
