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
  .catch(err => console.log(err));
};

export var getGroupById = function(id, dispatch) {
  return axios(`${URL_CONFIG}/api/groups/${id}`)
  .then(res => dispatch({type: 'RECEIVE_USERS', users: res.data.users}))
    .catch(err => console.log(err));

};

export var removeUserFromGroup = function(groupId, userId) {
  return axios({
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/groups/${groupId}?delete=true`,
    data: JSON.stringify({userId: userId})
  })
  .catch(err => console.log(err));
};

// EVENTS
export var getEvents = function(dispatch) {
  return axios(`${URL_CONFIG}/api/events/`)
    .then(res => dispatch({type: 'UPDATE_FEED', data: res.data}))
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
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
  }).then(({data}) => {
    dispatch({
      type: 'LOGIN',
      id: data.id,
      name: {
        firstName: data.first_name,
        lastName: data.last_name
      }
    });
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
  })
    .catch(err => console.log(err));
};

export var signupCtrl = function(data, dispatch) {
  return axios({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/users/signup`,
    data: data
  }).then(({data}) => {
    dispatch({
      type: 'LOGIN',
      id: data.id,
      name: {
        firstName: data.first_name,
        lastName: data.last_name
      }
    });
    dispatch({type: 'CLEAR_SIGNUP'});
    Actions.loading();
  }).catch(err => {
    dispatch({type: 'CLEAR_SIGNUP'});
    alert('invalid submission');
  });
};

export var getUsers = function(dispatch) {
  return axios(`${URL_CONFIG}/api/users`)
    .then(res => {
      dispatch({type: 'RECEIVE_USERS', users: res.data});
      Actions.groupForm();
    })
    .catch(err => console.log(err));
};

export var verifyLogin = function() {
  return axios(`${URL_CONFIG}/api/users`);
};

export var updateUserToken = function(id, token) {
  return axios({
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/users/${id}`,
    data: JSON.stringify({ token })
  }).then(() => {
    console.log(`Token for user ${id} updated.`);
  })
  .catch(err => {
    console.log(`There was a problem updating the token for user ${id}`);
    console.log(err);
  });
};
