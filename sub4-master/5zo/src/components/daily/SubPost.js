import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import "typeface-roboto";
import { connect } from "react-redux";
import Content from "./Content";
import storage from "../../lib/storage"

const useStyles = makeStyles(theme => ({
  subPost: {
    marginBottom: '25px'
  },
  title: {
    borderBottom: `1px solid ${storage.get('loggedInfo').mem_color}`,
    borderLeft: `5px solid ${storage.get('loggedInfo').mem_color}`,
    color: '#2d3434',
    fontSize: '18px',
    margin: 0,
    padding: '0 0 0 5px'
  }
}));

const SubPost = props => {
  const classes = useStyles();
  return (
    <div className={classes.subPost}>
      <Typography variant="h5" className={classes.title}>
        {props.cards[props.card_id].card_name}
      </Typography>

      {/* <div
        dangerouslySetInnerHTML={{
          __html: props.cards[props.card_id].card_contents
        }}
      /> */}
      <Content card_id={props.card_id}></Content>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

export default connect(mapStateToProps)(SubPost);
