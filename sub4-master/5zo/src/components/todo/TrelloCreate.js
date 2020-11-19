import React from "react";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { addList, addCard, addBoard } from "../../actions";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

class TrelloCreate extends React.PureComponent {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { board_id, date } = this.props;
    const { text } = this.state;
    const cardlist_name = text;

    if (text) {
      this.setState({
        text: ""
      });
      this.props.addList(board_id, cardlist_name,date);
    }

    return;
  };

  handleAddCard = () => {
    const { cardlist_id } = this.props;
    const { text } = this.state;
    const card_name = text;

    if (text) {
      this.setState({
        text: ""
      });
      this.props.addCard(cardlist_id, card_name);
    }
  };

  renderOpenForm = () => {
    const { date } = this.props;
    const buttonText = date ? "Add another post" : "Add another subtitle";
    const buttonTextOpacity = date ? 1 : 0.5;
    const buttonTextColor = date ? "white" : "inherit";
    const buttonTextBackground = date ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  render() {
    const { text } = this.state;
    const { board_id, date } = this.props;
    return this.state.formOpen ? (
      <TrelloForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
        board_id={board_id}
        submit={date ? this.handleAddList : this.handleAddCard}
      >
        {date ? "Add Post" : "Add what i will learn"}
      </TrelloForm>
    ) : (
      <TrelloOpenForm board_id={board_id} onClick={this.openForm}>
        {date ? "Add another post" : "Add what i will learn"}
      </TrelloOpenForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    members: state.members
  };
};

export default connect(mapStateToProps, { addCard, addList, addBoard })(
  TrelloCreate
);
