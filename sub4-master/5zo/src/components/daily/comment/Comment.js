import React from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { connect } from "react-redux";
import { fetchComments, addComment } from "../../../actions";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import "./comment.css"

class Comment extends React.Component {
  componentDidMount() {
    const { fetchComments, list_id } = this.props;
    fetchComments(list_id);
  }

  state = {
    reply : null
  }


  changeReply = (comment_id) => {
    this.setState({
      reply : comment_id
    })
  }

  renderComments = () => {
    const { comments, list_id, user_id, date } = this.props;

    if (comments[list_id]) {
      const commentsArray = Object.values(comments[list_id]);
      const primeComments = commentsArray.filter(comment => {
        if (comment.comment_reply === 0) {
          return comment;
        }
      });
      let orderdComments = [];
      for (let index = 0; index < primeComments.length; index++) {
        orderdComments.push(primeComments[index]);
        for (
          let commentsIndex = 0;
          commentsIndex < commentsArray.length;
          commentsIndex++
        ) {
          if (
            commentsArray[commentsIndex].comment_reply ===
            primeComments[index].comment_id
          ) {
            orderdComments.push(commentsArray[commentsIndex]);
          }
        }
      }
      return orderdComments.map(comment => {
        return (
          <div>
            <CommentItem
              key={comment.comment_id}
              user_id={user_id}
              comment={comment}
              date={date}
              cardlist_id={list_id}
              changeReply= {this.changeReply}
            />
            <Divider variant="inset" component="li" />
          </div>
        );
      });
    }
  };

  handleAddComment = comment_contents => {
    const { addComment, list_id, user_id, date } = this.props;
    const comment_reply = 0;
    if (comment_contents) {
      addComment(list_id, comment_contents, comment_reply, user_id, date);
    }
  };
  render() {
    const { user_id } = this.props;
    return (
      <div className="comment">
        <List>{this.renderComments()}</List>
        <div style={{ width: "100%", float: "right" }}>
          <CommentForm onSubmit={this.handleAddComment} user_id={user_id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

export default connect(mapStateToProps, { fetchComments, addComment })(Comment);
