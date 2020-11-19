import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import {
  editCard,
  setEditModeCard,
  setEditModeList,
  deleteCard
} from "../../actions";
import TrelloForm from "./TrelloForm";
import { Draggable } from "react-beautiful-dnd";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import CardForm from "./CardForm";
import DeleteModal from "../helper/DeleteModal";

const styles = theme => ({
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    display: "flex"
  },
  delete: {
    visibility: "hidden",
    display: "none",
    right: "5px",
    bottom: "5px",
    marginLeft: "auto",
    opacity: "0.5",
    "$paper:hover &": {
      cursor: "pointer",
      visibility: "visible"
    },
    "&:hover": {
      opacity: "0.8"
    }
  }
});

const today = new Date().toISOString().split("T")[0];
class Card extends React.Component {
  state = {
    isEditing: false,
    cardText: this.props.card.card_name
  };
  saveCard = e => {
    const card = this.props.card;
    card.card_name = this.state.cardText;
    this.props.editCard(card);
    this.setState({ isEditing: false });
  };

  handleChange = e => {
    this.setState({ cardText: e.target.value });
  };

  closeForm = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteCard = () => {
    this.props.deleteCard(this.props.cardlist_id, this.props.card.card_id);
  };

  renderEditForm = () => {
    return (
      <TrelloForm
        text={this.state.cardText}
        onChange={this.handleChange}
        closeForm={this.closeForm}
        submit={this.saveCard}
      >
        Save
      </TrelloForm>
    );
  };
  handleCardClick = event => {
    event.stopPropagation();
    if (
      this.props.date === today &&
      this.props.editModeList === this.props.cardlist_id
    ) {
      this.props.setEditModeCard(this.props.card.card_id);
    }
  };
  handleContextMenu = event => {
    if (this.props.date && this.props.date === today) {
      event.preventDefault();
      event.stopPropagation();
      if (this.props.date) {
        if (this.props.editModeList === this.props.cardlist_id) {
          if (this.props.editModeCard === this.props.card.card_id) {
            this.props.setEditModeCard(null);
          } else {
            this.props.setEditModeCard(this.props.card.card_id);
          }
        } else {
          this.props.setEditModeList(this.props.cardlist_id);
          this.props.setEditModeCard(this.props.card.card_id);
        }
      }
    }
  };

  render = () => {
    const { classes } = this.props;
    return (
      <Draggable
        draggableId={`card-${this.props.card_id}`}
        index={this.props.index}
        isDragDisabled={
          !(!this.props.date || this.props.date >= today) ||
          Boolean(this.props.editModeCard)
        }
      >
        {provided => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onContextMenu={this.handleContextMenu}
            onDoubleClick={() => this.setState({ isEditing: true })}
            expanded={this.props.editModeList === this.props.cardList}
          >
            <div onClick={this.handleCardClick}>
              <div className={classes.paper}>
                {this.state.isEditing &&
                (this.props.date >= today || !this.props.date) ? (
                  this.renderEditForm()
                ) : (
                  <Typography
                    variant={
                      this.props.editModeList === this.props.cardlist_id
                        ? "h6"
                        : "body1"
                    }
                  >
                    {this.props.card.card_name}
                  </Typography>
                )}
                <Icon className={classes.delete} fontSize="small">
                  <DeleteModal
                    onDelete={this.handleDeleteCard}
                    type="소주제"
                    title={this.props.card.card_name}
                  >
                    delete
                  </DeleteModal>
                </Icon>
              </div>
              <CardForm
                date={this.props.date ? this.props.date : null}
                card={this.props.card}
                cardlist_id={this.props.cardlist_id}
              />
            </div>
          </Paper>
        )}
      </Draggable>
    );
  };
}

const mapStateToProps = state => {
  return { editModeList: state.editModeList, editModeCard: state.editModeCard };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {
    setEditModeCard,
    setEditModeList,
    editCard,
    deleteCard
  })(Card)
);
