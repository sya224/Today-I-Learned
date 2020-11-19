import React from "react";
import { connect } from "react-redux";
import { fetchStatisticsData } from "../../actions";

// 달력
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';

import moment  from "moment"

// https://github.com/airbnb/react-dates
class PeriodWeek extends React.Component{
  componentDidMount() {
    this.props.fetchStatisticsData( moment().subtract(7, 'day'), moment().subtract(1, 'day'), moment())  // mem_id, startDate, endDate, availableDate
  }
  constructor(props){
    super(props);

    this.state = {
      focusedInput: null
    }

    this.datesChange = this.datesChange.bind(this);
  }
  datesChange(e){
    if(e.startDate != null) {
      // startDate + 6이 어제 날짜를 넘어간다면? ==> 나중에 예외 처리 할 것!
      this.props.fetchStatisticsData(e.startDate, moment(e.startDate).add(6, 'day'))
    }
  }
  setYear(){
    const option = [];
    for(let i=moment(this.props.info.date.joinedDate).year(); i<=moment(this.props.info.date.availableDate).year(); i++){
      option.push(<option value={i} key={i}>{i}</option>);
    }
    return option;
  }
  setCalendar(){
    if(this.props.info){
      const date = this.props.info.date
      return(
        <DateRangePicker
          startDate={date.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={date.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={this.datesChange} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          displayFormat={"YYYY/MM/DD"}
          isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment(date.joinedDate).subtract(1, 'day')) || isInclusivelyAfterDay(day, date.availableDate)}  // 2020/01/02 ~ 어제 날짜까지만 선택 가능
          startDatePlaceholderText={"시작 날짜"}
          endDatePlaceholderText={"종료 날짜"}
          showDefaultInputIcon={true} // 달력 표시
          numberOfMonths={1}  // 한달만 표시
          disabled={'endDate'}
          endDateOffset={day => day.add(6, 'day')}
          readOnly
          renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{display: 'flex', height: '25px'}}>
                <select style={{background: '#fff', border: '1px solid #caccce', fontWeight: 'bold', paddingBottom: '3px'}}
                  value={month.month()}
                  onChange={(e) => { onMonthSelect(month, e.target.value); }}
                >
                  {moment.months().map((label, value) => (
                    <option value={value} key={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div style={{display: 'flex', height: '25px'}}>
                <select style={{background: '#fff', border: '1px solid #caccce', fontWeight: 'bold'}}
                  value={month.year()}
                  onChange={(e) => { onYearSelect(month, e.target.value); }}>
                  {this.setYear()}
                </select>
              </div>
            </div>
          )}
        />
      )
    }
  }
  render(){
    return (
      <div>{this.setCalendar()}</div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    info: state.statistics.info
  };
};

export default connect(mapStatetoProps, { fetchStatisticsData })(PeriodWeek);