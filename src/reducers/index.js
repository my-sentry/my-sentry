import {combineReducers} from 'redux';
import {AsyncStorage} from 'react-native'
import {Reducer} from 'react-native-router-flux';
import { ActionConst } from 'react-native-router-flux';


// router reducer
export function routerReducer(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION', action);
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
// authorization reducer
const auth = (state = {isAuth: false}, action) => {
  switch (action.type) {

  case 'LOGIN' :
    AsyncStorage.setItem('AUTHENTICATION', 'true').catch(err=> console.log("ERR",err));
    return {...state,
      isAuth: true
      };

  case 'LOGOUT' :
    AsyncStorage.setItem('AUTHENTICATION', 'null').catch(err=> console.log("ERR",err));
    return { ...state,  
      isAuth: false,
       };

  default:
    return state;
  }
};



const groups = (state = {hasGroups: false, groups: []}, action) => {
  switch(action.type) {
  case 'ADD_GROUP' : 
    return {...state,
      groups: [...state.groups, action.item],
      hasGroups: true,
  }
  case 'REMOVE_GROUP' :
    return {...state,

  }
  default: 
    return state;
  }
}

const feed = (state = {}, action) => {
  switch(action.type) {
  case 'ADD_ITEM':
    return {...state,
  }

  case 'REMOVE_ITEM':
    return {...state,
  }
  default: 
    return state;
  }
}

const events =(state = {id: null, active: false, isPersonal: false}, action) => {
	switch(action.type) {
  case 'UPDATE_ITEM': 
    return {...state,
      id: action.item,
    }

	case 'ACTIVE' :
		return {...state,
			active: true,
		}
	case 'INACTIVE' :
		return {...state, 
			active: false
		}
	case 'PERSONAL' :
		return {...state, 
			isPersonal: true
		}
	default:
		return state;

	}
}

const dateReducer =(state = {date: new Date(), start: new Date(), end: new Date()}, action) => {
  switch(action.type) {
  case 'DATE_CHANGE':
    return {...state,
      date: action.date
    }
  case 'START':
  console.log(action)
    return {...state,
      start: action.time
    }
  case 'END':
  console.log(action)
    return {...state,
      end: action.time
    }  
  case 'NEW_DATE':
    return {...state,
      date: new Date()
    }
  case 'NEW_TIME':
    return {...state,
      time: new Date()
    }
    default:
    return state;
  }
}

const login = (state = {username: null, pw: null}, action) => {
  switch(action.type) {
  case 'PASSWORD' : 
    return {...state,
      pw: action.text
    }  
  case 'USERNAME' : 
    return {...state,
      username: action.text
    } 
  case 'CLEAR_LOGIN' : 
    return {...state,
      username: null,
      pw: null
    } 
    default:
    return state;
  }
}
const signup = (state = {firstName:null, lastName: null, userName:null, password:null, confirm: null}, action)=> {
  switch(action.type) {
  case 'FIRST_NAME':
  return {...state,
    firstName: action.text
  }

  case 'LAST_NAME':
  return {...state,
    lastName: action.text
  }
  case 'USERNAME_SIGNUP':
  return {...state,
    userName: action.text
  } 
  case 'PASSWORD_SIGNUP':
  return {...state,
    password: action.text

  }
  case 'CLEAR_SIGNUP' :
  return {
    firstName: null,
    lastName: null,
    userName: null,
    password: null,
    confirm: null
  }
  case 'CONFIRM_PASSWORD':
  return {...state,
    confirm: action.text
  }
  default:
    return state;      
  }
}

const eventForms =(state = {id: null, name: null, location: null, description: null}, action) => {
  switch(action.type) {
  case 'EVENT_NAME': 
    return {...state,
      name: action.text,
    }
  case 'LOCATION':
    return {...state,
      location: action.text,
    }
  case 'EVENT_DESC' :
    return {...state, 
      description: action.text,
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
  eventForms,
  // more reducers
});