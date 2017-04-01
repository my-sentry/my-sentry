import { ActionConst } from 'react-native-router-flux';

const INITIALSTATE = {
  scene: {name: 'home'},
  history: [],
  previous: 'home'
};

export default function(state = INITIALSTATE, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
  case ActionConst.FOCUS:
    var newhist = [...state.history, state.scene]
    return { ...state,  
      scene: action.scene,
      history: newhist
       };

    // ...other actions
  case "BACK":
    console.log("triggered")
    var newhist = [...state.history, state.scene]
    return { ...state,
      scene: action.scene,
      history: newhist
       };
  default:
    return state;
  }
}