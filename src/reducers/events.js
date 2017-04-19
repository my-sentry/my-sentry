import moment from 'moment';
import _ from 'lodash';

export var feed = (state = {}, action) => {
  switch (action.type) {

  case 'UPDATE_FEED':
    return {...state,
      data: [...action.data]
      .filter(item => {
        let ended = new Date(item.end).valueOf() - new Date().valueOf() < 0;
        return !ended || !item.safe;
      }).sort((a, b) => new Date(a.begin).valueOf() - new Date(b.begin).valueOf())
    };

  case 'ADD_ITEM':
    return {...state,
    };

  case 'REMOVE_ITEM':
    return {...state,
    };

  default:
    return state;
  }
};

export var event = (state = {id: null, active: null, isPersonal: null}, action) => {
  switch (action.type) {

  case 'CURRENT_ITEM':
    var event = action.item;
    event.active = action.active;
    event.isPersonal = action.personal;
    return event;

  default:
    return state;
  }
};

var defaultDates = function() {
  return {
    start: moment().second(0).millisecond(0).format(),
    end: moment().second(0).millisecond(0).format(),
    current: moment().second(0).millisecond(0).format()
  };
};

export var dateReducer = (state = defaultDates(), action) => {
  switch (action.type) {

  case 'DATE_CHANGE':
    var newStart = moment(state.start);
    var newEnd = moment(state.end);

    var day = moment(action.date).day();
    var month = moment(action.date).month();
    var year = moment(action.date).year();

    newStart.day(day);
    newStart.month(month);
    newStart.year(year);

    newEnd.day(day);
    newEnd.month(month);
    newEnd.year(year);

    return {...state,
      start: newStart.format(),
      end: newStart.format()
    };

  case 'START':
    var newStart = moment(state.start);

    var hour = moment(action.time).hour();
    var minute = moment(action.time).minute();

    newStart.hour(hour);
    newStart.minute(minute);

    return {...state,
      start: newStart.format()
    };

  case 'END':
    var newEnd = moment(state.end);

    var hour = moment(action.time).hour();
    var minute = moment(action.time).minute();

    newEnd.hour(hour);
    newEnd.minute(minute);

    return {...state,
      end: newEnd.format()
    };

  case 'CURRENT':
    return {...state,
      current: moment().format()
    };

  case 'RESET_DATE':
    return defaultDates();

  default:
    return state;
  }

};

var defaultForm = {
  id: null,
  name: '',
  location: '',
  description: '',
  lat: null,
  long: null,
  place_id: null
};

export var eventForms = (state = defaultForm, action) => {
  switch (action.type) {
  case 'EVENT_NAME':
    return {...state,
      name: action.text,
    };
  case 'ADD_LOCATION':
    return {...state,
      location: action.location,
      lat: action.lat,
      long: action.long,
      place_id: action.place_id
    };
  case 'EVENT_DESC' :
    return {...state,
      description: action.text,
    };
  case 'RESET_EVENT_FORM':
    return defaultForm;
  default:
    return state;
  }
};

export var searchLocation = (state = { input: '', predictions: [] }, action) => {
  switch (action.type) {
  case 'UPDATE_LOC_INPUT':
    return { ...state,
      input: action.input
    };
  case 'UPDATE_LOC_PREDICTIONS':
    return { ...state,
      predictions: action.predictions
    };
  case 'CLEAR_LOC':
    return { input: '', predictions: [] };
  default:
    return state;
  }
};
