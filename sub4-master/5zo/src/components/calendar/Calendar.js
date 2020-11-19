import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import { getDailyCal, fetchDailyLists } from "../../actions";
import { getLoggedInfo } from "../../actions";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import history from "../../history";
import DatePicker from "../helper/DatePicker";

const localizer = momentLocalizer(moment);

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

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal_events: [],
      showModal: false,
      date: new Date()
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    if (this.props.members.mem_info) {
      this.props.getDailyCal(
        this.props.members.mem_info.mem_id,
        this.props.members.mem_info.mem_reg_date,
      );
    }
  }

  onSlotChange(slotInfo) {
   moment(slotInfo.end.toLocaleString()).format(
      "YYYY-MM-DDm:ss"
    );
  }
  onEventClick(event) {
    this.state.cur_date = event.start;
    const start = date_to_str(event.start, "");
    let id = this.props.members.mem_info.mem_id;
    history.push("/daily/" + id + "/" + start);
  }
  eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle;
    if (!event.color) {
      newStyle = {
        backgroundColor: "white",
        color:  this.props.members.mem_info.mem_color,
        borderRadius: "10px",
        border: "none",
        display: "block",
        fontWeight: 'bold'
      };
    } else {
      newStyle = {
        backgroundColor: "white",
        color: event.color,
        borderRadius: "10px",
        border: "none",
        display: "block",
        fontWeight: 'bold'
      };
    }
    if (event.isMine) {
      newStyle.backgroundColor = "lightgreen";
    }
    return {
      className: "",
      style: newStyle
    };
  };
  dayStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      borderRadius: "3px",
      display: "block"
    };
    if (event.isMine) {
      newStyle.backgroundColor = "lightgreen";
    }
    return {
      className: "",
      style: newStyle
    };
  };

  setCalendar() {
    let formats = {
      dateFormat: "DD",
      monthHeaderFormat: " YYYY년 MM월"
    };
    // const { classes } = this.props;
    if (this.props.daily.info) {
      const app = this.props.daily.info;
      const data = [];
      for (let i = 0; i < app.length; i++) {
        data.push({
          id: app[i].cardlist_id,
          title: app[i].cardlist_name,
          start: app[i].date,
          end: app[i].date,
          color: app[i].cardlist_color
        });
      }

      let appointments = data;
      for (let i = 0; i < appointments.length; i++) {
        appointments[i].start = moment.utc(appointments[i].start).toDate();
        appointments[i].end = moment.utc(appointments[i].end).toDate();
      }
      let cal_events = appointments;
      const calendarOptions = {
        popup: true,
        selectable: true,
        step: 60,
        timeslots: 2,
        className: "isomorphicCalendar",
        formats
      };
      return (
        <React.Fragment>
          <DatePicker
            date={this.state.date}
            onChangeDate={date => this.setState({ date: new Date(date) })}
            mode="calendar"
          />
          <Calendar
            toolbar={false}
            selectable
            view="month"
            views={["month"]}
            localizer={localizer}
            onSelectEvent={event => this.onEventClick(event)}
            onSelectSlot={slotInfo => this.onSlotChange(slotInfo)}
            events={cal_events}
            startAccessor="start"
            endAccessor="end"
            // defaultDate={new Date()}
            date={this.state.date}
            style={{ height: 600 }}
            step={30}
            timeslots={2}
            eventPropGetter={this.eventStyleGetter}
            {...calendarOptions}
            dayPropGetter={this.dayStyleGetter}
            formats={formats}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div>
        <Container maxWidth="m">{this.setCalendar()}</Container>
      </div>
    );
  }
}
//미리 계획된 페이지?
Event.defaultProps = {
  title: "Calendar"
};
const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
    members: state.members,
    daily: state.dailyCalendar
  };
};
export default connect(mapStateToProps, {
  getLoggedInfo,
  getDailyCal,
  fetchDailyLists
})(Event);
