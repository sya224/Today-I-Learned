import React from "react";
import { connect } from "react-redux";
import { getLoggedInfo } from "../../actions";
import PeriodWeek from "./PeriodWeek"
import PeriodMonth from "./PeriodMonth"
import PeriodSelect from "./PeriodSelect"
import TagFrequencyChart from "./TagFrequencyChart"
import CardCountChartWeek from "./CardCountChartWeek"
import CardCountChartMonth from "./CardCountChartMonth"
import CardCountChartSelect from "./CardCountChartSelect"
import TagPage from "../tags/Tags"
import "./statistics.css"
import storage from "lib/storage";

class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      standard: 'select'
    }

    this.setStandard = this.setStandard.bind(this);
  }
  setStandard(e) {
    switch (e.target.name) {
      case 'week':
        this.setState({
          standard: 'week'
        })
        break;
      case 'month':
        this.setState({
          standard: 'month'
        })
        break;
      case 'select':
        this.setState({
          standard: 'select'
        })
        break;
      default:
    }
  }
  setStandardButton() {
    if (this.props.mem_info) {
      var weekButton, monthButton, selectButton;
      if (this.props.mem_info.isAvailableWeek) {
        if (this.state.standard === 'week') {
          weekButton = <input type="button" value="주간" name="week" onClick={this.setStandard} className="active" />
        }
        else {
          weekButton = <input type="button" value="주간" name="week" onClick={this.setStandard} className="inactive" />
        }
      }

      if (this.props.mem_info.isAvailableMonth) {
        if (this.state.standard === 'month') {
          monthButton = <input type="button" value="월간" name="month" onClick={this.setStandard} className="active" />
        }
        else {
          monthButton = <input type="button" value="월간" name="month" onClick={this.setStandard} className="inactive" />
        }
      }

      if (this.props.mem_info.isAvailableWeek || this.props.mem_info.isAvailableMonth) {
        if (this.state.standard === 'select') {
          selectButton = <input type="button" value="기간 선택" name="select" onClick={this.setStandard} className="active" />
        }
        else {
          selectButton = <input type="button" value="기간 선택" name="select" onClick={this.setStandard} className="inactive" />
        }
      }

      return (
        <div className="btn_wrap">
          {weekButton}
          {monthButton}
          {selectButton}
        </div>
      );
    }
  }
  render() {
    if(!storage.get('loggedInfo')){
      this.props.history.replace("/login");
      return(<div></div>)
    }
    else{
      const user_id = this.props.match.params.user_id
  
      let calendar;
      let linechart;
  
      switch (this.state.standard) {
        case 'week':
          calendar = <PeriodWeek></PeriodWeek>
          linechart = <CardCountChartWeek></CardCountChartWeek>
          break;
        case 'month':
          calendar = <PeriodMonth></PeriodMonth>
          linechart = <CardCountChartMonth></CardCountChartMonth>
          break;
        case 'select':
          calendar = <PeriodSelect></PeriodSelect>
          linechart = <CardCountChartSelect></CardCountChartSelect>
          break;
        default:
      }
  
      return (
        <div>
          <div>{user_id}님의 통계</div>
          {this.setStandardButton()}
          {calendar}
          <div className="charts">
            <TagPage></TagPage>
            <TagFrequencyChart></TagFrequencyChart>
            {linechart}
          </div>
        </div>
      );
    }
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info
  };
};

export default connect(mapStatetoProps, { getLoggedInfo })(Statistics);
