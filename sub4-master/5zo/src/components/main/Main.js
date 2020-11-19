import React from "react";
import { connect } from "react-redux";
import { fetchMembers } from "../../actions";
import Grid from "@material-ui/core/Grid";
import Listing from "./Listing";
import Heatmap from "../heatmap/Heatmap";
class Main extends React.Component {
  componentDidMount() {
    //this.props.fetchMembers();
  }
  users(props) {
    // if (this.props.members) {
    //   return this.props.members.map(member => (
    //     <div key={member.mem_id}>
    //       {member.mem_id}님, 닉네임은 {member.mem_nick}, 이메일은 {member.mem_email}
    //     </div>
    //   ));
    // }
    if (this.props.members.mem_info) {
      const member = this.props.members.mem_info;
      return (
        <div key={member.mem_id}>
          {member.mem_id}님, 닉네임은 {member.mem_nick}, 이메일은{" "}
          {member.mem_email}
        </div>
      );
    }
  }
  render() {
    const list_cards = [
      {
        id: 1,
        title: "카드리스트1입다",
        tags: [
          { id: 1, name: "tag1" },
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
          { id: 4, name: "tag4" }
        ]
      },
      {
        id: 2,
        title: "카드55입다",
        tags: [
          { id: 1, name: "tag1" },
          { id: 3, name: "tag3" }
        ]
      },
      {
        id: 3,
        title: "카드리21입다",
        tags: [
          { id: 2, name: "tag2" },
          { id: 4, name: "tag4" }
        ]
      },
      {
        id: 4,
        title: "카드리스트4입다",
        tags: [
          { id: 1, name: "tag1" },
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
          { id: 4, name: "tag4" }
        ]
      },
      {
        id: 5,
        title: "카드리스트15입다",
        tags: [
          { id: 1, name: "tag1" },
          { id: 3, name: "tag3" }
        ]
      }
    ];
    let cardList;
    cardList = <Listing cards={list_cards} type={"card"} />;
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Heatmap />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              유저목록 : {this.users()}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              인기글
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {cardList}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              최신글
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {cardList}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    //members: Object.values(state.members)
    members: state.members
  };
};

export default connect(mapStatetoProps, { fetchMembers })(Main);
