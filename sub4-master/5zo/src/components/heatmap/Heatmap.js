import CalendarHeatmap from "react-calendar-heatmap";
import React from "react";
import { connect } from "react-redux";
import { getDailyTask } from "../../actions";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./heatmap.css";
import moment from "moment";

class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      col0: false,
      col1: false,
      col2: false,
      col3: false,
      col4: false
    };
  }
  getTintedColor(color, v) {
    if (color.length > 6) {
      color = color.substring(1, color.length);
    }
    var rgb = parseInt(color, 16);
    var r = Math.abs(((rgb >> 16) & 0xff) + v);
    if (r > 255) r = r - (r - 255);
    var g = Math.abs(((rgb >> 8) & 0xff) + v);
    if (g > 255) g = g - (g - 255);
    var b = Math.abs((rgb & 0xff) + v);
    if (b > 255) b = b - (b - 255);
    r = Number(r < 0 || isNaN(r)) ? 0 : (r > 255 ? 255 : r).toString(16);
    if (r.length === 1) r = "0" + r;
    g = Number(g < 0 || isNaN(g)) ? 0 : (g > 255 ? 255 : g).toString(16);
    if (g.length === 1) g = "0" + g;
    b = Number(b < 0 || isNaN(b)) ? 0 : (b > 255 ? 255 : b).toString(16);
    if (b.length === 1) b = "0" + b;
    return "#" + r + g + b;
  }
  componentDidMount() {
    const user_id = this.props.user_id;

    const lastDay = new Date(this.props.cur_date);
    this.props.getDailyTask(user_id, shiftDate(lastDay, -1000), lastDay);
  }
  getTooltipDataAttrs = value => {
    let date = moment(value.date).format("YYYY년 MM월 DD일");
    if (value.count === 0) {
      return {
        "data-tip": `No task, ${date}`
      };
    }
    return {
      "data-tip": `${value.count} task, ${date}`
    };
  };
  handleClick = value => {
    if (value.count === 0) {
      return null;
    }
    this.props.onHandleDate(value.date);
  };

  setHeatMap() {
    let EndDate = this.props.cur_date;
    let lastDay = new Date(this.props.cur_date);

    if (this.props.board_info) {
      let data = [];
      let def_color = this.props.members.mem_info.mem_color;
      this.state.col1 = this.getTintedColor(def_color, 60);
      this.state.col2 = this.getTintedColor(def_color, 30);
      this.state.col3 = this.getTintedColor(def_color, 0);
      this.state.col4 = this.getTintedColor(def_color, -30);
      let startDate = shiftDate(lastDay, -365);
      let endDate = lastDay;
      let date = startDate;
      while (true) {
        data.push({
          count: 0,
          date: date_to_str(date, "-")
        });
        if (date_to_str(date, "-") === date_to_str(endDate, "-")) break;
        date = shiftDate(date, 1);
      }
      const state1 = this.props.board_info;
      for (let i = 0; i < state1.length; i++) {
        data.push({
          count: state1[i].board_id,
          date: state1[i].board_date
        });
      }
      return (
        <div className="user-heatmap">
          <CalendarHeatmap
            startDate={shiftDate(EndDate, -365)}
            endDate={EndDate}
            values={data}
            tooltipDataAttrs={this.getTooltipDataAttrs}
            onClick={this.handleClick}
            transformDayElement={(element, value) => {
              let color;
              if (!value) {
              } else if (value.count === 0) {
                color = "#eeeeee";
              } else if (value.count <= 3) {
                color = this.state.col1;
              } else if (value.count <= 6) {
                color = this.state.col2;
              } else if (value.count <= 9) {
                color = this.state.col3;
              } else {
                color = this.state.col4;
              }
              return React.cloneElement(element, { style: { fill: color } });
            }}
            showWeekdayLabels={true}
            monthLabels={[
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월"
            ]}
            weekdayLabels={["월", "월", "수", "수", "금", "금", "일"]}
          />
          <ReactTooltip />
        </div>
      );
    }
  }
  render() {
    return <div>{this.setHeatMap()}</div>;
  }
}

function date_to_str(format, separator) {
  let year = format.getFullYear();
  let month = format.getMonth() + 1;
  let date = format.getDate();

  return (
    year +
    separator +
    ("0" + month).slice(-2) +
    separator +
    ("0" + date).slice(-2)
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const mapStatetoProps = state => {
  return {
    members: state.members,
    board_info: state.heatmaps.info
  };
};

export default connect(mapStatetoProps, { getDailyTask })(Heatmap);
