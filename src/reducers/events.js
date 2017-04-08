export var feed = (state = {}, action) => {
  switch(action.type) {
  case 'UPDATE_FEED': 
    return{...state,
      data: action.data
    }
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

export var events =(state = {id: null, active: false, isPersonal: false}, action) => {
  switch(action.type) {
  case 'CURRENT_ITEM': 
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

export var dateReducer =(state = {date: new Date(), start: new Date(), end: new Date()}, action) => {
  switch(action.type) {
  case 'DATE_CHANGE':
    return {...state,
      date: action.date
    }
  case 'START':
    return {...state,
      start: action.time
    }
  case 'END':
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

export var eventForms =(state = {id: null, name: null, location: null, description: null}, action) => {
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