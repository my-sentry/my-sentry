import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AsyncStorage, TextInput, Keyboard, Dimensions} from 'react-native';
import { Container, Title, Left, Right, Content, Label, Form, Button, Text, Item, Icon, Spinner, Body, Input, H1, Grid, Row } from 'native-base';
import { loginCtrl } from '../../actions/axiosController.js';
const {height, width} = Dimensions.get('window');

export var styles = {
  content: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1f1f1f'
  },
  item: {
    backgroundColor: '#a0a',
    flex: 1
  },
  form: {
    backgroundColor: '#cccccc',
    width: (width * .90),
    alignSelf: 'center'
  },
  confirm: {
    paddingTop: 15,
    alignSelf: 'center'
  },
  confirmButton: {
    width: 150
  },
  textbox: {
    paddingTop: 0,
    alignSelf: 'center'
  },
  back: {
    paddingTop: 0,
    marginTop: 0,
  },
  text: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'sans-serif',
    alignSelf: 'center'
  },
  input: {
    paddingLeft: 15,
  },
  formInput: {
    flex: 1,
  },
};

const mapStateToProps = ({login, token}) => {
  return { form: {
    username: login.username,
    password: login.pw,
    token: token
  }};
};

export default connect(mapStateToProps)(class Login extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const {form, dispatch} = this.props;

    const loginSubmit = function() {
      Keyboard.dismiss();
      loginCtrl(form, dispatch);
    };

    return (
     <Container style={styles.container}>
      <Grid style={{flex: 1}}>
      <Row >
      <Content style={styles.content}>
      <Form style={styles.form} >

            <TextInput 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder='Username' 
            ref='1'
            autoCapitalize={'none'} 
            style={styles.input} 
            value={form.username}
            returnKeyType = {'next'}
            onSubmitEditing={() => this.focusNextField('2')}
            onChangeText={text => dispatch({type: 'USERNAME', text: text})}/>


            <TextInput 
            underlineColorAndroid='rgba(0,0,0,0)'
            onSubmitEditing={loginSubmit}
            ref='2'
            autoCapitalize={'none'}
            style={styles.input} 
            value={form.password} 
            placeholder='Password'
            secureTextEntry={true} 
            onChangeText={text => dispatch({type: 'PASSWORD', text: text})}/>
          
      </Form>

      <Row style={styles.confirm}>
        <Button 
        style={styles.confirmButton} 
        block light
        onPress={loginSubmit}><Text> LOGIN </Text>
        </Button>
        </Row>

        <Row style={styles.textbox}>
        <Button transparent
          onPress={() => {
            Keyboard.dismiss();
            Actions.signup();
          }}
          style={styles.back}
          ><Text style={styles.text}>Dont Have an account?</Text>
        </Button>
      </Row>

      </Content>
      </Row>
    </Grid>
    </Container>
    );
  }
});
