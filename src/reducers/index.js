import {combineReducers} from 'redux';
import {AsyncStorage} from 'react-native';
import {Reducer} from 'react-native-router-flux';
import { ActionConst } from 'react-native-router-flux';
import {auth, login, signup, token} from './login';
import {feed, event, dateReducer, eventForms, searchLocation } from './events';



// router reducer
export var routerReducer = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};
// changes name of header when scene changes
const header = (state = {title: 'My-Sentry', prev: null}, action) => {
  switch (action.type) {
  case ActionConst.JUMP :
    return { ...state,
      title: action.title ? action.title : state.title,
      prev: action.prev ? action.prev : null
    };
  case ActionConst.PUSH :
    switch (action.key) {
    case 'groups' || 'eventForm' :
      return { ...state,
        title: action.title ? action.title : action.key,
        prev: 'My-Sentry'
      };
    case 'locationSearch' || 'delete' || 'logout' : 
      return {...state,
        prev: state.title
      };
    default:
      return {...state,
        title: action.title ? action.title : action.key,
        prev: state.title
      };
    }
  case ActionConst.BACK_ACTION :
    switch (state.prev) {
    case 'My-Sentry' :
      return {title: 'My-Sentry', prev: null};
    case 'New Event' :
      return {title: 'New Event', prev: 'My-Sentry'};    
    case 'My Groups' :
      return {title: 'My Groups', prev: 'My-Sentry'};
    default: return state;
    }
    return {...state,
      title: state.prev,
    };
  default:
    return state;
  }
};

const searchBar = (state = {users: [], results: [], searchValue: null}, action) => {
  switch (action.type) {
  case 'SEARCH_NAME' :
    var searchResults = [];

    var search = function (text) {
      if (text === '' || text === ' ') {
        searchResults = [];
      } else {
        searchResults = state.users.filter(user => {
          //return user.username.toLowerCase().includes(text.toLowerCase());
          if (action.users.find(u => u.id === user.id)) {
            return false;
          } else {
            return user.username.toLowerCase().includes(text.toLowerCase());
          }
        });
      }
    };

    search(action.text);

    return {...state,
      searchValue: action.text,
      results: searchResults
    };
  case 'ADD_TO_MEMBERS' :
    addUser(action.groupId, action.userId);
  case 'FILTER_SEARCH_DATA' :
    var updated = state.users.filter(user => user.username !== action.user);

    return {...state,
      users: updated
    };
  case 'RECEIVE_SEARCH_DATA' :
    return {...state,
      users: action.users
    };
  case 'CLEAR_SEARCH_VALUE' :
    return {...state,
      searchValue: null,
      results: []
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
    if (action.form) {
      if (state.members.find(member => member.id === action.user.id)) {
        var updatedMem = state.members.filter(member => member.id !== action.user.id);

        return {...state,
          members: updatedMem
        };
      } else {
        return {...state,
          members: [...state.members, action.user]
        };
      }
    } else {
      return {...state,
        users: [...state.users, action.user]
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
  event,
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
