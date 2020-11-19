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
class PeriodMonth extends React.Component{
  componentDidMount() {
    this.props.fetchStatisticsData(moment().startOf('month').subtract(1, 'month'), moment().endOf('month').subtract(1, 'month'), moment().startOf('month'))  // mem_id, startDate, endDate, availableDate
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
      var calendarStartDate = moment(e.startDate).startOf('month');

      var joined = new Date(this.props.info.date.joinedDate);
      var day_ = new Date(e.startDate);
      if(joined.getFullYear() === day_.getFullYear() && joined.getMonth() === day_.getMonth()) {
        calendarStartDate = this.props.info.date.joinedDate
      }

      this.props.fetchStatisticsData(calendarStartDate, moment(e.startDate).endOf('month'))
    }
  }
  setCalendar(){
    if(this.props.info){
      const date = this.props.info.date;

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
          isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment(date.joinedDate).subtract(1, 'day')) || isInclusivelyAfterDay(day, date.availableDate)}  // 가입일 ~ 어제 날짜까지만 선택 가능
          // 가입일 => isInclusively~ 함수는 기준 날짜를 포함해서 제외하기 때문에 -1 해줘야 함
          startDatePlaceholderText={"시작 날짜"}
          endDatePlaceholderText={"종료 날짜"}
          showDefaultInputIcon={true} // 달력 표시
          numberOfMonths={1}  // 한달만 표시
          disabled={'endDate'}
          startDateOffset={day => {
            var joined = new Date(date.joinedDate);
            var day_ = new Date(moment(day).startOf(1, 'month'));
            if(joined.getFullYear() === day_.getFullYear() && joined.getMonth() === day_.getMonth()) {
              return moment(new Date(date.joinedDate));
            }
            else{
              return day.startOf('month')
            }
          }}
          endDateOffset={day => day.endOf('month')}
          readOnly
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

export default connect(mapStatetoProps, { fetchStatisticsData })(PeriodMonth);