import { ActionConst } from 'react-native-router-flux';

const INITIALSTATE = {
  scene: {name: 'home'},
};

export default function(state = INITIALSTATE, action = {}) {
  switch (action.type) {
  // case ActionConst.FOCUS:
  //   return { ...state,  
  //     scene: action.scene,
  //      };
  default:
    return state;
  }
}