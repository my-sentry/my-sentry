import {combineReducers} from 'redux';
import {AsyncStorage} from 'react-native';
import {Reducer} from 'react-native-router-flux';
import { ActionConst } from 'react-native-router-flux';
import {auth, login, signup, token} from './login';
import {feed, events, dateReducer, eventForms, searchLocation } from './events';



// router reducer
export var routerReducer = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};
// changes name of header when scene changes
const header = (state = {title: 'events', prev: null}, action) => {
  switch (action.type) {
  case ActionConst.JUMP :
    return { ...state,
      title: action.title ? action.title : action.key,
      prev: action.prev ? action.prev : null
    };
  case ActionConst.PUSH :
    switch (action.key) {
    case 'groups' :
      return { ...state,
        title: action.title ? action.title : action.key,
        prev: 'events'
      };
    case 'delete' :
      return { ...state,
        title: action.title ? action.title : action.groupName,
        prev: 'groups'
      };    
    default: 
      return {...state,
        title: action.title ? action.title : action.key,
        prev: state.title
      };
    }
  case ActionConst.BACK_ACTION :
    return {...state,
      title: action.title ? action.title : state.prev,
    };
  default:
    return state;
  }
};

const searchBar = (state = {users: [], results: []}, action) => {
  switch (action.type) {
  case 'SEARCH_NAME' :
    var searchResults = [];

    var search = function (text) {
      if (text === '' || text === ' ') {
        searchResults = [];
      } else {
        searchResults = state.users.filter(user => {
          return user.username.toLowerCase().includes(text.toLowerCase());
        });
      }
    };

    search(action.text);

    return {...state,
      results: searchResults
    };
  case 'ADD_TO_MEMBERS' :
    addOrRemoveUser(action.groupId, action.userId, true);
  case 'RECEIVE_SEARCH_DATA' :
    return {...state,
      users: action.users
    };
  default :
    return state;
  }
};

const popup = (state = {disabled: false}, action) => {
  switch (action.type) {
  case 'TOGGLE_POPUP' :
    return {...state,
      disabled: !state.disabled
    };
  default:
    return state;
  }
};

const groups = (state = {id: null, groups: [], users: [], groupName: null, members: []}, action) => {
  switch (action.type) {
  case 'CURRENT_GROUP':
    return {...state,
      id: action.id
    };
  case 'UPDATE_GROUPS':
    return {...state,
      groups: action.data,
      id: action.data.length > 0 ? action.data[0].id : 0
    };
  case 'ADD_GROUP' :
    return {...state,
      groups: [...state.groups, action.item],
    };
  case 'REMOVE_GROUP' :
    return {...state,

    };
  case 'RECEIVE_USERS' :
    return {...state,
      users: action.users
    };
  case 'ADD_NAME' :
    return {...state,
      groupName: action.text
    };
  case 'ADD_MEMBER' :
    if (state.members.includes(action.id)) {
      var updated = state.members.filter(id => id !== action.id);

      return {...state,
        members: updated
      };
    } else {
      return {...state,
        members: [...state.members, action.id]
      };
    }
  case 'REMOVE_MEMBER' :
    var userId = action.id;
    var updatedMembers = state.users.filter(user => user.id !== userId);
    return {...state,
      users: [...updatedMembers]
    };
  default:
    return state;
  }
};
export default combineReducers({
  auth,
  header,
  searchBar,
  groups,
  events,
  dateReducer,
  login,
  signup,
  token,
  feed,
  eventForms,
  popup,
  searchLocation
  // more reducers
});
