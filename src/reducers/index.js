import {combineReducers} from 'redux';
import {Reducer} from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

import routes from './routes';

// router reducer
export function routerReducer(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
}
const headerReducer = (state ={}, {type}) => {
  switch (type) {
  default:
    return state;
  }
};
// authorization reducer
const authReducer = (state = {isAuth: true}, {type}) => {
  switch (type) {
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




export default combineReducers({
  authReducer,
  headerReducer
  // more reducers
});