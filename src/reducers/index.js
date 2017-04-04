import {combineReducers} from 'redux';
import {Reducer} from 'react-native-router-flux';
import { ActionConst } from 'react-native-router-flux';


// router reducer
export function routerReducer(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION', action);
    return defaultReducer(state, action);
  };
}

// changes name of header when scene changes
const header = (state = {title: 'Dashboard'}, action) => {
  switch (action.type) {
  case 'HEADER_CHANGE_FORCE': 
    return {...state,
      title: action.title
    }
  case ActionConst.PUSH :
    return { ...state,
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
    console.log(state)
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
    console.log(">>>>>>>>>>>>",state,action)
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

export default combineReducers({
  auth,
  header,
  groups,
  events,
  // more reducers
});