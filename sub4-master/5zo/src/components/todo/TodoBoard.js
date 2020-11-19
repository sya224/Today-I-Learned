import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { fetchDailyLists } from "../../actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import TrelloCreate from "./TrelloCreate";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Icon } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  list: {
    margin: theme.spacing(1),
    color: theme.palette.error.contrastText,
    width: "300px"
  },
  addList: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "300px"
  },
  icon: {
    position: "absolute",
    right: "60px",
    opacity: "0.5",
    "&:hover": {
      opacity: "0.8"
    }
  }
});

const ListsContainer = styled(Box)`
  height: 100%;
  display: flex;
  justifycontent: space-around;
  flex-direction: row;
  flexwrap: nowrap;
`;
const Divs = styled.div`
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 80vh;
`;
const Contain = styled(Container)`
  display: flex;
  height: 100%;
`;

const date = "9999-12-31";
class TodoBoard extends React.Component {
  componentDidMount() {
    if (this.props.members.mem_info) {
      this.props.fetchDailyLists(this.props.members.mem_info.mem_id, date);
    }
  }

  RenderList() {
    const { classes } = this.props;

    if (this.props.boards && this.props.boardDict[date]) {
      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict[date]].board_lists
      )
        ? this.props.boards[this.props.boardDict[date]].board_lists
        : JSON.parse(this.props.boards[this.props.boardDict[date]].board_lists);

      return board_lists.map((list, index) => {
        if (this.props.cardLists[list]) {
          return (
            <Draggable
              draggableId={`list-${list}`}
              index={index}
              key={list}
              isDragDisabled={Boolean(this.props.editModeCard)}
            >
              {provided => (
                <Grid spacing={2} key={this.props.cardLists[list].cardlist_id}>
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={classes.list}
                  >
                    <List
                      board_id={this.props.boardDict[date]}
                      cardlist_id={this.props.cardLists[list].cardlist_id}
                      title={this.props.cardLists[list].cardlist_name}
                    />
                  </div>
                </Grid>
              )}
            </Draggable>
          );
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Divs noScrollY={true} style={{ height: "100%" }}>
        <Typography
          variant="h4"
          style={{
            whiteSpace: "nowrap",
            paddingLeft: "10px"
          }}
        >
          What I will learn in the future
          {this.props.editModeList ? null : (
            <Icon className={classes.icon} fontSize="small" onClick={()=>this.props.expandTodo()}>
              {this.props.isExpanding?"close":"open_with"}
            </Icon>
          )}
        </Typography>

        <Typography
          variant="body"
          style={{
            whiteSpace: "nowrap",
            paddingLeft: "10px"
          }}
        >
          앞으로 공부하고 싶은 것들을 계획하세요.
        </Typography>
        <Contain style={{ padding: "0px" }}>
          <Droppable
            droppableId={String(this.props.boardDict[date])}
            type="list"
            direction="horizontal"
            style={{ height: "100%" }}
          >
            {provided => (
              <ListsContainer
                container={true}
                spacing={2}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.RenderList()}
                {provided.placeholder}
                <Box item={true} className={classes.addList} elevation={0}>
                  <TrelloCreate
                    date={date}
                    board_id={this.props.boardDict[date]}
                  />
                </Box>
              </ListsContainer>
            )}
          </Droppable>
        </Contain>
      </Divs>
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
  connect(mapStateToProps, { fetchDailyLists })(TodoBoard)
);
