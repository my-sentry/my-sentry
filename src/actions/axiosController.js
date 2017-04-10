import React, {Component} from 'react';
import axios from 'axios';
import URL_CONFIG from '../../config/config';
import {Actions} from 'react-native-router-flux';


// GROUPS
export var postGroup = function(data) {
  return axios({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/groups`,
    data: JSON.stringify(data), 
  });
};

export var getGroups = function(dispatch) {
  return axios(`${URL_CONFIG}/api/groups`)
  .then(res => dispatch({type: 'UPDATE_GROUPS', data: res.data}))
  .catch(err => console.log('ERR', err))
  // .then(() => Actions.groups());
};

// EVENTS
export var getEvents = function(dispatch) {
  return axios(`${URL_CONFIG}/api/events/`)
  .then(res => dispatch({type: 'UPDATE_FEED', data: res.data}))
  .catch(err => console.log('ERR', err))
  .then(() => Actions.menu());
};

export var postEvent = function(data) {
  return axios({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/events/`,
    data: JSON.stringify(data)
  }).then(() => Actions.loading())
  .catch(err => console.log('ERR', err));
};



export var loginCtrl = function(data, dispatch) {
  return axios({
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/users/login`,
    data: JSON.stringify(data)
  }).then(res => {
    dispatch({type: 'LOGIN', id: res.data.id});
    dispatch({type: 'CLEAR_LOGIN'});
    Actions.loading();
  }).catch(err => {
    dispatch({type: 'CLEAR_LOGIN'});
    alert('LOGIN FAILED');
  });
};

export var logoutCtrl = function(dispatch) {
  return axios({
    method: 'post',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/users/logout`
  }).then(() => {
    dispatch({type: 'LOGOUT'});
    Actions.loading();
  });
};

export var signupCtrl = function(data, dispatch) {
  axios({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/users/signup`,
    data: data
  }).then(res => {
    dispatch({type: 'LOGIN', id: res.data.id});
    dispatch({type: 'CLEAR_SIGNUP'});
    Actions.loading();
  }).catch(err => {
    dispatch({type: 'CLEAR_SIGNUP'});
    alert('invalid submission');
  });
};

export var getUsers = function(dispatch) { 
  axios(`${URL_CONFIG}/api/users`)
    .then(res => {
      dispatch({type: 'RECEIVE_USERS', users: res.data});
      Actions.groupForm();
    })
    .catch(err => console.log('ERR', err));
};
