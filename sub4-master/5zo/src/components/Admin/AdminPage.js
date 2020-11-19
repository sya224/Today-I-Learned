import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import history from "../../history";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MemberCard from "./MemberCard";
import { getAllMemberData } from "../../actions";
const widthPer = 600;

class AdminPage extends Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(props.location.search);
    this.state = {
      searchedKeyword: query.keyword || "",
      page: 1,
      limit: 5,
      keyword: query.keyword || "",
      update: true
    };
  }

  componentDidMount() {
    this.props.getAllMemberData(this.state.searchedKeyword);
  }

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };
  searchClick = () => {
    history.push(`/admin?keyword=${this.state.keyword}`);
    this.setState({
      update: false
    });
  };

  render() {
    const query = queryString.parse(this.props.location.search);
    if (!this.state.update) {
      this.props.getAllMemberData(query.keyword);
      this.setState({
        update: true
      });
    }
    return (
      <>
        <h1> 관리자 페이지 </h1>
        <div style={{ position: "relative", textAlign: "center" }}>
          <TextField
            value={this.state.keyword}
            onChange={this.handleChange}
            id="standard-basic"
            style={{ width: 400 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.searchClick}
            style={{ position: "absolute", bottom: "0px" }}
          >
            Search
          </Button>
        </div>
        <br />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{ display: "inline-block", width: widthPer }}
          >
            {this.props.memberList
              ? this.props.memberList.map(member => (
                  <MemberCard member={member}></MemberCard>
                ))
              : null}
          </div>
        </div>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    memberList: state.members.members
  };
};

export default connect(mapStatetoProps, { getAllMemberData })(AdminPage);
