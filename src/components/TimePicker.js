import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {connect} from 'react-redux';

const mapStateToProps = ({dateReducer}) => ({
  START: moment(dateReducer.start),
  END: moment(dateReducer.end)
});

export default connect(mapStateToProps)(function TimePicker (state) {
  const {type, dispatch} = state;
  console.log(`state[${type}]`, state[type].format('HH:mm'));
  return (
      <DatePicker
        style={{width: 100}}
        date={state[type].format('HH:mm')}
        mode="time"
        customStyles={{
          dateInput: {
            borderWidth: 0,
            marginLeft: 36
          }}}
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={time => {
          var [hour, minute] = time.split(':');
          var newTime = state[type].hour(hour).minute(minute).format();
          console.log('newTime: ', newTime);
          dispatch({type: type, time: newTime});
        }}
      />
  );
});
