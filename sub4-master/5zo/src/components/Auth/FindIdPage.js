import React, { Component } from "react";
import { connect } from "react-redux";
import {
  existEmail,
  findIdFailReset,
  existEmailSuccessReset,
  findIdSuccessReset,
  findId
} from "actions";
import {
  InputWithLabel,
  AuthButton,
} from ".";
import history from "../../history";
import Paper from "@material-ui/core/Paper";
import { isEmail } from "validator";
import { withStyles } from "@material-ui/core/styles";

// import classes from "*.module.css";

const styles = theme => ({
  paper: {
    position: 'absolute',
    padding : 40,
    top: '50%',
    left: '50%',
    width : '25%',
    minWidth : 400,
    transform: 'translate(-50%, -50%)'
  }
});


class FindIdPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.check = this.check.bind(this);
  }
  componentDidMount() {
    document.getElementById("email").focus();
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        this.setState({
          email: value
        });
        break;
    }
  }
  check() {
    if (!this.state.email) {
      document.getElementById("email_msg").value = "이메일을 입력해주세요.";
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }
    if (!isEmail(this.state.email)) {
      document.getElementById("email_msg").value = "잘못된 이메일 형식입니다.";
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }
    document.getElementById("email_msg").classList.remove("error");
    this.props.existEmail(this.state.email);
  }
  cancel = () => {
    history.push("/login");
  };
  render() {
    if (this.props.exist_email_success) {
      this.props.existEmailSuccessReset();
      this.props.findIdFailReset();
      alert(`입력하신 ${this.state.email} 로 아이디를 전송하였습니다.`);
      history.push("/login");
      this.props.findId(this.state.email);
    }
    if (this.props.find_id_success) {
      this.props.findIdSuccessReset();
      this.props.findIdFailReset();
    }

    const { classes } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", width: 500 }}>
          <Paper className={classes.paper}>
            <InputWithLabel
              label="이메일"
              id="email"
              name="email"
              type="email"
              placeholder={"이메일의 입력하세요"}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="text"
              className={this.props.find_id_fail ? "error" : "none"}
              readOnly
              value={this.props.find_id_fail}
            />
            <AuthButton onClick={this.check}> 아이디 찾기 </AuthButton>
            <AuthButton onClick={this.cancel}> 취소 </AuthButton>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    find_id_fail: state.members.find_id_fail,
    find_id_success: state.members.find_id_success,
    exist_email_success: state.members.exist_email_success
  };
};

export default withStyles(styles, {withTheme : true} )(connect(mapStatetoProps, {
  findId,
  findIdFailReset,
  findIdSuccessReset,
  existEmail,
  existEmailSuccessReset
})(FindIdPage));
