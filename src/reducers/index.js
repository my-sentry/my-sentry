import {combineReducers} from 'redux';
import {AsyncStorage} from 'react-native'
import {Reducer} from 'react-native-router-flux';
import { ActionConst } from 'react-native-router-flux';
import {auth, login, signup}from "./login";
import {feed, events, dateReducer, eventForms} from './events';



// router reducer
export function routerReducer(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
}
// changes name of header when scene changes
const header = (state = {title: 'DASHBOARD'}, action) => {
  switch (action.type) {
  case ActionConst.PUSH :
    return { ...state,
      title: action.title ? action.title.toUpperCase() : action.key.toUpperCase()
    }
  case ActionConst.BACK_ACTION :
    return {...state,
      title: 'DASHBOARD'
    }
  default:
    return state;
  }
};

 const groups = (state = {id: null, groups: [], users: [], groupName: null, members: []}, action) => {
  switch(action.type) {
  case 'CURRENT_GROUP':
    return{...state,
      id: action.item
    }
  case 'UPDATE_GROUPS': 
    return{...state,
      groups: action.data
    }
  case 'ADD_GROUP' :
    let store = JSON.stringify(action.id)
    AsyncStorage.setItem('GROUP', store)
    return {...state,
      groups: [...state.groups, action.item],
  }
  case 'REMOVE_GROUP' :
    return {...state,

  }
  case 'RECEIVE_USERS' :
    return {...state,
      users: action.users
  }
  case 'ADD_NAME' :
    return {...state,
      groupName: action.text
  }
  case 'ADD_MEMBER' :
    return {...state,
      members: [...state.members, action.member],
      highlighted: true
  }
  default:
    return state;
  }
}


export default combineReducers({
  auth,
  header,
  groups,
  events,
  dateReducer,
  login,
  signup,
  feed,
  eventForms,
  // more reducers
});