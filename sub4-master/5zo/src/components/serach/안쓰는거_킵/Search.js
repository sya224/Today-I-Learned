import React, { Component } from "react";
import SearchBar from "./SearchBar";
import CardList from "./CardList";
import SearchNav from "./SearchNav";
import queryString from "query-string";
import { connect } from "react-redux";
import { searchKeyword } from "actions";
import { login, loginErrReset } from "actions";

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const params = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    let type = query.type;
    let keyword = params.keyword;
    if (!type) type = "card";

    return (
      <div>
        <SearchNav keyword={keyword} type={type} />
        {!params.keyword || params.keyword === "" ? null : (
          <h1> {params.keyword} 검색결과</h1>
        )}
        <div>
          <SearchBar type={type} />
          <br />
          <CardList type={type} keyword={keyword} key={keyword + type} />
        </div>
      </div>
    );
  }
}

// const mapStatetoProps = state => {
//   return {
//     mem_info : state.members.mem_info,
//     login_err : state.members.login_err
//   };
// };
// export default connect(mapStatetoProps, { login, loginErrReset })(SearchPage);
export default SearchPage;
