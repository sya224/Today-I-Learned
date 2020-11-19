import React, { Component } from "react";
import { connect } from "react-redux";
import {
  login,
  loginErrReset,
  editMyinfo,
  editMyinfoErrReset,
  memInfoChangeReset
} from "actions";
import {
  AuthWrapper,
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  TextWithLabel
} from ".";
import storage from "lib/storage";
import PasswordWithLabel from "./PasswordWithLabel";
import { TwitterPicker } from "react-color";
import history from "../../history";

import styled from "styled-components";
import oc from "open-color";

const Label = styled.div`
  font-size: 1rem;
  color: ${oc.gray[6]};
  margin-bottom: 0.25rem;
  text-align: left;
`;

class NewMySetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPw: "",
      email: this.props.mem_info ? this.props.mem_info.mem_email : "",
      nick: this.props.mem_info ? this.props.mem_info.mem_nick : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.editMyinfo = this.editMyinfo.bind(this);
    this.cancelEditMyinfo = this.cancelEditMyinfo.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "nowPw":
        this.setState({
          nowPw: value
        });
        break;
      case "email":
        this.setState({
          email: value
        });
        break;
      case "nick":
        this.setState({
          nick: value
        });
        break;
    }
  }
  editMyinfo() {
    if (!document.getElementById("nowPw").value) {
      document.getElementById("nowPw").focus();

      return;
    }

    this.props.editMyinfo(
      this.props.mem_info.mem_id,
      this.state.nowPw,
      this.state.email,
      this.state.nick,
      this.props.mem_info.mem_color
    );
  }
  cancelEditMyinfo = () => {
    history.push("/mypage");
  };
  uploadImage(e) {
    const file = e.target.files;

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);

    reader.onload = function() {
      var image = new Image();
      image.src = reader.result;
      image.onload = function() {
        var canvas = document.createElement("canvas");
        var canvasContext = canvas.getContext("2d");

        var div = document.getElementById("image_div");
        var divAspect = 120 / 120;
        var imgAspect = image.height / image.width;

        if (imgAspect <= divAspect) {
          var imgWidthActual = div.offsetHeight / imgAspect;
          var imgWidthToBe = div.offsetHeight / divAspect;
          var marginLeft = -Math.round((imgWidthActual - imgWidthToBe) / 2);
          canvasContext.drawImage(
            this,
            0,
            0,
            (120 * this.width) / this.height,
            120
          );
          document.getElementById("profile_image").style.cssText =
            "margin-left: " + marginLeft + "px; margin-top: 0px;";
        } else {
          var imgWidthActual = div.offsetHeight / imgAspect;
          var imgWidthToBe = div.offsetHeight / divAspect;
          var marginTop = -Math.round((imgWidthToBe - imgWidthActual) / 2);
          canvasContext.drawImage(
            this,
            0,
            0,
            120,
            (120 * this.height) / this.width
          );
          document.getElementById("profile_image").style.cssText =
            "margin-left: 0px; margin-top: " + marginTop + "px;";
        }

        var dataURI = canvas.toDataURL("image/png");

        document.getElementById("profile_image").src = dataURI;
      };
    };
  }
  render() {
    if (this.props.mem_info_change) {
      const loggedInfo = this.props.mem_info_change;
      storage.set("loggedInfo", loggedInfo);

      this.props.editMyinfoErrReset();
      this.props.memInfoChangeReset();
      alert("회원정보 수정 완료");
      history.push("/mypage");
    }
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", width: 500 }}>
          <AuthWrapper>
            <AuthContent title="My Setting">
              <div
                style={{ width: "120px", height: "120px", overflow: "hidden" }}
                id="image_div"
              >
                <img id="profile_image"></img>
              </div>
              <input type="file" accept="image/*" onChange={this.uploadImage} />
              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
              <InputWithLabel
                label="닉네임"
                name="nick"
                value={this.state.nick}
                onChange={this.handleChange}
              />
              <br />
              <div style={{ display: "inline-block", width: `100%` }}>
                <div
                  style={{
                    display: "inline-block",
                    float: "left",
                    height: "100px",
                    minHeight: "100px"
                  }}
                >
                  <div
                    id="myColor"
                    style={{
                      background: this.props.mem_info.mem_color,
                      width: "50px",
                      height: "100%",
                      minWidth: "100px",
                      minHeight: "100px"
                    }}
                  />
                </div>
                <div style={{ display: "inline-block", float: "right" }}>
                  <TwitterPicker
                    style={{
                      marginRight: 0,
                      border: null,
                      display: "inline-block"
                    }}
                    onChange={this.handleChangeColor}
                    triangle="hide"
                  />
                </div>
              </div>
              <AuthButton onClick={this.editMyinfo}> 수정 </AuthButton>
              <AuthButton onClick={this.cancelEditMyinfo}> 취소 </AuthButton>
            </AuthContent>
          </AuthWrapper>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    mem_info_change: state.members.mem_info_change,
    edit_myinfo_err: state.members.edit_myinfo_err
  };
};

export default connect(mapStatetoProps, {
  editMyinfo,
  editMyinfoErrReset,
  memInfoChangeReset
})(NewMySetting);
