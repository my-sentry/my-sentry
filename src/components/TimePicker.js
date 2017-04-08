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
  return (
      <DatePicker
        style={{width: 100}}
        date={state[state.type]}
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
        onDateChange={time => state.dispatch({type: state.type, time: time})}
      />
  );  
});