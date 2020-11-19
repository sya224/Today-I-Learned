import React from "react";
import { connect } from "react-redux";
import { getOtherMember } from "../../actions";
import "./userInfo.css";
import history from "../../history";
import apis from "../../apis/apis";

class UserInfo extends React.Component {
  componentDidMount() {
    this.props.getOtherMember(this.props.user_id);
  }
  userClick = mem_id => {
    history.push(`/search?member=${mem_id}`);
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.info ? props.info.mem_post_def_secret : null
    };
  }

  handleChange = async e => {
    this.setState({
      checked: e.target.checked
    });
    await apis.patch(
      `/member/postdef/${this.props.info.mem_id}`
    );
  };

  setInfo() {
    if (this.props.info && this.props.info.mem_id === this.props.user_id) {
      let image;
      if (this.props.info.mem_thumb) image = this.props.info.mem_thumb;
      else
        image =
          "https://www.gravatar.com/avatar/bc05615a975020a24c81da899a113e23?d=mm&s=90";
      image = image.replace("blob:", "");

      // const login_id = storage.get("loggedInfo").mem_id;

      return (
        <div>
          <div className="user_image">
            <img src={image} style={{ width: "100%", height: "100%" }} alt="image"></img>
          </div>
          <div className="user_info">
            <span className="user_nick">{this.props.info.mem_nick}</span>
            <span
              className="user_id"
              style={{
                color: "gray",
                cursor: "pointer"
              }}
              onClick={() => {
                history.push(`/search?member=${this.props.info.mem_id}`);
              }}
            >
              @{this.props.info.mem_id}
            </span>
            {/* 여기에 팔로우 */}
            <br></br>
            <p className="user_intro"> {this.props.info.mem_self_intro} </p>
            {/* <div>{year}년 {month}월 {date}일에 가입함</div> */}
          </div>
        </div>
      );
    }
  }
  render() {
    if (this.props.info) {
      if (this.props.user_id !== this.props.info.mem_id) {
        this.props.getOtherMember(this.props.user_id);
      }
    }
    return <>{this.setInfo()}</>;
  }
}

const mapStatetoProps = state => {
  return {
    info: state.members.other_mem_info
  };
};

export default connect(mapStatetoProps, { getOtherMember })(UserInfo);
