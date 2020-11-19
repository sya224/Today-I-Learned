import React from "react";
import { connect } from "react-redux";
import { fetchStatisticsData } from "../../actions";

// 달력
import moment from "moment"
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';

// https://github.com/airbnb/react-dates
class PeriodSelect extends React.Component{
  componentDidMount() {
    // if(!this.props.info){
    //   setTimeout(
    //     () => this.props.fetchStatisticsData(moment().subtract(7, 'day'), moment().subtract(1, 'day'), moment())  // startDate, endDate, availableDate
    //   , 100)
    // }
    // else{
    //   this.props.fetchStatisticsData(moment().subtract(7, 'day'), moment().subtract(1, 'day'), moment()) 
    // }
    this.props.fetchStatisticsData(moment().subtract(7, 'day'), moment().subtract(1, 'day'), moment()) 
  }
  constructor(props){
    super(props);

    this.state = {
      focusedInput: null
    }

    this.datesChange = this.datesChange.bind(this);
  }
  datesChange(e){
    if(e.startDate != null && e.endDate != null){
      this.props.fetchStatisticsData(e.startDate, e.endDate)
    }
    
    this.props.info.date.startDate = e.startDate;
    this.props.info.date.endDate = e.endDate;
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
          isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment(date.joinedDate).subtract(1, 'day')) || isInclusivelyAfterDay(day, date.availableDate)}  // 2020/01/02 ~ 어제 날짜까지만 선택 가능
          startDatePlaceholderText={"시작 날짜"}
          endDatePlaceholderText={"종료 날짜"}
          showDefaultInputIcon={true} // 달력 표시
          minimumNights={0} // 하루만 선택 가능
          numberOfMonths={1}  // 한달만 표시
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

export default connect(mapStatetoProps, { fetchStatisticsData })(PeriodSelect);