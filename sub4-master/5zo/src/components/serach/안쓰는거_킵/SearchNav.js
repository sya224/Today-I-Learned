import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link } from "react-router-dom";

class SearchNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let keyword = "";
    let type = "card";
    const color = "#94C9A9";
    const reverseColor = "white";
    if (this.props.keyword) keyword = this.props.keyword;
    if (this.props.type) type = this.props.type;
    return (
      <>
        <Paper style={{ maxWidth: 300 }}>
          <MenuList>
            <MenuItem
              component={Link}
              to={"/search/" + keyword + "?type=card"}
              style={{
                background: type === "card" ? color : null,
                color: type === "card" ? reverseColor : null
              }}
            >
              Card
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/search/" + keyword + "?type=cardlist"}
              style={{
                background: type === "cardlist" ? color : null,
                color: type === "cardlist" ? reverseColor : null
              }}
            >
              CardList
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/search/" + keyword + "?type=tag"}
              style={{
                background: type === "tag" ? color : null,
                color: type === "tag" ? reverseColor : null
              }}
            >
              Tag
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/search/" + keyword + "?type=member"}
              style={{
                background: type === "member" ? color : null,
                color: type === "member" ? reverseColor : null
              }}
            >
              Member
            </MenuItem>
          </MenuList>
        </Paper>
      </>
    );
  }
}
export default SearchNav;
