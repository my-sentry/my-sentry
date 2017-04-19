import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import moment from 'moment';
import GoogleStaticMap from 'react-native-google-static-map';
import { markSafe, markDanger } from '../actions/axiosController';
import ActionButton from 'react-native-action-button';
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
    fontSize: 25,
    fontWeight: 'bold',
  }
};

const mapStateToProps = ({event, dateReducer, auth}) => {
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
    safe: event.safe,
    auth_id: auth.id,
    user_id: event.user_id
  };
};


export default connect(mapStateToProps)(class EventView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {begin, end, current, dispatch, active} = this.props;

    if (active) {
      this.props.dispatch({ type: 'CURRENT' });
      this.intervalId = setInterval(() => {
        this.props.dispatch({ type: 'CURRENT'});
      }, 1000);
    }
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


  render() {


    const { id, active, isPersonal, name, begin, end, description, lat, long, group, current, dispatch, user_id, auth_id, safe} = this.props;
    return (
      <Container style={{backgroundColor: '#FAEAD4'}}>
        <Header />

        <Content>

          <Card>
            <CardItem>
              <Body>

                {active && ! safe ? (
                <H1 style={styles.timer}>{this.timer()}</H1>

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
                <Text style={styles.text}>Location: {place_name}</Text>
                <Text style={styles.text}>Group Name: {group}</Text>
              </Body>
            </CardItem>
          </Card>

        </Content>

        {active && isPersonal && !safe ? (
        <Container>
          <Button block style={styles.button} onPress={() => {
            markSafe(id).then(event => {
              console.log('EVENT', event);
              this.props.dispatch({
                type: 'CURRENT_ITEM',
                item: event,
                active: moment().valueOf() > begin.valueOf() && moment().valueOf() < end.valueOf(),
                personal: auth_id === user_id
              });
            });
          }}>
            <Text>Safe</Text>
          </Button>
          <Button danger block style={styles.button} onPress={() => {
            markDanger(id).then(event => this.props.dispatch({
              type: 'CURRENT_ITEM',
              item: event,
              active: moment().valueOf() > begin.valueOf() && moment().valueOf() < end.valueOf(),
              personal: auth_id === user_id
            }));
          }}>
            <Text>Emergency Alert</Text>
          </Button>
        </Container>
        ) : (
        !active && isPersonal ? (
        <View>
        <GoogleStaticMap
          latitude= {lat.toString()}
          longitude= {long.toString()}
          zoom={13}
          size={{ width: 500, height: 350 }}
        />
        <ActionButton>
        </ActionButton>
        </View>
        ) : (
        <GoogleStaticMap
          latitude= {lat.toString()}
          longitude= {long.toString()}
          zoom={13}
          size={{ width: 500, height: 350 }}
        />
        ))}
      </Container>
    );
  }
});
