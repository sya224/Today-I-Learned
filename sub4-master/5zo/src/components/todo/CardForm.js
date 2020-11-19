import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { deleteCard, editCard, setEditModeCard } from "../../actions";

import Collapse from "@material-ui/core/Collapse";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Button from "@material-ui/core/Button";

import "./suneditor.css"

const styles = theme => ({
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px",
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
  },
  collapseCard: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: "left",
    whiteSpace: "normal",
    marginTop: theme.spacing(-2)
  },
  button: {
    float: "right",
    marginTop: theme.spacing(1)
  }
});

const today = new Date().toISOString().split("T")[0];
class CardForm extends React.Component {
  handleDeleteCard = () => {
    this.props.deleteCard(this.props.cardlist_id, this.props.card.card_id);
  };
  state = {
    enableToolbar: false,
    card_contents: this.props.card.card_contents
  };

  handleChange = content => {
    this.setState({ card_contents: content });
  };
  onEditCard = event => {
    event.stopPropagation();
    this.props.setEditModeCard(null);
    const card = this.props.card;
    if (this.state.card_contents && this.state.card_contents.length) {
      card.card_contents = this.state.card_contents;
      this.props.editCard(card);
    }
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
  render() {
    const { classes } = this.props;
    return (
      <div onDoubleClick={this.handleCardClick}>
        <Collapse
          in={this.props.editModeList === this.props.cardlist_id}
          className={classes.collapseCard}
          timeout="auto"
          unmountOnExit
          onClick={this.handleChange}
        >
          {this.props.card.card_id === this.props.editModeCard ? (
            <SunEditor
              lang="ko"
              enable={true}
              showToolbar={true}
              onChange={this.handleChange}
              setContents={
                this.props.card.card_contents
                  ? `${this.props.card.card_contents}`
                  : ""
              }
              setOptions={{
                height: "auto",
                stickyToolbar: 50,
                placeholder: "오늘 공부한 내용을 입력해주세요",
                resizingBar: false,
                buttonList: [
                  ["font", "fontSize", "formatBlock"],
                  ["bold", "underline", "italic", "strike"],
                  ["fontColor", "hiliteColor", "textStyle"],
                  ["removeFormat"],
                  ["outdent", "indent"],
                  ["align", "horizontalRule", "list", "lineHeight"],
                  ["table", "link", "image", "video"],
                  ["fullScreen", "preview", "showBlocks"]
                ],
                font: ['Arial', 'tahoma', 'Courier New,Courier','Roboto','PlayfairDisplay','Dancing Script','Great Vibes', 'Godo', 'Viga'],
              }}
            />
          ) : (
            <SunEditor
              lang="ko"
              disable={true}
              showToolbar={false}
              setContents={
                this.props.card.card_contents
                  ? `${this.props.card.card_contents}`
                  : ""
              }
              onChange={this.handleChange}
              setOptions={{
                height: "auto",
                stickyToolbar: 50,
                placeholder: "오늘 공부한 내용을 입력해주세요",
                resizingBar: false,
                buttonList: [
                  ["font", "fontSize", "formatBlock"],
                  ["bold", "underline", "italic", "strike"],
                  ["fontColor", "hiliteColor", "textStyle"],
                  ["removeFormat"],
                  ["outdent", "indent"],
                  ["align", "horizontalRule", "list", "lineHeight"],
                  ["table", "link", "image", "video"],
                  ["fullScreen", "preview", "showBlocks"]
                ],
                font: ['Arial', 'tahoma', 'Courier New,Courier','Roboto','PlayfairDisplay','Dancing Script','Great Vibes', 'Godo', 'Viga'],
              }}
            />
              // <div
              //   dangerouslySetInnerHTML={{
              //     __html: this.props.card.card_contents
              //   }}
              // />
            )}

          {this.props.editModeCard === this.props.card.card_id ? (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.onEditCard}
            >
              저장
            </Button>
          ) : null}
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editModeList: state.editModeList,
    editModeCard: state.editModeCard
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { deleteCard, editCard, setEditModeCard })(CardForm)
);
