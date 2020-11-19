import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import { connect } from "react-redux";
import { addComment, deleteComment, editComment } from "../../../actions";
import CommentForm from "./CommentForm";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import "moment/locale/ko"

function CommentItem({
  members,
  comment,
  cardlist_id,
  deleteComment,
  addComment,
  editComment,
  user_id,
  date
}) {
  const [mode, setMode] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleDelete = event => {
    event.stopPropagation();
    deleteComment(cardlist_id, comment.comment_id);
  };

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const renderTime = time => {
    if (moment().diff(moment(time), "months")) {
      return time;
    } else {
      return moment(time).fromNow();
    }
  };
  const routeToSearch = () => {
    history.push(`/search?member=${comment.mem_id}`);
  };
  const routeToUserPage = () => {
    history.push(`/daily/${comment.mem_id}`);
  };

  // const classes = useStyles();
  const renderItem = () => {
    return (
      <>
        <ListItemAvatar>
          <Avatar
            src={comment.mem_thumb}
            onClick={handleClick}
            className="user_image"
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flexGrow: 1 }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {comment.mem_nick}
                  <span
                    style={{
                      color: "#808080",
                      opacity: ".8",
                      marginLeft: "5px"
                    }}
                  >{`@${comment.mem_id}`}</span>{" "}
                </Button>
                <Typography
                  variant="caption"
                  display="inline"
                  color="textSecondary"
                  gutterBottom
                >
                  {renderTime(comment.comment_time)}
                </Typography>
              </div>
              {comment.mem_id === members.mem_info.mem_id ? (
                <Typography
                  variant="caption"
                  display="inline"
                  color="textSecondary"
                  gutterBottom
                >
                  <span
                    onClick={setModeEditing}
                    style={{ cursor: "pointer", marginBottom: 0 }}
                  >
                    수정
                  </span>{" "}
                  <span
                    onClick={handleDelete}
                    style={{
                      cursor: "pointer",
                      marginBottom: 0,
                      marginRight: "10px"
                    }}
                  >
                    삭제
                  </span>
                </Typography>
              ) : null}
            </div>
          }
          secondary={
            <React.Fragment className="written_comment">
              <Typography component="span" variant="body2" color="textPrimary">
                {mode === "editing" ? (
                  <span onClick={e => e.stopPropagation()}>
                    <CommentForm
                      comment_contents={comment.comment_contents}
                      onSubmit={onEditing}
                      onBlur={onblurFun}
                    />
                  </span>
                ) : (
                  comment.comment_contents
                )}
              </Typography>
            </React.Fragment>
          }
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            to={`/search?member=${comment.mem_id}`}
            onClick={routeToSearch}
          >
            유저 포스트 검색
          </MenuItem>
          <MenuItem to={`/daily/${comment.mem_id}`} onClick={routeToUserPage}>
            유저 페이지로
          </MenuItem>
        </Menu>
      </>
    );
  };
  const setModeEditing = event => {
    event.stopPropagation();
    if (mode === "editing") {
      setMode(false);
    } else if (!comment.comment_deleted) {
      setMode("editing");
    }
  };

  const refs = React.useRef();
  const setModeCommenting = e => {
    e.stopPropagation();
    if (mode === "commenting" || mode === "closed") {
      setMode(false);
    } else if (!comment.comment_deleted) {
      setMode("commenting");
    }
  };

  const onEditing = comment_contents => {
    if (comment_contents) {
      editComment(comment.cardlist_id, comment.comment_id, comment_contents);
      setMode(false);
    }
  };
  const onReplying = comment_contents => {
    const comment_reply = comment.comment_reply
      ? comment.comment_reply
      : comment.comment_id;
    if (comment_contents) {
      addComment(cardlist_id, comment_contents, comment_reply, user_id, date);
      setMode(false);
    }
  };

  const onblurFun = e => {
    e.stopPropagation();
    setMode("closed");
  };

  return (
    <>
      <ListItem
        onClick={setModeCommenting}
        className={comment.comment_reply ? "reply" : ""}
      >
        {comment.comment_reply ? (
          <ListItemIcon>
            <SubdirectoryArrowRightIcon
              className={comment.comment_deleted ? "" : "not_deleted"}
              style={{ color: "rgba(0, 0, 0, 0.3)" }}
            />
          </ListItemIcon>
        ) : null}
        {comment.comment_deleted ? (
          <div style={{ alignSelf: "center" }}>삭제된 댓글 입니다.</div>
        ) : (
          renderItem()
        )}
      </ListItem>
      {mode === "commenting" ? (
        <div style={{ width: "100%", float: "right" }}>
          <CommentForm
            inputRef={refs}
            mem_id={comment.mem_id}
            onSubmit={onReplying}
            onBlur={onblurFun}
          />
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    members: state.members
  };
};

export default connect(mapStateToProps, {
  addComment,
  deleteComment,
  editComment
})(CommentItem);
