import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setEditModeList, setEditModeCard, getDailyTask } from "../../actions";

import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";
import _ from "lodash";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import moment from "moment";
import storage from "lib/storage";

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

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "M월", { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "M월 d일", { locale: this.locale });
  }
}

const styles = theme => ({
  Keyboard: {
    margin: 0
  },
  arrow: {
    marginTop: "0.5em",

    opacity: "0.5",

    "&:hover": {
      opacity: "0.8",
      cursor: "pointer"
    }
  },
  expand: {
    marginTop: 0,
    display: "inline"
  }
});

// const selectedDays = [1, 2, 3, 12];
const today = new Date().toISOString().split("T")[0];

const theme = color =>
  createMuiTheme({
    palette: {
      primary: { main: color }
    },
    typography: {
      fontFamily: "'Viga', 'Godo', 'sans-serif'",
    }
  });

class DatePicker extends React.Component {
  state = { selectedDate: new Date(), open: false, yearChange: false };
  componentDidMount() {
    if (this.props.date) {
      const date = new Date(this.props.date);
      this.handleMonthChange(date);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let year = prevState.selectedDate.getFullYear();
    let month = prevState.selectedDate.getMonth() + 1;
    let date = prevState.selectedDate.getDate();
    const selectedDate = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + date).slice(-2);
    if(nextProps.date !== selectedDate){
      return {selectedDate : new Date(nextProps.date)};
    }
    return null;
  }
  handleYearChange = date => {
    this.setState({yearChange : true})
  }
  handleMonthChange = date => {
    this.setState({yearChange : false})
    let user_id = this.props.user_id;
    if(!user_id) user_id = storage.get('loggedInfo').mem_id;
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 2);
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.props.getDailyTask(
      user_id,
      firstDate,
      lastDate
    );
  };

  handleDateChange = date => {
    // this.setState({ selectedDate: date });
    this.setState({open : false})
    if(moment(date).isValid()){
      // let isoDate = date.toISOString().split("T")[0];
      date = date_to_str(date, "-")
      this.props.onChangeDate(date);
      if (date > today) {
        this.props.setEditModeList(null);
        this.props.setEditModeCard(null);
      }
    }
  };
  toNextDate = () => {
    const date = new Date(this.props.date);
    if (this.props.mode === "calendar") {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setDate(date.getDate() + 1);
    }
    this.handleDateChange(date);
  };
  toPrevDate = () => {
    const date = new Date(this.props.date);
    if (this.props.mode === "calendar") {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setDate(date.getDate() - 1);
    }
    this.handleDateChange(date);
  };
  render() {
    const { classes, mode, members } = this.props;
    const color = members.mem_info
      ? members.mem_info.mem_color
        ? members.mem_info.mem_color
        : "#94C9A9"
      : "#94C9A9";
    return (
      <ThemeProvider theme={theme(color)}>
        <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
          <Grid container>
            <Grid xs={1} container item justify="flex-start"></Grid>
            <Grid
              xs={10}
              style={{ flexWrap: "nowrap" }}
              container
              item
              justify="center"
            >
              <Icon className={classes.arrow} onClick={this.toPrevDate}>
                arrow_back_ios
              </Icon>
              <KeyboardDatePicker
                className={classes.Keyboard}
                autoOk={mode === "calendar" ? true : false}
                views={
                  mode === "calendar"
                    ? ["year", "month"]
                    : ["year", "month", "date"]
                }
                variant="inline"
                format={mode === "calendar" ? "yyyy년 MM월" : "yyyy년 MM월 dd일"}
                margin="normal"
                id="date-picker-inline"
                label={mode === "calendar" ? "년 월" : "날짜"}
                value={new Date(this.props.date)}
                onChange={this.handleDateChange}
                onMonthChange={this.handleMonthChange}
                onYearChange={this.handleYearChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                renderDay={(
                  day,
                  selectedDate,
                  isInCurrentMonth,
                  dayComponent
                ) => {
                  // const isSelected =
                  //   isInCurrentMonth && selectedDays.includes(day.getDate());
                  const days = _.mapKeys(this.props.boardInfo, "board_date");

                  return (
                    <div
                      style={{
                        backgroundColor: `rgba(
                        ${parseInt(color.slice(1, 3), 16)},
                        ${parseInt(color.slice(3, 5), 16)},
                        ${parseInt(color.slice(5, 7), 16)},
                        
                        ${
                          days[date_to_str(day, "-")]
                            ? days[date_to_str(day, "-")].board_id * 0.1
                            : 0
                        }
                      )`
                      }}
                    >
                      {dayComponent}
                    </div>
                  );
                }}
              />
              <Icon className={classes.arrow} onClick={this.toNextDate}>
                arrow_forward_ios
              </Icon>
            </Grid>
            <Grid xs={1} container item justify="flex-end">
              {this.props.editModeList ? (
                <Icon
                  onClick={() => {
                    this.props.setEditModeList(null);
                  }}
                  className={classes.expand}
                >
                  close
                </Icon>
              ) : null}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    editModeList: state.editModeList,
    boardInfo: state.heatmaps.info,
    members: state.members
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { getDailyTask, setEditModeList, setEditModeCard })(
    DatePicker
  )
);
