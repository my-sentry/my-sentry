import { AsyncStorage } from 'react-native';



export var auth = (state = {id: null, name: ''}, action) => {
  switch (action.type) {
  case 'LOGIN' :
    let store = JSON.stringify(action.id)
    AsyncStorage.setItem('AUTHENTICATION', store)
    let name = JSON.stringify(action.name)
    AsyncStorage.setItem('NAME', name)
    return {...state,
      id: action.id,
      name: action.name
    };
  case 'LOGOUT' :
    AsyncStorage.setItem('AUTHENTICATION', 'null')
    AsyncStorage.setItem('NAME', '{}')
    return { ...state,
      id: null,
      name: ''
    };
  case 'SET_VALUES' :
    return {...state,
      id: JSON.parse(action.id),
      name: JSON.parse(action.name)
    };

  default:
    return state;
  }
}


export var login = (state = {username: null, pw: null, ID: null}, action) => {
  switch(action.type) {
<<<<<<< HEAD

  case 'PASSWORD' :
=======
  case 'PASSWORD' :
>>>>>>> added PushController
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
export var signup = (state = {firstName:'', lastName: '', userName:'', password:'', confirm: ''}, action)=> {
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
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirm: ''
  }
  case 'CONFIRM_PASSWORD':
  return {...state,
    confirm: action.text
  }
  default:
    return state;
  }
}

export var token = (state = "", action) => {
  switch(action.type) {
  case 'UPDATE_TOKEN':
    return action.token;
  default:
    return state;
  }
}
