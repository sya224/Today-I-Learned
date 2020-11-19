import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TrelloCreate from "./TrelloCreate";
import TrelloForm from "./TrelloForm";
import { connect } from "react-redux";
import Card from "./Card";
import Icon from "@material-ui/core/Icon";
import {
  deleteList,
  editList,
  setEditModeList,
  setEditModeCard,
  memTag,
  addTag,
  deleteTag
} from "../../actions";
import { Droppable } from "react-beautiful-dnd";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { TwitterPicker } from "react-color";
import Chips from "../serach/ChipLibrary/Chips";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteModal from "../helper/DeleteModal";
import "./todo.css"

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    padding: theme.spacing(1),
    // backgroundColor: "#94C9A9",
    color: theme.palette.error.contrastText
  },
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px"
  },
  titleContainer: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    alignItems: "center",
    cursor: "pointer"
  },
  create: {
    textAlign: "left"
  },
  typography: { marginLeft: theme.spacing(1), marginTop: theme.spacing(-0.5) },
  delete: {
    bottom: "5px",
    opacity: "0.5",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8"
    }
  },
  color: {
    width: "20px",
    height: "20px",
    border: "2px solid"
  },
  swatch: {
    marginLeft: theme.spacing(1.6),
    marginRight: theme.spacing(1)
  },
  popover: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  hashtags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    textAlign: "left",
    color: "black"
  },
  hashtagLabel: {
    alignItems: "center",
    textAlign: "left",
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    verticalAlign: "middle"
  }
});

const today = new Date().toISOString().split("T")[0];

class List extends React.Component {
  componentDidMount() {
    const cardlist_color = this.props.cardLists[this.props.cardlist_id]
      .cardlist_color;
    this.setState({ color: cardlist_color ? cardlist_color : "#94C9A9" });
    this.props.memTag(this.props.members.mem_info.mem_id, 20100101, 99991230);
  }
  state = {
    color: "#94C9A9",
    displayColorPicker: false,
    isEditing: false,
    listTitle: this.props.cardLists[this.props.cardlist_id].cardlist_name
  };

  renderCard() {
    const cards = Array.isArray(
      this.props.cardLists[this.props.cardlist_id].cardlist_cards
    )
      ? this.props.cardLists[this.props.cardlist_id].cardlist_cards
      : JSON.parse(this.props.cardLists[this.props.cardlist_id].cardlist_cards);
    return cards.map((card_id, index) => {
      if (this.props.cards[card_id]) {
        return (
          <Card
            card_id={card_id}
            index={index}
            date={this.props.date ? this.props.date : null}
            card={this.props.cards[card_id]}
            cardlist_id={this.props.cardlist_id}
            key={card_id}
          />
        );
      } else {
        return <></>;
      }
    });
  }

  handleDeleteList = () => {
    this.props.deleteList(this.props.cardlist_id, this.props.board_id);
  };

