import {combineReducers} from 'redux';
import {Reducer} from 'react-native-router-flux';
import routes from './routes';


export function reducerCreate(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
   // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
}

export default combineReducers({
  routes,
  // more reducers
});