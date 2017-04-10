import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';

const mapStateToProps = ({dateReducer}) => {
  return {
    START: dateReducer.start,
    END: dateReducer.end
  };
};

export default connect(mapStateToProps)(function TimePicker (state) {
  const {type, dispatch} = state;
  return (
      <DatePicker
        style={{width: 100}}
        date={state[type]}
        mode="time"
        customStyles={{
          dateInput: {
            borderWidth: 0,
            marginLeft: 36
          }}}
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        minuteInterval={10}
        showIcon={false}
        onDateChange={time => dispatch({type: type, time: time})}
      />
  );  
});