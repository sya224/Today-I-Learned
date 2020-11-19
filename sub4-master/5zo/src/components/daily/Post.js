import React from "react";
import apis from "../../apis/apis";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Typography, FormControlLabel } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import LockIcon from "@material-ui/icons/Lock";
import "typeface-roboto";
import SubPost from "./SubPost";
import Tag from "./Tag";
import Comment from "./comment/Comment";
import Switch from "@material-ui/core/Switch";
import storage from "lib/storage";
import { Grid } from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3)
  },
  category: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },
  showBorder: {
    display: "flex",
    alignItems: "center",
    marginBottom: "17px",
    padding: "0 0 10px",
    borderBottom: "1px solid #ebebeb",
    "&:hover": {
      cursor: "pointer"
    }
  },
  noContent: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    display: "block",
    fontWeight: 700,
    fontSize: "1.6875em",
    lineHeight: "1.4444em",
    flexGrow: "1"
  },
  showContent: {
    display: "block"
  },
  hideContent: {
    display: "none",
  },
  lock: {
    marginTop: "4px",
    marginRight: "2px"
  },
  container: {
    display: 'flex',
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

const renderSubPost = props => {
  return props.cardLists[props.list_id].cardlist_cards.map(card_id => {
    if (props.cards[card_id]) {
      return <SubPost card_id={card_id} key={card_id} />;
    }
  });
};

const renderTags = props => {
  if (props.tags[props.list_id]) {
    return props.tags[props.list_id].map(tag => {
      return <Tag name={tag.tag_name} key={tag.tag_id}></Tag>;
    });
  }
};

const Post = props => {
  const classes = useStyles();
  const title_id = `title${props.list_id}`;
  const icon_id = `icon${props.list_id}`;
  const content_id = `content${props.list_id}`;

  const [state, setState] = React.useState({
    checked: !(props.cardLists[props.list_id].cardlist_secret),
  });

  //
  const [commentState, setCommentState] = React.useState(false)
  const [postState, setPostState] = React.useState(false);

  const csChange = () => {
    setCommentState(view => !view)
  }

  const psChange = () => {
    setPostState(view => !view)
  }

  const handleChange = name => async e => {
    e.stopPropagation();
    // checked : 공개, unchecked : 비공개
    setState({ ...state, checked: e.target.checked });
    const cardList = props.cardLists[props.list_id];
    cardList.cardlist_secret = !(e.target.checked);
    // card 배열 String 으로
    let cardList_cards_string = "[";

    cardList.cardlist_cards.map(
      card => (cardList_cards_string = cardList_cards_string.concat(card + ","))
    );
    if (cardList_cards_string.length === 1) {

    } else {
      cardList_cards_string = cardList_cards_string.substr(
        0,
        cardList_cards_string.length - 1
      );
    }
    cardList_cards_string = cardList_cards_string.concat("]");
    await apis.put(`/cardlist`, {
      board_id: cardList.board_id,
      cardlist_cards: cardList_cards_string,
      cardlist_color: cardList.cardlist_color,
      cardlist_heart: cardList.cardlist_heard,
      cardlist_id: cardList.cardlist_id,
      cardlist_name: cardList.cardlist_name,
      cardlist_secret: !(e.target.checked)
    });
  };
  const handleClick = e => {
    e.stopPropagation();
  };

  const loggedUser = storage.get("loggedInfo").mem_id;
  if(props.cardLists[props.list_id]){
    if(props.cardLists[props.list_id].cardlist_cards.length === 0){
      return null
    }else{
      return (
        <Paper className={classes.paper}>
          <div
            id={title_id}
            className={
              !props.cardLists[props.list_id].cardlist_cards.length &&
                !props.tags[props.list_id]
                ? classes.noContent
                : classes.showBorder
            }
            onClick={function () {
              if (document.getElementById(icon_id).style.display !== "none") {
                const icon = document.getElementById(icon_id).childNodes[0]
                  .childNodes[0];
                if (icon.getAttribute("d") === "M7 14l5-5 5 5z") {
                  icon.setAttribute("d", "M7 10l5 5 5-5z");
                  document.getElementById(title_id).className = classes.category;
                  document.getElementById(content_id).className = classes.hideContent;
                } else {
                  icon.setAttribute("d", "M7 14l5-5 5 5z");
                  document.getElementById(title_id).className = classes.showBorder;
                  document.getElementById(content_id).className = classes.showContent;
                }
              }
            }}
          >
            <div
              style={{
                display: props.cardLists[props.list_id].cardlist_secret
                  ? "inline-block"
                  : "none"
              }}
              className={classes.lock}
            >
              <LockIcon></LockIcon>
            </div>
    
            <Typography variant="h1" className={classes.title}>
              {props.cardLists[props.list_id].cardlist_name}
            </Typography>
            {/* <div style={{display: "flex", alignItems: "center"}}> */}
            {props.user_id === loggedUser || "admin" === loggedUser ? (
              <div>
                비공개
                <Switch
                  checked={state.checked}
                  onChange={handleChange("checked")}
                  onClick={handleClick}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                공개
              </div>
            ) : null}
            <div
              style={{
                display:
                  !props.cardLists[props.list_id].cardlist_cards.length &&
                    !props.tags[props.list_id]
                    ? "none"
                    : "flex"
                , alignItems: "center"
              }}
              id={icon_id}
            >
              <ArrowDropUpIcon></ArrowDropUpIcon>
            </div>
          </div>
          {/* </div> */}
    
          <div id={content_id} >
            {renderSubPost(props)}
            <div style={{marginTop: "-20px"}}>{renderTags(props)}</div>
            <div/>
            <FormControlLabel 
              control={<span> </span>} 
              label= {commentState ?
                props.comments[props.list_id] ? `댓글 ( ${Object.keys(props.comments[props.list_id]).length} ) ▲`  : null
              :
                props.comments[props.list_id] ? `댓글 ( ${Object.keys(props.comments[props.list_id]).length} ) ▼` : null
              } 
              onClick={csChange}
              style={{
                marginLeft : '1px',
                marginTop : "20px"
              }}
            />
            <div className={classes.container}>
              <Collapse in={commentState} style={{ display: 'inline-block', width: '100%' }}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item style={{ width: "100%" }}>
                    <Comment
                      list_id={props.list_id}
                      user_id={props.user_id}
                      date={props.date}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </div>
          </div>
        </Paper>
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    cardLists: state.cardLists,
    cards: state.cards,
    tags: state.tag,
    comments : state.comments
  };
};

export default connect(mapStateToProps)(Post);
