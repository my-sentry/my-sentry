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