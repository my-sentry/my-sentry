export var feed = (state = {}, action) => {
  switch(action.type) {
  case 'UPDATE_FEED': 
    return{...state,
      data: [...action.data].sort((a,b) => 
      new Date(a.begin).getTime() - new Date(b.begin).getTime())
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

export var events = (state = {id: null, active: null, isPersonal: null}, action) => {
  switch(action.type) {
  case 'CURRENT_ITEM':
  console.log(action) 
    return {...state,
      id: action.item,
      active: action.active,
      isPersonal: action.personal
    }
  default:
    return state;

  }
}

export var dateReducer = (state = {date: new Date(), start: new Date(), end: new Date()}, action) => {
  switch(action.type) {
  case 'DATE_CHANGE':
    return {...state,
      date: action.date
    }
  case 'START':
    let startTime = action.time.split(':')
    let startSet = new Date(state.date)
    startSet.setHours(startTime[0])
    startSet.setMinutes(startTime[1])
    return {...state,
      start: startSet
    }
  case 'END':
    let endTime = action.time.split(':')
    let endSet = new Date(state.date)
    endSet.setHours(endTime[0])
    endSet.setMinutes(endTime[1])
    return {...state,
      end: endSet
    }  
  case 'RESET_DATE': 
    return { date: new Date(), start: new Date(), end: new Date }
  default:
  return state;
  }

}

export var eventForms = (state = {id: null, name: null, location: null, description: null}, action) => {
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