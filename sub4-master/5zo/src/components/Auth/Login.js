import React, { Component } from "react";
import { connect } from "react-redux";
import { login, loginErrReset } from "../../actions";
import { InputWithLabel, AuthButton } from "../Auth";
import storage from "lib/storage";
import "./error.css";
import PasswordWithLabel from "./PasswordWithLabel";
import axios from "axios";
import history from "../../history";
import FindInfoLink from "./FindInfoLink";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    position: "absolute",
    padding: 40,
    top: "50%",
    left: "50%",
    width: "25%",
    minWidth: 400,
    transform: "translate(-50%, -50%)"
  }
});

class Login extends Component {
  componentDidMount() {
    this.props.loginErrReset();

    if (!this.props.mem_info) {
      // axios.get("https://i02a101.p.ssafy.io:8443/spring/api/naver/login")
      axios
        .get("http://13.124.67.187:8080/spring/api/naver/login")
        .then(response => {
          const url = response.data.data;
          this.setState({
            url: url
          });
        });
    }

    document.getElementById("loginId").focus();
  }
  constructor(props) {
    super(props);

    this.state = {
      loginId: "",
      loginPw: "",
      url: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "loginId":
        this.setState({
          loginId: value
        });
        break;
      case "loginPw":
        this.setState({
          loginPw: value
        });
        break;
    }
  }
  login() {
    if (!this.state.loginId) {
      document.getElementById("loginId_msg").value = "아이디를 입력해주세요";
      document.getElementById("loginId_msg").classList.add("error");
      document.getElementById("loginId").focus();
      return;
    }

    if (!this.state.loginPw) {
      document.getElementById("loginPw_msg").value = "비밀번호를 입력해주세요";
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.add("error");
      document.getElementById("loginPw").focus();
      return;
    }

    document.getElementById("loginId_msg").classList.remove("error");
    document.getElementById("loginPw_msg").classList.remove("error");

    this.props.login(this.state.loginId, this.state.loginPw);
  }
  naver = () => {
    window.location.href = this.state.url;
  };
  keyDown(e) {
    if (e.keyCode === 13) this.login();
  }
  render() {
    const { classes } = this.props;

    if (this.props.mem_info) {
      const loggedInfo = this.props.mem_info;
      storage.set("loggedInfo", loggedInfo);

      this.props.loginErrReset();
      history.push("/");
    }
    return (
      <div style={{ textAlign: "center", minWidth: 500 }}>
        <div style={{ display: "inline-block" }}>
          <Paper className={classes.paper}>
            <InputWithLabel
              label="아이디"
              id="loginId"
              name="loginId"
              onChange={this.handleChange}
              onKeyDown={this.keyDown}
            />
            <PasswordWithLabel
              label="비밀번호"
              id="loginPw"
              name="loginPw"
              onChange={this.handleChange}
              onKeyDown={this.keyDown}
            />
            <input
              type="text"
              className={this.props.login_err ? "error_" : "none"}
              readOnly
              value={this.props.login_err}
            />
            <AuthButton onClick={this.login}> 로그인 </AuthButton>
            <AuthButton onClick={this.naver} backgroundColor={"#2DB400"}>
              {" "}
              네이버 아이디로 로그인{" "}
            </AuthButton>
            <div style={{ marginTop: "20px" }}>
              <FindInfoLink to="/register"> 회원가입</FindInfoLink>
              <span
                style={{
                  margin: "0 6px",
                  background: "#e4e4e5",
                  width: "1px",
                  textIndent: "-999em",
                  display: "inline-block"
                }}
              >
                |
              </span>
              <FindInfoLink to="/find-id">아이디 찾기</FindInfoLink>
              <span
                style={{
                  margin: "0 6px",
                  background: "#e4e4e5",
                  width: "1px",
                  textIndent: "-999em",
                  display: "inline-block"
                }}
              >
                |
              </span>
              <FindInfoLink to="/find-pw">비밀번호 찾기</FindInfoLink>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    login_err: state.members.login_err
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStatetoProps, { login, loginErrReset })(Login)
);