  titleEditer = () => {
    return (
      <TrelloForm
        text={this.state.listTitle}
        onChange={this.handleChange}
        closeForm={this.closeForm}
        submit={this.saveList}
      >
        Save
      </TrelloForm>
    );
  };
  closeForm = () => {
    this.setState({ isEditing: false });
  };
  saveList = () => {
    const cardlist = this.props.cardLists[this.props.cardlist_id];
    cardlist.cardlist_name = this.state.listTitle;

    this.props.editList(cardlist);
    this.setState({ isEditing: false });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ listTitle: e.target.value });
  };

  handleSetEditModeList = e => {
    e.stopPropagation();
    if (this.props.editModeList === this.props.cardlist_id) {
      this.props.setEditModeList(null);
    } else {
      this.props.setEditModeList(this.props.cardlist_id);
    }
  };
  handleTitleDoubleClick = () => {
    if (!this.props.date || this.props.date >= today) {
      this.setState({ isEditing: true });
    }
  };
  handleClick = event => {
    event.stopPropagation();
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  handleChangeColor = color => {
    const cardlist = this.props.cardLists[this.props.cardlist_id];
    cardlist.cardlist_color = color.hex;
    this.props.editList(cardlist);
    this.setState({ displayColorPicker: false });
  };
  handleSecret = () => {
    const cardlist = this.props.cardLists[this.props.cardlist_id];
    cardlist.cardlist_secret = !cardlist.cardlist_secret;
    this.props.editList(cardlist);
  };
  onChangeChips = chips => {
    const listTags = this.props.tags[this.props.cardlist_id];
    const chipsWithouthash = chips.map(chip =>
      chip.startsWith("#") ? chip.slice(1) : chip
    );
    if ((!listTags && chips) || listTags.length < chips.length) {
      if (
        !chipsWithouthash
          .slice(0, chipsWithouthash.length - 1)
          .includes(chipsWithouthash[chipsWithouthash.length - 1])
      ) {
        this.props.addTag(this.props.cardlist_id, chipsWithouthash[chipsWithouthash.length - 1]);
      }
    } else {
      listTags.forEach(tag => {
        if (!chipsWithouthash.includes(tag.tag_name)) {
          this.props.deleteTag(this.props.cardlist_id, tag.tag_id);
        }
      });
    }
  };
  handleContextMenu = event => {
    event.preventDefault();
    if (this.props.date) {
      if (this.props.editModeList === this.props.cardlist_id) {
        this.props.setEditModeList(null);
        this.props.setEditModeCard(null);
      } else {
        this.props.setEditModeList(this.props.cardlist_id);
      }
    }
  };
  render() {
    const { classes } = this.props;
    const color = this.props.cardLists[this.props.cardlist_id].cardlist_color
      ? this.props.cardLists[this.props.cardlist_id].cardlist_color
      : this.props.members.mem_info.mem_color
      ? this.props.members.mem_info.mem_color
      : "#94C9A9";

    return (
      <Paper
        onContextMenu={this.handleContextMenu}
        className={classes.list}
        style={{
          backgroundColor: color,
          opacity: this.props.cardLists[this.props.cardlist_id].cardlist_secret
            ? 0.7
            : 1
        }}
      >
        {this.state.isEditing ? (
          this.titleEditer()
        ) : (
          <div
            className={classes.titleContainer}
            onClick={this.handleTitleDoubleClick}
          >
            <div style={{ display: "flex" }}>
              <Icon className={classes.delete} onClick={this.handleClick}>
                menu
                <div
                  className={classes.color}
                  style={{ backgroundColor: "color" }}
                />
              </Icon>
              {this.props.date === today ? (
                <Icon
                  className={classes.delete}
                  onClick={this.handleSetEditModeList}
                >
                  edit
                </Icon>
              ) : null}
              <Typography
                className={classes.typography}
                variant={"h6"}
              >
                {this.props.title}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              {this.props.cardLists[this.props.cardlist_id].cardlist_secret ? (
                <Icon style={{ opacity: 0.5 }}>lock</Icon>
              ) : null}
              <DeleteModal
                onDelete={this.handleDeleteList}
                type="글"
                title={
                  this.props.cardLists[this.props.cardlist_id].cardlist_name
                }
              >
                <Icon className={classes.delete} fontSize="small">
                  delete
                </Icon>
              </DeleteModal>
            </div>
          </div>
        )}
        {this.state.displayColorPicker ? (
          <React.Fragment>
            {this.props.date ? (
              <Paper className={classes.popover} on={this.handleClose}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        !this.props.cardLists[this.props.cardlist_id]
                          .cardlist_secret
                      }
                      onChange={this.handleSecret}
                      color="primary"
                    />
                  }
                  labelPlacement="top"
                  label={
                    this.props.cardLists[this.props.cardlist_id].cardlist_secret
                      ? "비공개"
                      : "공개"
                  }
                />
                <TwitterPicker
                  style={{ marginRight: 0, border: null }}
                  color={color}
                  onChange={this.handleChangeColor}
                  triangle="hide"
                />
              </Paper>
            ) : (
              <>
                <div onClick={this.handleClose} />
                <TwitterPicker
                  className={classes.popover}
                  style={{ marginRight: 0, border: null }}
                  color={color}
                  onChange={this.handleChangeColor}
                  triangle="hide"
                />
              </>
            )}
          </React.Fragment>
        ) : null}
        <Droppable
          droppableId={String(this.props.cardlist_id)}
          type={this.props.date >= today || !this.props.date ? "card" : "card1"}
        >
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.renderCard()}
              {provided.placeholder}

              {this.props.editModeList === this.props.cardlist_id ? (
                <>
                  <div className={classes.hashtags}>
                    <Paper className={classes.hashtagLabel}>
                      <Box> #Tags : </Box>
                    </Paper>
                    <Chips
                      value={
                        this.props.tags[this.props.cardlist_id]
                          ? this.props.tags[this.props.cardlist_id].map(chip =>
                              chip.tag_name.startsWith("#")
                                ? chip.tag_name
                                : `#${chip.tag_name}`
                            )
                          : []
                      }
                      onChange={this.onChangeChips}
                      suggestions={
                        this.props.tags.mem_tags
                          ? this.props.tags.mem_tags.map(tag => tag.tag_name)
                          : []
                      }
                    />
                  </div>
                </>
              ) : null}
              {this.props.date >= today || !this.props.date ? (
                <Box className={classes.create} elevation={0}>
                  <TrelloCreate cardlist_id={this.props.cardlist_id} />
                </Box>
              ) : null}
            </div>
          )}
        </Droppable>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    cardLists: state.cardLists,
    editModeList: state.editModeList,
    members: state.members,
    tags: state.tag
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {
    deleteList,
    editList,
    setEditModeList,
    setEditModeCard,
    memTag,
    addTag,
    deleteTag
  })(List)
);
