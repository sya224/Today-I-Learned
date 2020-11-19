import React, { Component } from "react";
import CardCard from "./CardCard";
import MemberCard from "./MemberCard";
import ListCard from "./ListCard";
import TagCard from "./TagCard";
import { connect } from "react-redux";
import { searchKeyword } from "actions";

class CardList extends Component {
  componentDidMount() {
    let type = this.props.type;
    let keyword = this.props.keyword;

    if (keyword === undefined) return;
    this.props.searchKeyword(keyword, type);
  }
  state = { cards: [] };
  setState() {
    this.state.cards = this.props.cards;
  }
  render() {
    this.setState();
    let type = this.props.type;
    let keyword = this.props.keyword;
    if (this.state.cards) {
      switch (type) {
        case "member":
          return this.state.cards.map(member => (
            <MemberCard
              member={member}
              key={member.id}
              style={{ alignItems: "center" }}
            />
          ));
        case "tag":
          return this.state.cards.map(tag => (
            <TagCard tag={tag} key={tag.id} />
          ));
        case "cardlist":
          return this.state.cards.map(list => (
            <ListCard list={list} key={list.id} />
          ));
        default:
          return this.state.cards.map(card => (
            <CardCard card={card} key={card.id} />
          ));
      }
    }
    return "";
  }
}

const mapStatetoProps = state => {
  return {
    cards: state.search.cards
  };
};
export default connect(mapStatetoProps, { searchKeyword })(CardList);
// export default CardList;
