import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import List from "./List";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDailyLists, setEditModeList } from "../../actions";
import TrelloCreate from "./TrelloCreate";
import { connect } from "react-redux";
import DatePicker from "../helper/DatePicker";
import Typography from "@material-ui/core/Typography";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter } from "react-router-dom";
import history from "../../history";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
    color: theme.palette.error.contrastText,
    width: "100%"
  },
  addList: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%"
  },
  icon: {
    textDecoration: "inherit",
    color: "grey",
    opacity: "0.5",
    "&:hover": {
      opacity: "0.8"
    }
  }
});

const today = new Date().toISOString().split("T")[0];
class DailyBoard extends React.Component {
  state = {
    date: new Date().toISOString().split("T")[0]
  };

  componentDidMount() {
    let { date } = this.state;
    if (this.props.match.params.date) {
      date = this.props.match.params.date;
      date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
      this.setState({ date: date });
      this.props.fetchDailyLists(this.props.members.mem_info.mem_id, date);
    } else if (this.props.members.mem_info) {
      date = new Date().toISOString().split("T")[0];
      this.props.fetchDailyLists(this.props.members.mem_info.mem_id, date);
      this.setState({ date: date });
    }
  }
  handleDoubleClick = list_id => {
    if (this.state.date < today) {
      if (this.props.editModeList === list_id) {
        this.props.setEditModeList(null);
      } else {
        this.props.setEditModeList(list_id);
      }
    }
  };

  RenderList() {
    const { date } = this.state;
    if (this.props.boardDict[date]) {
      const { classes } = this.props;

      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict[date]].board_lists
      )
        ? this.props.boards[this.props.boardDict[date]].board_lists
        : JSON.parse(this.props.boards[this.props.boardDict[date]].board_lists);

      return board_lists.map((list, index) => {
        if (this.props.cardLists[list]) {
          return (
            <Draggable
              isDragDisabled={
                this.state.date < today || Boolean(this.props.editModeCard)
              }
              draggableId={String(`list-${list}`)}
              index={index}
              key={list}
            >
              {provided => (
                <div
                  className={classes.list}
                  key={this.props.cardLists[list].cardlist_id}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  onDoubleClick={() => this.handleDoubleClick(list)}
                >
                  <List
                    board_id={this.props.boardDict[date]}
                    date={date}
                    cardlist_id={this.props.cardLists[list].cardlist_id}
                    title={this.props.cardLists[list].cardlist_name}
                  />
                </div>
              )}
            </Draggable>
          );
        } else {
          return <></>;
        }
      });
    }
  }
  toDaily = () => {
    this.props.setEditModeList(null);
    history.push(
      `/daily/${this.props.members.mem_info.mem_id}/${this.state.date.replace(
        /-/gi,
        ""
      )}`
    );
  };
  render() {
    const { classes } = this.props;
    const { date } = this.state;
    if (this.props.members.mem_info.mem_auth === 2) {
      alert("글 쓰기 권한이 없습니다.");
      history.push("/");
    }
    return (
      <Box style={{ overflow: "hidden" }}>
        <Droppable
          droppableId={String(this.props.boardDict[date])}
          direction="vertical"
          type="list"
          isDropDisabled={date < today}
        >
          {provided => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ whiteSpace: "nowrap" }}
            >
              <Typography variant="h4">
                Today I learn
                <Tooltip title="Daily에서 글로 보기">
                  <Icon
                    button
                    component={Link}
                    className={classes.icon}
                    style={{}}
                    onClick={this.toDaily}
                  >
                    open_in_new
                  </Icon>
                </Tooltip>
              </Typography>
              <Typography variant="body">
                오늘 내가 배운 것들을 기록하세요.
                <br />
                혹은, 과거에 배운것을 확인하거나 미래에 배울 내용을 계획하세요.
              </Typography>
              <DatePicker
                onChangeDate={val => {
                  this.setState({ date: val });
                  this.props.fetchDailyLists(
                    this.props.members.mem_info.mem_id,
                    val
                  );
                  history.push(`/dashboard/${val.replace(/-/gi, "")}`);
                }}
                date={this.state.date}
              />
              {this.RenderList()}
              {provided.placeholder}
              {this.state.date >= today ? (
                <Paper className={classes.addList} elevation={0}>
                  <TrelloCreate
                    date={date}
                    board_id={this.props.boardDict[date]}
                  />
                </Paper>
              ) : null}
            </Box>
          )}
        </Droppable>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
    members: state.members,
    editModeList: state.editModeList,
    editModeCard: state.editModeCard
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { fetchDailyLists, setEditModeList })(
    withRouter(DailyBoard)
  )
);
