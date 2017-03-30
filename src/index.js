import React, {Component} from 'react'
import App from './components/App.js'
// import SOMEREDUCER from './reducers/SOMEREDUCER'
import { createStore, applyMiddleware } from 'redux'

// let store = creatStore(SOMEREDUCER)
export default class MySentry extends Component {
  render() {
    return (
      <Provider store = {store} >
        <App />      
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});