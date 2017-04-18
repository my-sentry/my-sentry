import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';

const mapStateToProps = ({dateReducer}) => ({date: dateReducer.start});

export default connect(mapStateToProps)(function MyDatePicker({date, dispatch}) {
  return (
    <DatePicker
      style={{width: 200}}
      date={date}
      mode="date"

      placeholder="select date"
      format="YYYY-MM-DD"
      minDate="2016-00-01"
      maxDate="2020-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          borderWidth: 0,
          marginLeft: 36
        }
      }}
      onDateChange={newDate => dispatch({type: 'DATE_CHANGE', date: newDate})}
    />
  );
});
