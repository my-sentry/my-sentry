import React, {Component} from 'react';
import axios from 'axios';
import {URL_CONFIG, PLACES_API_KEY} from '../../config/config.js';
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

export var getGroupById = function(id) {
  return axios(`${URL_CONFIG}/api/groups/${id}`)
  .catch(err => console.log(err));

};

export var getUserById = function(id) {
  return axios(`${URL_CONFIG}/api/users/${id}`)
  .catch(err => console.log(err));

};

export var addUser = function(groupId, userId) {
  return axios({
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/groups/${groupId}`,
    data: JSON.stringify({userId: userId})
  })
  .catch(err => console.log(err));
};

export var removeUser = function(groupId, userArray) {
  return axios({
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/groups/${groupId}?delete=true`,
    data: JSON.stringify({userArray: userArray})
  })
  .catch(err => console.log(err));
};

export var deleteGroup = function(groupId) {
  return axios({
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${URL_CONFIG}/api/groups/${groupId}`
  });
};

// EVENTS
export var getEvents = function() {
  return axios(`${URL_CONFIG}/api/events/`)
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
    .catch(({response}) => {
      Actions.errorModal({
        error: /ER_DATA_TOO_LONG:/.test(response.data)
          ? 'Event must be shorter than 255 characters'
          : `Unknown error ${response.data}`,
        hide: false
      });

    });
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
  }).catch(({response}) => {
    Actions.errorModal({
      clear: {type: 'CLEAR_LOGIN'},
      error: response.status === 401 
      ? 'The password you\'ve entered is incorrect.'
      : 'Please enter a password!'
    });

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
  }).catch(({response}) => {
    Actions.errorModal({
      clear: {type: 'CLEAR_SIGNUP'},
      error: response.status === 401
      ? 'Username is already in use\nplease choose a different username'
      : 'Unknown error please try again!',
      hide: false});

  });
};

export var getUsers = function() {
  return axios(`${URL_CONFIG}/api/users`)
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

export var getPlaces = function(input) {
  return axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    params: {
      key: PLACES_API_KEY,
      input: encodeURIComponent(input)
    }
  })
  .catch(err => {
    console.log('There was an error accessing the Google Places API');
    console.log(err);
  });
};

export var getPlaceDetails = function(placeId) {
  return axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/details/json',
    params: {
      key: PLACES_API_KEY,
      placeid: placeId
    }
  })
  .catch(err => {
    console.log('There was an error accessing the Google Places API');
    console.log(err);
  });
};
