import React from "react";
import Input from "@material-ui/core/Input";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

function CommentForm(props) {
  const [comment_contents, setCommentContents] = React.useState(
    props.comment_contents
      ? props.comment_contents
      : props.mem_id
      ? `@${props.mem_id} `
      : ""
  );

  const handleSubmit = event => {
    event.preventDefault();
    // event.stopPropagation()
    props.onSubmit(comment_contents);
    setCommentContents(props.comment_contents ? props.comment_contents : "");
  };

  const handleChange = event => {
    const value = event.target.value;
    const originValue = props.mem_id ? `@${props.mem_id} ` : "";
    if (value.length < originValue.length) {
      setCommentContents(originValue);
    } else {
      setCommentContents(value);
    }
  };

  return (
    <div className={props.inputRef ? "write_reply" : ""}>
      <ListItem>
        <ListItemIcon style={{ display: props.inputRef ? "flex" : "none" }}>
          <SubdirectoryArrowRightIcon style={{ color: "rgba(0, 0, 0, 0.3)" }} />
        </ListItemIcon>
        <div className={props.inputRef ? "reply_window" : "comment_window"}>
          <form
            style={{
              width: "100%",
              height: "100%",
              marginRight: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Input
              inputRef={props.inputRef}
              style={{ width: "93%", height: "100%", wordBreak: "break-all" }}
              placeholder="격려의 댓글을 달아주세요^^"
              onChange={handleChange}
              value={comment_contents}
              disableUnderline
              multiline
              autoFocus={true}
              inputProps={{ maxLength: 200 }}
              onBlur={props.onBlur}
              onFocus={e => {
                const value = e.target.value;
                e.target.value = "";
                e.target.value = value;
              }}
            />
            <Button
              variant="outlined"
              className="comment_register"
              onMouseDown={handleSubmit}
            >
              등록
            </Button>
          </form>
        </div>
      </ListItem>
    </div>
  );
}

export default CommentForm;
