export function focus(state, action) {
  var newhist = [...state.history, state.scene.name]
    return { ...state,  
      scene: action.scene,
      history: newhist
    };
}