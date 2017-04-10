import {AsyncStorage} from 'react-native';



export var auth = (state = {id: null}, action) => {
  switch (action.type) {
  case 'LOGIN' :
    let store = JSON.stringify(action.id)
    AsyncStorage.setItem('AUTHENTICATION', store)
    return {...state,
      id: action.id
    };
  case 'LOGOUT' :
    AsyncStorage.setItem('AUTHENTICATION', 'null')
    return { ...state,  
      id: null,
    };
  case 'SET_ID' :
    return {...state,
      id: JSON.parse(action.id)
    };

  default:
    return state;
  }
}


export var login = (state = {username: null, pw: null, ID: null}, action) => {
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
export var signup = (state = {firstName:null, lastName: null, userName:null, password:null, confirm: null}, action)=> {
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
