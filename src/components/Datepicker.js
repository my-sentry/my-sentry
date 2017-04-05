import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}
export class TimePicker extends Component {
    constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }
  render() {
    return (
        <DatePicker
          style={{width: 100}}
          date={this.state.time}
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
          onDateChange={(time) => {this.setState({time: time});}}
        />
      )
  }
}