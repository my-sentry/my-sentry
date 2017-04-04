import {combineReducers} from 'redux';
import {Reducer} from 'react-native-router-flux';
import { ActionConst } from 'react-native-router-flux';

import routes from './routes';

// router reducer
export function routerReducer(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
}

// changes name of header when scene changes
const header = (state = {title: 'Dashboard'}, action) => {
  switch (action.type) {
    case ActionConst.PUSH :
      return {...state,
        title: action.key
      }
    case ActionConst.BACK_ACTION :
      return {...state,
        title: 'Dashboard'
      }
  default:
    return state;
  }
};

// authorization reducer
const auth = (state = {isAuth: true}, action) => {
  switch (action.type) {
  case 'LOGIN' :
    return {...state,
      isAuth: true
      };
  case 'LOGOUT' :
    return { ...state,  
      isAuth: false,
       };

  default:
    return state;
  }
};

const groups = (state = {hasGroups: false, groups: null}, action) => {
  switch(action.type) {
    case 'ADD GROUPS' : 
      return {...state,
        hasGroups: true,
    }
    case 'REMOVE GROUP' :
      return {...state,

    }
  default: 
    return state;
  }
}

export default combineReducers({
  auth,
  header,
  groups
  // more reducers
});