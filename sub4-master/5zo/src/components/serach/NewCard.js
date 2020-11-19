import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";
import history from "../../history";
class NewCard extends Component {
  render() {
    const moveDetail = e => {
      history.push(
        `/daily/${cardList.mem_id}/${cardList.board_date.replace(/-/gi, "")}`
      );
    };
    const styles = {
      root: {
        textAlign: "left",
        marginBottom: 12,
        marginTop: 12,
        minWidth: this.props.widthPer,
        cursor: "pointer"
      },
      user: {
        fontSize: 14,
        textAlign: "left",
        verticalAlign: "middle",
        display: "flex",
        alignItems: "center"
      },
      tags: {},
      date: {
        textAlign: "right"
      },
      avatar: {
        display: "flex",
        float: "left"
      }
    };
    let cardList = this.props.cardList;
    if (cardList) {
      return (
        <Card style={styles.root} variant="outlined" onClick={moveDetail}>
          <CardContent>
            <Typography style={styles.user} color="textSecondary">
              <Avatar
                style={styles.avatar}
                component={"span"}
                alt="Remy Sharp"
                src={cardList.mem_thumb}
              />
              <span style={{ marginLeft: "10px" }}>@{cardList.mem_id}</span>
            </Typography>
            <Typography variant="body2" component="p" style={styles.date}>
              {cardList.board_date}
            </Typography>
            <Typography variant="h5" component="h2">
              {cardList.cardlist_name}
            </Typography>
            <Typography style={styles.tags} color="textSecondary">
              {cardList.tag_name
                .split(",")
                .map(tag => (tag !== "" ? `#${tag}  ` : ``))}
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default NewCard;
