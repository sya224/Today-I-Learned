import React, { Component } from 'react';
import { connect } from "react-redux";
import { editPassword, editPasswordFailReset, editPasswordSuccessReset } from "actions";
import { AuthButton } from '.';
import { matches } from "validator";
import PasswordWithLabel from './PasswordWithLabel';
import history from '../../history'

class EditPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_pw: '',
      new_pw: '',
    }

    this.keyDown = this.keyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editPassword = this.editPassword.bind(this)
  }
  componentDidMount(){
    this.props.editPasswordFailReset()
    this.props.editPasswordSuccessReset()
    document.getElementById("old_pw").focus();
    this.props.close();
  }
  keyDown(e) {
    if (e.keyCode === 13) this.editPassword();
    if(e.target.id === "old_pw" && e.keyCode === 9) {
      document.getElementById("new_pw").focus();
      e.preventDefault();
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'old_pw':
        this.setState({
          old_pw: value
        })
        break;
      case 'new_pw':
        this.setState({
          new_pw: value
        })
        break;
    }
  }
  editPassword() {
    if (!this.state.old_pw) {
      document.getElementById("old_pw_msg").value = '현재 비밀번호를 입력해주세요.';
      document.getElementById("old_pw_msg").classList.add("error");
      document.getElementById("old_pw").focus();
      return;
    }

    if (!this.state.new_pw) {
      document.getElementById("new_pw_msg").value = '수정할 비밀번호를 입력해주세요.';
      document.getElementById("old_pw_msg").classList.remove("error");
      document.getElementById("new_pw_msg").classList.add("error");
      document.getElementById("new_pw").focus();
      return;
    }

    if (!matches(this.state.new_pw, /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/)) {
      document.getElementById("new_pw_msg").value = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
      document.getElementById("old_pw_msg").classList.remove("error");
      document.getElementById("new_pw_msg").classList.add("error");
      document.getElementById("new_pw_msg").focus();
      return;
    }

    document.getElementById("old_pw_msg").classList.remove("error");
    document.getElementById("new_pw_msg").classList.remove("error");

    if(this.state.old_pw !== this.state.new_pw) this.props.editPassword(this.props.mem_info.mem_id, this.state.old_pw, this.state.new_pw)
  }
  render() {
    if (this.props.edit_password_success) {
      this.props.editPasswordFailReset()
      this.props.editPasswordSuccessReset()
      alert(`비밀번호 변경이 완료되었습니다.`)
      history.push("/")
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', minWidth: 500 }}>
          <PasswordWithLabel label="현재 비밀번호" id="old_pw" name="old_pw" value={this.state.old_pw} onChange={this.handleChange} onKeyDown={this.keyDown}/>
          <PasswordWithLabel label="수정 비밀번호" id="new_pw" name="new_pw" value={this.state.new_pw} onChange={this.handleChange} onKeyDown={this.keyDown}/>
          <input type="text" className={this.props.edit_password_fail? "error_" : "none"} readOnly disabled value={this.props.edit_password_fail}/>
          <AuthButton onClick={this.editPassword}> 비밀번호 수정 </AuthButton>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    edit_password_fail: state.members.edit_password_fail,
    edit_password_success: state.members.edit_password_success,
  };
};

export default connect(mapStatetoProps, { editPassword, editPasswordSuccessReset, editPasswordFailReset })(EditPasswordPage);