import React, {Component, PropTypes} from 'react';
import { Text, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import moment from 'moment';
import GoogleStaticMap from 'react-native-google-static-map';
import { markSafe, markDanger, deleteEvent } from '../actions/axiosController';
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Grid, Row, Title, Content, Footer, FooterTab, Button, Left, Right, Body, H1, Card, CardItem, Image } from 'native-base';



const styles = {
  content: {
    paddingLeft: 0,
    paddingRight: 5, 
    paddingBottom: 0,
    margin: 5,
    borderColor: 'black',
    backgroundColor: 'transparent'
  },
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
  },
  actionButtonIcon: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },
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

  static propTypes = {
    begin: PropTypes.object,
    end: PropTypes.object,
    current: PropTypes.object,
    dispatch: PropTypes.func,
    id: PropTypes.number,
    active: PropTypes.bool,
    isPersonal: PropTypes.bool,
    name: PropTypes.string,
    description: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    group: PropTypes.string,
    user_id: PropTypes.number,
    auth_id: PropTypes.number,
    safe: PropTypes.number,
    place_name: PropTypes.string,
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

    return `${Math.abs(duration.hours())}h:${Math.abs(duration.minutes())}m:${Math.abs(duration.seconds())}s`;
  }


  render() {
    var {height, width} = Dimensions.get('window');
    width = Math.trunc(width);
    const { id, active, isPersonal, name, begin, end, description, lat, long, group, current, dispatch, user_id, auth_id, safe, place_name} = this.props;
    return (
      <Container style={{backgroundColor: '#1f1f1f', padding: 0}}><Header /><Grid><Row style={{top: 20}}>
          <Content style={{height: (height / 3), padding: 5}}><Card>
            <CardItem>
              <Body>

                {active && !safe ? (
                <H1 style={styles.timer}>{this.timer()}</H1>

                ) : (
                <H1 style={styles.timer}>{begin.format('ddd MMM Qo YYYY')}</H1>
                )}
              </Body>
            </CardItem>

            <CardItem>
              <Text style={styles.text}>{description}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.text}>Start: {begin.format('hh:mm a')}</Text>
                <Text style={styles.text}>End: {end.format('hh:mm a')}</Text>
                <Text style={styles.text}>Location: {place_name}</Text>
                <Text style={styles.text}>Group Name: {group}</Text>
              </Body>
            </CardItem>
          </Card></Content>

        </Row>

        {active && isPersonal && !safe ? (

        <View style={{flex: 1}}>
   
          <Button block full style={styles.button} onPress={() => {
            markSafe(id).then(event => {
              dispatch({
                type: 'CURRENT_ITEM',
                item: event,
                active: moment().valueOf() > begin.valueOf() && moment().valueOf() < end.valueOf(),
                personal: auth_id === user_id
              });
            });
          }}>
            <Text>Safe</Text>
          </Button>
     
          <Button danger full block style={styles.button} onPress={() => {
            markDanger(id).then(event => dispatch({
              type: 'CURRENT_ITEM',
              item: event,
              active: moment().valueOf() > begin.valueOf() && moment().valueOf() < end.valueOf(),
              personal: auth_id === user_id
            }));
          }}>
            <Text>Emergency Alert</Text>
          </Button>
        </View>
        ) : (
        !active && isPersonal && !safe ? (
        <View style={styles.content}>
        <GoogleStaticMap
          latitude= {lat.toString()}
          longitude= {long.toString()}
          zoom={13}
          size={{ width: width, height: 300 }}
        />
         <ActionButton 
        icon={<Icon name="star" style={styles.actionButtonIcon} />}
        buttonColor="blue"
        onPress={() => {
          deleteEvent(id)
            .then(() => Actions.loading());
        }}/>
        <ActionButton 
        icon={<Icon name="trash" style={styles.actionButtonIcon} />}
        buttonColor="rgba(231,76,60,0.9)"
        position ='left'
        onPress={() => {
          markSafe(id).then(event => {
            dispatch({
              type: 'CURRENT_ITEM',
              item: event,
              active: moment().valueOf() > begin.valueOf() && moment().valueOf() < end.valueOf(),
              personal: auth_id === user_id
            });
          })
            .then(() => Actions.loading());
        }}/>
        </View>
        ) : (
        <View style={styles.content}>
        <GoogleStaticMap
          latitude= {lat.toString()}
          longitude= {long.toString()}
          zoom={13}
          size={{ width: width, height: 300 }}
        />
        </View>
        ))}
      </Grid></Container>
    );
  }
});
