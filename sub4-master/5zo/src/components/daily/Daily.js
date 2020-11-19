import React from "react";
import DatePicker from "../helper/DatePicker";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Post from "./Post";
import storage from "lib/storage";

const styles = theme => ({
  icon: {
    textDecoration: "inherit",
    color: "grey",
    opacity: "0.5",
    "&:hover": {
      opacity: "0.8"
    }
  },
  go_dashboard: {
    textAlign: "right",
    marginRight: "16px",
    marginTop: "12px",
    marginBottom: "-16px"
  }
});

class Daily extends React.Component {
  renderPost() {
    if (this.props.boardDict[this.props.date]) {
      const board_id = this.props.boardDict[this.props.date];
      const board_lists = this.props.boards[board_id].board_lists;
      return board_lists.map(list_id => {
        if (this.props.cardLists[list_id]) {
          return (
            <Post
              user_id={this.props.user_id}
              list_id={list_id}
              key={list_id}
              date={this.props.date}
            />
          );
        }
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <DatePicker
          user_id={this.props.user_id}
          date={this.props.date}
          onChangeDate={changedDate => {
            this.props.onHandleDate(changedDate);
          }}
        />
        <div
          style={{
            display: this.props.boardDict[this.props.date] ? "" : "none"
          }}
          className={classes.go_dashboard}
        >

          {storage.get("loggedInfo").mem_id === this.props.user_id ?
            <Tooltip title="Dashboard에서 확인하기">
              <Icon
                button
                component={Link}
                className={classes.icon}
                to={`/dashboard/${this.props.date.replace(/-/gi, "")}`}
              >
                open_in_new
            </Icon>
            </Tooltip>
            :
            null
          }


        </div>
        {this.renderPost()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(Daily)
);
